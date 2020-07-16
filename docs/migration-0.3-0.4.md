---
id: migration-0.3-0.4
title: v0.4
sidebar_label: 0.3 to 0.4
---

## Child chain and Watcher

### Fees
- Child chain now accepts fee in a transaction submitted to it via `/transaction.submit` 
- List of accepted fee tokens and corresponding amount can be retrieved via query to `/fees.all` end point
- The fee amount in a transaction is implicitly determined by the amount of token difference between outputs and inputs. 
- The fee amount must be correct as specified in `/fees.all`. Underpaying or Overpaying of fee in a transaction will result in a returned error.
- Integrator can create a transaction with a valid fee amount via `/transaction.create` API endpoint by specifying fee tokens. Alternatively, a client can build the transaction with valid fee from scratch via a call to fees.all prior to transaction build process.
- Currently, the fees are statically set per each environment. This is expected to change once a more dynamic fee model has been applied, however, consuming fee API is expected to stay the same from integration’s point of view.
- Refer to our guide to transaction fee for more example: https://docs.omg.network/network/fees

### Watcher vs. WatcherInfo
Two flavors of the watcher are now available: Watcher and WatcherInfo.

1. *The Watcher (watcher)* contains the security-critical features for monitoring and interacting with the childchain. It contains a limited set of APIs that allow you to securely transact with the OMG Network, such as transaction submission, retrieval of UTXOs, challenge data, in-flight exits, etc.
2. *The WatcherInfo (watcher_info)*, like the Watcher, contains the security-critical features for monitoring and interacting with the childchain. Additionally, the WatcherInfo contains an additional set of informational API endpoints that allow convenient retrieval of data related to the network and transactions, namely accounts, blocks, transactions, fees, network statistics, etc.

In general, run and/or integrate with the WatcherInfo to utilize the full set of watcher functionalities. Integrate with the Watcher when you have specific requirements to utilize only the security-critical components.

### Watcher API changes
- The Watcher or WatcherInfo may return an “operation:service_unavailable” error when a potential issue within itself or the network is detected. The issue ranges from Ethereum disconnectivity, slow Ethereum sync to potential byzantine events. Once the issue is resolved, endpoints are served again. The list of current events can be retrieved from /alarm.get.
- Add `/fees.all` that lists all supported fee tokens and their rates. Available only on the ChildChain and WatcherInfo.
- Add `/block.all`, `/block.get`, `/stats.get` endpoints for informational purposes. Available only on the WatcherInfo.
- Update `/transaction.get` and `/transaction.all` to return each transaction output’s creating_txhash and spending_txhash. Available only on the WatcherInfo.
- Update `/account.get_transactions`, `/transaction.all` and `/transaction.get` to return transaction type (txtype) and transaction output type (otype). The currently possible types are Payment V1 and Fee Token Claim.
- Watcher and WatcherInfo no longer serve websocket events for new transactions and exits.

### Strict transaction decoding and checks

NOTE: This is handled by `/transaction.create` and `/transaction.submit_typed`, so it is unlikely to affect integrators.

The transaction decoding and checks are documented in plasma-contracts [here](https://github.com/omgnetwork/plasma-contracts/blob/master/plasma_framework/docs/integration-docs/integration-doc.md#transactions).

### Obsoleted configurations
The environment variables with prefixes RINKEBY_, ROPSTEN_ and MAINNET_ have been replaced with ETHEREUM_NETWORK and their non-prefixed names. To upgrade from previous versions, migrate the old configurations to the following new ones:

- ETHEREUM_NETWORK
- AUTHORITY_ADDRESS
- CONTRACT_ADDRESS_PLASMA_FRAMEWORK
- CONTRACT_ADDRESS_ETH_VAULT
- CONTRACT_ADDRESS_ERC20_VAULT
- CONTRACT_ADDRESS_PAYMENT_EXIT_GAME

For more information, see [Deployment Configurations](https://github.com/omgnetwork/elixir-omg/blob/master/docs/deployment_configuration.md).

### New configurations
The following new environment variables can be configured to modify the behaviour of your self-hosted Watcher and WatcherInfo.

- ETHEREUM_EVENTS_CHECK_INTERVAL_MS
- ETHEREUM_STALLED_SYNC_THRESHOLD_MS
- EXIT_PROCESSOR_SLA_MARGIN
- EXIT_PROCESSOR_SLA_MARGIN_FORCED
- ETHEREUM_BLOCK_TIME_SECONDS

For more information, see [Deployment Configurations](https://github.com/omgnetwork/elixir-omg/blob/master/docs/deployment_configuration.md).

## omg-js
*from 3.0.0-alpha.6 to 3.0.0-0.4.1*

### General changes
- Library has been updated to work with the updated contracts and latest APIs from `elixir-omg`.
- [API documentation](https://docs.omg.network/omg-js/) significantly improved with correct types and definitions.
- Introduced input validation so users are able to catch input errors earlier and avoid confusing stack traces
- Examples folder has been updated to show implementation of new functionality as well as more helper functions.
- See better balance and UTXO information.
- See ERC20 & ETH specific examples for deposits, transactions, exits and process exits.

### ChildChain Module
- `getFees` - new function to retrieve supported fee tokens and amounts to make transactions.
- `createTransaction` - arguments are retrieved as an object for better readability. Metadata can also be passed as a simple string instead of being encoded beforehand.
- `sendTransaction` - arguments are retrieved as an object for better readability. It also accepts a payments and fee object to provide consistency with other function calls in the library. 
- `inFlightExitGetInputChallengeData` - new function that gets the data to challenge an invalid input piggybacked on an in-flight exit.
- `inFlightExitGetOutputChallengeData` - new function that gets the data to challenge an invalid output piggybacked on an in-flight exit.

### RootChain Module
In most functions, arguments are now passed as objects in this module for easier readability. Please check the [API documentation](https://docs.omg.network/omg-js/) for more details.
- `Constructor` - arguments are retrieved as an object and passing the abi is no longer necessary. 
- Vault contracts will be instantiated along with returning the contract address for you.
    - `getErc20Vault`
    - `getEthVault`
    - `getPaymentExitGame`
- `getExitTime` - new function that will calculate the exit schedule required before an exit can be processed and released.
- `getExitQueue` - new function that will retrieve the exit queue for a particular token.
- `getDepositExitData` - new function that allows you to get the exit data for a deposit without using the Watcher.
- `deposit` - simplified the API so users can call one function to deposit both ETH and ERC20.
- `getStandardExitId` - new function that gets a standard exit id to use for processing standard exits.
- `getInFlightExitId` - new function that gets the inflight exit id to use when processing an inflight exit.
- `getInFlightExitData` - new function that retrieves in-flight exit data from an array of exit ids.
- `deleteNonPiggybackedInFlightExit` - new function that deletes an in-flight exit if the first phase has passed and nobody has piggybacked the exit.

### Util Module
- `createTransactionBody` has been improved and made smarter to help users form transaction bodies more easily.
