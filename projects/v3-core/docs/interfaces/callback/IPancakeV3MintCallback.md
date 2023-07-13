# Solidity API

## IVoltageV3MintCallback

Any contract that calls IVoltageV3PoolActions#mint must implement this interface

### voltageV3MintCallback

```solidity
function voltageV3MintCallback(uint256 amount0Owed, uint256 amount1Owed, bytes data) external
```

Called to `msg.sender` after minting liquidity to a position from IVoltageV3Pool#mint.

_In the implementation you must pay the pool tokens owed for the minted liquidity.
The caller of this method must be checked to be a VoltageV3Pool deployed by the canonical VoltageV3Factory._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount0Owed | uint256 | The amount of token0 due to the pool for the minted liquidity |
| amount1Owed | uint256 | The amount of token1 due to the pool for the minted liquidity |
| data | bytes | Any data passed through by the caller via the IVoltageV3PoolActions#mint call |

