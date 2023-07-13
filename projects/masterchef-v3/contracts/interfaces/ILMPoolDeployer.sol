// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./IVoltageV3Pool.sol";
import "./ILMPool.sol";

interface ILMPoolDeployer {
    function deploy(IVoltageV3Pool pool) external returns (ILMPool lmPool);
}
