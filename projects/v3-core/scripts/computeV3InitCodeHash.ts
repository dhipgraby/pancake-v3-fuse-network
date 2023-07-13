import { ethers } from 'hardhat'
import VoltageV3PoolArtifact from '../artifacts/contracts/VoltageV3Pool.sol/VoltageV3Pool.json'

const hash = ethers.utils.keccak256(VoltageV3PoolArtifact.bytecode)
console.log(hash)
