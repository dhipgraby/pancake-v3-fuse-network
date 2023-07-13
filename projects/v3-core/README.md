# VoltageSwap V3

This repository contains the core smart contracts for the VoltageSwap V3 Protocol.
For higher level contracts, see the [v3-periphery](../v3-periphery/)
repository.

## Local deployment

In order to deploy this code to a local testnet, you should install the npm package
`@voltageswap/v3-core`
and import the factory bytecode located at
<<<<<<< HEAD
`@pancakeswap/v3-core/artifacts/contracts/VoltageV3Factory.sol/VoltageV3Factory.json`.
=======
`@voltageswap/v3-core/artifacts/contracts/VoltageV3Factory.sol/VoltageV3Factory.json`.
>>>>>>> upstream/testing_voltage
For example:

```typescript
import {
  abi as FACTORY_ABI,
  bytecode as FACTORY_BYTECODE,
<<<<<<< HEAD
} from '@pancakeswap/v3-core/artifacts/contracts/VoltageV3Factory.sol/VoltageV3Factory.json'
=======
} from '@voltageswap/v3-core/artifacts/contracts/VoltageV3Factory.sol/VoltageV3Factory.json'
>>>>>>> upstream/testing_voltage

// deploy the bytecode
```

This will ensure that you are testing against the same bytecode that is deployed to
mainnet and public testnets, and all VoltageSwap code will correctly interoperate with
your local deployment.

## Using solidity interfaces

The VoltageSwap v3 interfaces are available for import into solidity smart contracts
<<<<<<< HEAD
via the npm artifact `@pancakeswap/v3-core`, e.g.:

```solidity
import '@pancakeswap/v3-core/contracts/interfaces/IVoltageV3Pool.sol';
=======
via the npm artifact `@voltageswap/v3-core`, e.g.:

```solidity
import '@voltageswap/v3-core/contracts/interfaces/IVoltageV3Pool.sol';
>>>>>>> upstream/testing_voltage

contract MyContract {
  IVoltageV3Pool pool;

  function doSomethingWithPool() {
    // pool.swap(...);
  }
}

```
