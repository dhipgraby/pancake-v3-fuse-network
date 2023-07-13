import { abi as POOL_ABI } from '@voltageswap/v3-core/artifacts/contracts/VoltageV3Pool.sol/VoltageV3Pool.json'
import { Contract, Wallet } from 'ethers'
import { IVoltageV3Pool } from '../../typechain-types'

export default function poolAtAddress(address: string, wallet: Wallet): IVoltageV3Pool {
  return new Contract(address, POOL_ABI, wallet) as IVoltageV3Pool
}
