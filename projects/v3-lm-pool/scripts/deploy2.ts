import { ethers, network } from 'hardhat'
import { configs } from '@voltageswap/common/config'
import { tryVerify } from '@voltageswap/common/verify'
import fs from 'fs'
import { abi } from '@voltageswap/v3-core/artifacts/contracts/VoltageV3Factory.sol/VoltageV3Factory.json'

import { parseEther } from 'ethers/lib/utils'
const currentNetwork = network.name

async function main() {
  const [owner] = await ethers.getSigners()
  // Remember to update the init code hash in SC for different chains before deploying
  const networkName = network.name
  const config = configs[networkName as keyof typeof configs]
  if (!config) {
    throw new Error(`No config found for network ${networkName}`)
  }

  const v3DeployedContracts = await import(`@voltageswap/v3-core/deployments/${networkName}.json`)
  const mcV3DeployedContracts = await import(`@voltageswap/masterchef-v3/deployments/${networkName}.json`)

  const voltageV3Factory_address = v3DeployedContracts.VoltageV3Factory

  const VoltageV3LmPoolDeployer = await ethers.getContractFactory('VoltageV3LmPoolDeployer')
  const voltageV3LmPoolDeployer = await VoltageV3LmPoolDeployer.deploy(mcV3DeployedContracts.MasterChefV3)

  console.log('voltageV3LmPoolDeployer deployed to:', voltageV3LmPoolDeployer.address)

  const voltageV3Factory = new ethers.Contract(voltageV3Factory_address, abi, owner)

  await voltageV3Factory.setLmPoolDeployer(voltageV3LmPoolDeployer.address)

  const contracts = {
    VoltageV3LmPoolDeployer: voltageV3LmPoolDeployer.address,
  }
  fs.writeFileSync(`./deployments/${networkName}.json`, JSON.stringify(contracts, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
