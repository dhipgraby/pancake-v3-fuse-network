# Report: Forking VoltageSwap V3 Contracts into Voltage Finance

This report outlines the roadmap for integrating the functionality of **VoltageSwap V3** contracts into the **Voltage Finance** application on the **FUSE** network. The roadmap is based on the assumption that there is **one blockchain developer** working on the project.  

## Step 1: Repository Forking (Estimated Time: 1-2 Days)

The initial step involves creating a copy of the **VoltageSwap V3** contracts repository on **GitHub**. This is a **DevOps** task and should take a developer **1-2 days**.

## Step 2: Contract Adaptation (Estimated Time: 2-3 Weeks)

This task involves adapting the **VoltageSwap V3** contracts to work on the **FUSE** network. This is a complex task that requires a deep understanding of both the BSC and FUSE networks, and we estimate it will take a developer **2-3 weeks** to complete.

The following table provides an overview of the different contracts that can be forked:

| Contract | Description |
| --- | --- |
| **MasterChefV3** | _Manages yield farming, allowing users to stake tokens in return for rewards._ |
| **SmartRouter** | _Routes trades to the best possible path, considering factors like liquidity and slippage._ |
| **SmartRouterHelper** | _Assists the SmartRouter by providing additional functionality or data._ |
| **MixedRouteQuoterV1** | _Quotes prices for trades involving multiple routes._ |
| **QuoterV2** | _An upgraded version of the Quoter contract, providing prices for trades._ |
| **TokenValidator** | _Validates tokens, checking if a token meets certain criteria before it can be used._ |
| **VoltageV3Factory** | _Creates new VoltageSwap pairs._ |
| **VoltageV3PoolDeployer** | _Deploys new VoltageSwap pools._ |
| **SwapRouter** | _Executes trades on VoltageSwap._ |
| **V3Migrator** | _Migrates liquidity from V2 to V3._ |
| **TickLens** | _Provides a view function to return information about multiple ticks from a pool._ |
| **NonfungibleTokenPositionDescriptor** | _Generates a URI for a given token position._ |
| **NonfungiblePositionManager** | _Simplifies the complexity associated with managing positions in VoltageSwap V3._ |
| **VoltageInterfaceMulticall** | _Makes multiple calls to the VoltageSwap interface in a single transaction._ |
| **VoltageV3LmPoolDeployer** | _Deploys new liquidity mining pools for VoltageSwap V3._ |

The scope of this step depends on the features **Voltage Finance** wants to fork. If a true copy of VoltageSwap is desired, all contracts would need to be adapted. However, if only certain features are required, such as the **V3-swap** and the **v3-farming** from Uniswap V3 contracts and SushiSwap's MasterChef contracts, then only those specific contracts would need to be adapted.

## Step 3: Contract Integration (Estimated Time: 3-4 Weeks)

Upon successful adaptation of the contracts for the FUSE network, the next step involves **integrating** them into the **Voltage Finance** application. This may require the **addition** of new features to the application's user interface, the integration of contracts with the application's backend, and other necessary changes.

Examples of potential changes include:

| Area | Changes | Technologies Involved |
| --- | --- | --- |
| **Frontend** | Implementing new user interface components to interact with the forked contracts. This could involve creating new pages or components for yield farming, swapping tokens, or managing liquidity. | **React Framework** |
| **Web3** | Establishing the connection between the frontend and the Ethereum blockchain, allowing the application to interact with the smart contracts. This could involve setting up Web3.js or Ethers.js libraries to enable the application to send transactions and read contract states. | **Alchemy SDK, Ethers.js, Subgraph** |
| **Backend** | Updating the backend to support new features. This could involve creating new API endpoints, updating the database schema, or implementing new business logic. | **NestJS, Subgraph, Database (DB)** |
| **Smart Contract Interaction** | Writing scripts or functions to interact with the smart contracts. This could involve deploying contracts, calling contract functions, or listening for contract events. | **Solidity, Hardhat** |

## Step 4: Integration Testing and Contract Updates (Estimated Time: 3-4 Weeks)

Following the **integration** of the contracts, it is essential to conduct thorough **testing** of the new functionality. This testing phase should include **unit tests**, **integration tests**, and **end-to-end** tests to ensure the integration functions as expected across all possible scenarios.  

In addition to testing, this phase should also include time for necessary **updates** and **refinements** to the contracts.  
Examples of such updates could include:

- _**Updating** the Solidity pragma version to the latest. This will allow for refactoring the contracts to utilize **custom errors**, which can optimize the gas costs of the entire platform._
- _**Fixing** any **errors** or **issues** identified in the Forking Report._
- _**Implementing** any other necessary optimizations or enhancements identified during the testing process._

## Step 5: Contract Auditing (Estimated Time: Varies)

Prior to deploying the new functionality, it is **highly recommended** to have the contracts **audited** by a reputable smart contract audit firm. This audit can help identify any potential **security** vulnerabilities or **logical** errors within the contracts.  

The timeline for this step can vary greatly depending on the **audit firm's** availability, the complexity of the contracts, and the number and severity of issues found. In general, this process involves several meetings with the audit firm to discuss their findings and recommended fixes.  

## Step 6: Contract Deployment (Estimated Time: 1-2 Weeks)

Once the contracts have been audited and any identified issues have been resolved, the contracts can be **deployed** to the **FUSE** network. It is crucial to have a **plan** in place for **managing** and **upgrading** the contracts **post-deployment**.  

Examples of tasks involved in this step include:

- **Contract Deployment**: _Deploying the audited and tested contracts to the FUSE network. This involves interacting with the FUSE network's blockchain and ensuring the contracts are correctly deployed and functional._
- **Verification**: _Verifying the deployed contracts on a block explorer. This usually involves uploading the contract source code and constructor arguments to the block explorer, which allows others to read and interact with the contract._
- **Monitoring**: _Setting up monitoring for the deployed contracts. This could involve setting up alerts for specific contract events or tracking the contract's usage and performance over time._
- **Documentation**: _Documenting the contract addresses, functions, and any important details about the deployment. This is crucial for future reference and for anyone else who might interact with the contracts._
- **Post-Deployment Management Plan**: _Creating a plan for managing and upgrading the contracts post-deployment. This could involve setting up a multisig wallet for contract ownership, planning for potential contract upgrades, or establishing a process for handling any issues or bugs that might arise._
  
## Conclusion

_This roadmap provides a structured approach for **Voltage Finance** to successfully incorporate the desired features of **VoltageSwap V3** into its application. By doing so, it can enhance its product offerings and potentially broaden its user base. It's crucial to understand that this roadmap serves as a guide, and adjustments may be required based on **Voltage Finance's** specific needs and circumstances. The integration process is flexible and should be tailored to meet the unique requirements of **Voltage Finance**._  
