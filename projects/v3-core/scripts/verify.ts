/* import { verifyContract } from '@voltageswap/common/verify'
import { sleep } from '@voltageswap/common/sleep'

async function main() {
  const networkName = network.name
  const deployedContracts = await import(`@voltageswap/v3-core/deployments/${networkName}.json`)

  // Verify VoltageV3PoolDeployer
  console.log('Verify VoltageV3PoolDeployer')
  await verifyContract(deployedContracts.VoltageV3PoolDeployer)
  await sleep(10000)

  // Verify voltageV3Factory
  console.log('Verify voltageV3Factory')
  await verifyContract(deployedContracts.VoltageV3Factory, [deployedContracts.VoltageV3PoolDeployer])
  await sleep(10000)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
 */