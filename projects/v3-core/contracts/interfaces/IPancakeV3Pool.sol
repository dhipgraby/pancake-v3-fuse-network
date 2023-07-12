// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;

import './pool/IVoltageV3PoolImmutables.sol';
import './pool/IVoltageV3PoolState.sol';
import './pool/IVoltageV3PoolDerivedState.sol';
import './pool/IVoltageV3PoolActions.sol';
import './pool/IVoltageV3PoolOwnerActions.sol';
import './pool/IVoltageV3PoolEvents.sol';

/// @title The interface for a VoltageSwap V3 Pool
/// @notice A VoltageSwap pool facilitates swapping and automated market making between any two assets that strictly conform
/// to the ERC20 specification
/// @dev The pool interface is broken up into many smaller pieces
interface IVoltageV3Pool is
    IVoltageV3PoolImmutables,
    IVoltageV3PoolState,
    IVoltageV3PoolDerivedState,
    IVoltageV3PoolActions,
    IVoltageV3PoolOwnerActions,
    IVoltageV3PoolEvents
{

}
