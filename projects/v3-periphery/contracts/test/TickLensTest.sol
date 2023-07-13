// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity >=0.5.0;
pragma abicoder v2;

<<<<<<< HEAD
import '@pancakeswap/v3-core/contracts/interfaces/IVoltageV3Pool.sol';
=======
import '@voltageswap/v3-core/contracts/interfaces/IVoltageV3Pool.sol';
>>>>>>> upstream/testing_voltage
import '../lens/TickLens.sol';

/// @title Tick Lens contract
contract TickLensTest is TickLens {
    function getGasCostOfGetPopulatedTicksInWord(address pool, int16 tickBitmapIndex) external view returns (uint256) {
        uint256 gasBefore = gasleft();
        getPopulatedTicksInWord(pool, tickBitmapIndex);
        return gasBefore - gasleft();
    }
}
