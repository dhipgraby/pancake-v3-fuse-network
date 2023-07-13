import { tryVerify } from '@voltageswap/common/verify'
import { ContractFactory } from 'ethers'
import { ethers, network } from 'hardhat'
import fs from 'fs'

type ContractJson = { abi: any; bytecode: string }
const artifacts: { [name: string]: ContractJson } = {
  // eslint-disable-next-line global-require
  VoltageV3PoolDeployer: require('../artifacts/contracts/VoltageV3PoolDeployer.sol/VoltageV3PoolDeployer.json'),
  // eslint-disable-next-line global-require
  VoltageV3Factory: require('../artifacts/contracts/VoltageV3Factory.sol/VoltageV3Factory.json'),
}

async function main() {
  const [owner] = await ethers.getSigners()
  const networkName = network.name
  console.log('owner', owner.address)

  let voltageV3PoolDeployer_address = ''
  let voltageV3PoolDeployer
  const VoltageV3PoolDeployer = new ContractFactory(
    artifacts.VoltageV3PoolDeployer.abi,
    artifacts.VoltageV3PoolDeployer.bytecode,
    owner
  )
  if (!voltageV3PoolDeployer_address) {
    voltageV3PoolDeployer = await VoltageV3PoolDeployer.deploy()

    voltageV3PoolDeployer_address = voltageV3PoolDeployer.address
    console.log('voltageV3PoolDeployer', voltageV3PoolDeployer_address)
  } else {
    voltageV3PoolDeployer = new ethers.Contract(
      voltageV3PoolDeployer_address,
      artifacts.VoltageV3PoolDeployer.abi,
      owner
    )
  }

  let voltageV3Factory_address = ''
  let voltageV3Factory
  if (!voltageV3Factory_address) {
    const VoltageV3Factory = new ContractFactory(
      artifacts.VoltageV3Factory.abi,
      artifacts.VoltageV3Factory.bytecode,
      owner
    )
    voltageV3Factory = await VoltageV3Factory.deploy(voltageV3PoolDeployer_address)

    voltageV3Factory_address = voltageV3Factory.address
    console.log('voltageV3Factory', voltageV3Factory_address)
  } else {
    voltageV3Factory = new ethers.Contract(voltageV3Factory_address, artifacts.VoltageV3Factory.abi, owner)
  }

  // Set FactoryAddress for voltageV3PoolDeployer.
  await voltageV3PoolDeployer.setFactoryAddress(voltageV3Factory_address);


  const contracts = {
    VoltageV3Factory: voltageV3Factory_address,
    VoltageV3PoolDeployer: voltageV3PoolDeployer_address,
  }

  fs.writeFileSync(`./deployments/${networkName}.json`, JSON.stringify(contracts, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
