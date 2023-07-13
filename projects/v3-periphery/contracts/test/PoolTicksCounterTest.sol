// SPDX-License-Identifier: GPL-2.0-or-later
<<<<<<< HEAD
import '@pancakeswap/v3-core/contracts/interfaces/IVoltageV3Pool.sol';
=======
import '@voltageswap/v3-core/contracts/interfaces/IVoltageV3Pool.sol';
>>>>>>> upstream/testing_voltage

pragma solidity >=0.6.0;

import '../libraries/PoolTicksCounter.sol';

contract PoolTicksCounterTest {
    using PoolTicksCounter for IVoltageV3Pool;

    function countInitializedTicksCrossed(
        IVoltageV3Pool pool,
        int24 tickBefore,
        int24 tickAfter
    ) external view returns (uint32 initializedTicksCrossed) {
        return pool.countInitializedTicksCrossed(tickBefore, tickAfter);
    }
}
