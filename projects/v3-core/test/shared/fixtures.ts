import { BigNumber } from 'ethers'
import { ethers } from 'hardhat'
import { MockTimeVoltageV3Pool } from '../../typechain-types/contracts/test/MockTimeVoltageV3Pool'
import { TestERC20 } from '../../typechain-types/contracts/test/TestERC20'
import { VoltageV3Factory } from '../../typechain-types/contracts/VoltageV3Factory'
import { VoltageV3PoolDeployer } from '../../typechain-types/contracts/VoltageV3PoolDeployer'
import { TestVoltageV3Callee } from '../../typechain-types/contracts/test/TestVoltageV3Callee'
import { TestVoltageV3Router } from '../../typechain-types/contracts/test/TestVoltageV3Router'
import { MockTimeVoltageV3PoolDeployer } from '../../typechain-types/contracts/test/MockTimeVoltageV3PoolDeployer'
import VoltageV3LmPoolArtifact from '@voltageswap/v3-lm-pool/artifacts/contracts/VoltageV3LmPool.sol/VoltageV3LmPool.json'

import { Fixture } from 'ethereum-waffle'

interface FactoryFixture {
  factory: VoltageV3Factory
}

interface DeployerFixture {
  deployer: VoltageV3PoolDeployer
}

async function factoryFixture(): Promise<FactoryFixture> {
  const { deployer } = await deployerFixture()
  const factoryFactory = await ethers.getContractFactory('VoltageV3Factory')
  const factory = (await factoryFactory.deploy(deployer.address)) as VoltageV3Factory
  return { factory }
}
async function deployerFixture(): Promise<DeployerFixture> {
  const deployerFactory = await ethers.getContractFactory('VoltageV3PoolDeployer')
  const deployer = (await deployerFactory.deploy()) as VoltageV3PoolDeployer
  return { deployer }
}

interface TokensFixture {
  token0: TestERC20
  token1: TestERC20
  token2: TestERC20
}

async function tokensFixture(): Promise<TokensFixture> {
  const tokenFactory = await ethers.getContractFactory('TestERC20')
  const tokenA = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  const tokenB = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20
  const tokenC = (await tokenFactory.deploy(BigNumber.from(2).pow(255))) as TestERC20

  const [token0, token1, token2] = [tokenA, tokenB, tokenC].sort((tokenA, tokenB) =>
    tokenA.address.toLowerCase() < tokenB.address.toLowerCase() ? -1 : 1
  )

  return { token0, token1, token2 }
}

type TokensAndFactoryFixture = FactoryFixture & TokensFixture

interface PoolFixture extends TokensAndFactoryFixture {
  swapTargetCallee: TestVoltageV3Callee
  swapTargetRouter: TestVoltageV3Router
  createPool(
    fee: number,
    tickSpacing: number,
    firstToken?: TestERC20,
    secondToken?: TestERC20
  ): Promise<MockTimeVoltageV3Pool>
}

// Monday, October 5, 2020 9:00:00 AM GMT-05:00
export const TEST_POOL_START_TIME = 1601906400

export const poolFixture: Fixture<PoolFixture> = async function (): Promise<PoolFixture> {
  const { factory } = await factoryFixture()
  const { token0, token1, token2 } = await tokensFixture()

  const MockTimeVoltageV3PoolDeployerFactory = await ethers.getContractFactory('MockTimeVoltageV3PoolDeployer')
  const MockTimeVoltageV3PoolFactory = await ethers.getContractFactory('MockTimeVoltageV3Pool')

  const calleeContractFactory = await ethers.getContractFactory('TestVoltageV3Callee')
  const routerContractFactory = await ethers.getContractFactory('TestVoltageV3Router')

  const swapTargetCallee = (await calleeContractFactory.deploy()) as TestVoltageV3Callee
  const swapTargetRouter = (await routerContractFactory.deploy()) as TestVoltageV3Router

  const VoltageV3LmPoolFactory = await ethers.getContractFactoryFromArtifact(VoltageV3LmPoolArtifact)

  return {
    token0,
    token1,
    token2,
    factory,
    swapTargetCallee,
    swapTargetRouter,
    createPool: async (fee, tickSpacing, firstToken = token0, secondToken = token1) => {
      const mockTimePoolDeployer =
        (await MockTimeVoltageV3PoolDeployerFactory.deploy()) as MockTimeVoltageV3PoolDeployer
      const tx = await mockTimePoolDeployer.deploy(
        factory.address,
        firstToken.address,
        secondToken.address,
        fee,
        tickSpacing
      )

      const receipt = await tx.wait()
      const poolAddress = receipt.events?.[0].args?.pool as string

      const mockTimeVoltageV3Pool = MockTimeVoltageV3PoolFactory.attach(poolAddress) as MockTimeVoltageV3Pool

      await (
        await factory.setLmPool(
          poolAddress,
          (
            await VoltageV3LmPoolFactory.deploy(
              poolAddress,
              ethers.constants.AddressZero,
              Math.floor(Date.now() / 1000)
            )
          ).address
        )
      ).wait()

      return mockTimeVoltageV3Pool
    },
  }
}
