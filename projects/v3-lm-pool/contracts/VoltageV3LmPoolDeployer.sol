// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity =0.7.6;

import '@voltageswap/v3-core/contracts/interfaces/IVoltageV3Factory.sol';
import '@voltageswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol';

import './VoltageV3LmPool.sol';

/// @dev This contract is for Master Chef to create a corresponding LmPool when
/// adding a new farming pool. As for why not just create LmPool inside the
/// Master Chef contract is merely due to the imcompatibility of the solidity
/// versions.
contract VoltageV3LmPoolDeployer {
    address public immutable masterChef;

    modifier onlyMasterChef() {
        require(msg.sender == masterChef, "Not MC");
        _;
    }

    constructor(address _masterChef) {
        masterChef = _masterChef;
    }

    /// @dev Deploys a LmPool
    /// @param pool The contract address of the VoltageSwap V3 pool
    function deploy(IVoltageV3Pool pool) external onlyMasterChef returns (IVoltageV3LmPool lmPool) {
        lmPool = new VoltageV3LmPool(address(pool), masterChef, uint32(block.timestamp));
        IVoltageV3Factory(INonfungiblePositionManager(IMasterChefV3(masterChef).nonfungiblePositionManager()).factory()).setLmPool(address(pool), address(lmPool));
    }
}
