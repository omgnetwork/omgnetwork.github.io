---
id: version-1.0.0-migration-guide
title: Migration Guide
sidebar_label: Migration Guide
original_id: migration-guide
---

*OMG-JS Migration Guide from 3.0.0-alpha.6 to 3.0.0-0.4.1*

### General changes
- Library has been updated to work with the updated contracts and latest APIs from `elixir-omg`.
- [API documentation](https://developer.omisego.co/omg-js/) significantly improved with correct types and definitions.
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
In most functions, arguments are now passed as objects in this module for easier readability. Please check the [API documentation](https://developer.omisego.co/omg-js/) for more details.
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
