---
id: version-1.0.0-migration-0.2-0.3
title: Introducing v0.3 (ODP Edition)
sidebar_label: 0.2 to 0.3
original_id: migration-0.2-0.3
---

## What we learned in v0.2
When we launched Samrong (OMG Network v0.2), we asked users who were already using Ari (v0.1) to perform a “hard upgrade” to move their tokens to the new environment. The process involved performing an exit from Ari and re-depositing your tokens into Samrong. This is all due to the nature of plasma security and smart contracts. In order for the operator to upgrade the Network, the whole system needs to be re-deployed from scratch. This makes it very difficult to maintain and there is a lot of complex steps for the users to perform an upgrade.

## Introducing OMG Plasma Framework
Since v0.2, we’ve been working on an extensible framework based on Plasma Group’s predicate work, which we call The OMG Plasma Framework. We introduced multiple abstractions, which allows for the child chain operator to add new functionality the Network _without_ the need for users to perform hard upgrades. While this doesn’t entirely rule out a hard upgrade in the future, it does mean that we can roll out new features such as new token types and new transaction types beyond simple peer to peer payments.

## What’s new?
What this looks like for client application, is that instead of having one single monolithic contract like in v0.2, the framework introduces more entry points, with each contract fulfilling a different purpose:

- `Erc20Vault`: a vault for clients to deposit ERC20 tokens
- `EthVault`: a vault for clients to deposit ETH
- `PlasmaFramework`: a central Plasma framework smart contract
- `PaymentExitGame`: a smart contract that maintains Plasma security for payment transaction type.


## Known Issues
Due to the current Samrong downtime, we are deploying this environment to the ODP much earlier than we had planned. This motivation of this early release is to allow ODP members to continue their integration work while we investigate the current issues with Samrong. While the major happy paths are working, we are still in the process of validating the new network, as well as finishing any supporting libraries and documentation.

Things to be aware of:
- These contracts are under audit and subject to change before launching the full Lumphini network
- omg-js (version 3.0.0-alpha.6) does not yet support challenging invalid piggyback events. As well as some implementation examples in the repository being out of date and needing to be updated.
- js-starter-kit support for v0.3 and documentation is not yet available on master branch


## Migrating from v0.2 (Samrong) to v0.3 (pre-Lumphini)
There small changes API changes in the Watcher APIs relating to Exits. There are more significant changes to the way the contracts are organized. Here’s how to get your v0.2 integration working with v0.3:

Update your Watcher and Child Chain endpoints to match the new [`pre-lumpini` services](https://github.com/omgnetwork/dev-portal/blob/master/guides/network_endpoints.md)

### Deposits
- Deposits now go to a vault contract, depending on whether you are depositing ETH or an ERC-20 token. You must now send your deposits to the correct vault contract. If using ETH, deposit into ETH_VAULT. If using ERC-20 send your deposits to the ERC20_VAULT.
- If depositing ERC-20, the same process of approving still applies - you must approve the ERC20_VAULT address to transfer the amount of tokens that you want to deposit.

### Transactions
- The structure of typed data has changed slightly in v0.3, still following the EIP-712 signing method. Please refer to the following if building and [signing the transaction](https://github.com/omgnetwork/plasma-contracts/blob/master/plasma_framework/docs/integration-docs/integration-doc.md#eip-712-signing) yourself.
- omg-js provides many helper methods that abstract away these details to create and submit a Child Chain transaction with v0.3.

### Exits
- In v0.3, exits for both ETH and ERC-20 have a prerequisite that an exit queue must exist for the token that is being exited. A new exit queue can be created by calling ‘addExitQueue’ on the Plasma Framework contract, specifying the vault id of the token (1 for ETH, 2 for ERC-20).
- Exits and their challenges are now called from the PaymentExitGame contract. The inputs for both standard and in flight exits have changed slightly. Please see below for implementation detail with regards to the Omg-js library.

## omg-js
- For reference implementation of each process, it is recommended to go through the [integration tests](https://github.com/omgnetwork/omg-js/tree/v0.3/packages/integration-tests/test) written in the library.

- Childchain object instantiation now accepts a proxy url for requests made to the watcher
  - v0.2: `new ChildChain(config.watcher_url)`
  - v0.3: `new ChildChain({ watcherUrl, watcherProxyUrl })`
- Inputs to starting an in flight exit have changed slightly
  - v0.2: `rootChain.startInFlightExit(inflightTx, inputTx, inputTxInclusionProofs, inflightTxSigs, txOptions)`
  - v0.3: `rootChain.startInFlightExit(inflightTx, inputTx, inputTxInclusionProofs, inflightTxSigs, inputUtxoPos, sigs, outputGuardPreImageForInputs, inputSpendingConditionOptionalArgs, txOptions)`
- Challenging standard exits have added an extra input
  - v0.2: `rootChain.challengeStandardExit(exitId, txbytes, inputIndex, sig, options)`
  - v0.3: `rootChain.challengeStandardExit(exitId, exitingTx, txbytes, inputIndex, sig, options)`
- Vault addresses and the exit game contract address can be retrieved directly from the rootChain object for integration with ALD
  - `rootChain.getErc20VaultAddress()`
  - `rootChain.getEthVaultAddress()`
  - `rootChain.getPaymentExitGameAddress()`
- Piggypacking in flight exits on output have changed
  - v0.2: `rootChain.piggybackInFlightExit(inflightTx, outputIndex, options)`
  - v0.3: `rootChain.piggybackInFlightExitOnOutput(inflightTx, outputIndex, outputGuardPreImage, options)`
- Challenging non canonical inflight exits
  - v0.2: `challengeInFlightExitNotCanonical(inFlightTx, inFlightTxInputIndex, competingTx, competingTxInputIndex, competingTxPos, competingTxInclusionProof, competingTxSig, txOptions)`
  - v0.3: `challengeInFlightExitNotCanonical({ inputTx, inputUtxoPos, inFlightTx, inFlightTxInputIndex, competingTx, competingTxInputIndex, outputGuardPreimage, competingTxPos, competingTxInclusionProof, competingTxWitness, competingTxConfirmSig, competingTxSpendingConditionOptionalArgs, txOptions })`
- Checking whether a token has been added to the exit queue is now possible with v0.3
  - `rootChain.hasToken(token)`
- The Omg-js-util package has exported some new helpers including
  - `hexPrefix`: helper for prefixing hex values
  - `ethErrorReason`: helper for decoding error messages received from the EVM
- The ChildChain object has exported new helper methods to facilitate sending transactions
  - `signTypedData(txData, privateKeys)`: signs transaction typed data returned from the createTransaction call
  - `submitTyped(data)`: submits a transaction along with its typed data and signatures to the watcher
- If using a supported web3 version, callbacks can be passed when depositing to get more detailed information during the entire transaction lifecycle, instead of just on receipt. This is however still a work in progress to be able to support all transaction calls.

## Watcher API Changes

- [`/in_flight_exit.get_data`](https://docs.omg.network/elixir-omg/docs-ui/?urls.primaryName=master%2Fsecurity_critical_api_specs#/InFlightExit/in_flight_exit_get_data)
  - Response:
    - `input_txs`: is now an array of hex encoded binaries, instead of one concatenated binary
    - `input_txs_inclusion_proofs`: same as above
    - `in_flight_tx_sigs`: same as above
    - `input_utxos_pos`: new field, an array of utxo positions of inputs to the ife tx
- [`/in_flight_exit.get_competitor`](https://docs.omg.network/elixir-omg/docs-ui/?urls.primaryName=master%2Fsecurity_critical_api_specs#/InFlightExit/in_flight_exit_get_competitor)
  - Response:
    - `input_tx`: new field, hex encoded binary with the transaction that created the double-spent input
    - `input_utxo_pos`: new field, utxo position of the double-spent input
- [`/in_flight_exit.get_input_challenge_data`](https://docs.omg.network/elixir-omg/docs-ui/?url=master%2Foperator_api_specs.yaml&urls.primaryName=master%2Fsecurity_critical_api_specs#/InFlightExit/in_flight_exit_get_input_challenge_data)
  - Response:
    - Same changes as `/in_flight_exit.get_competitor` above
- [`/status.get`](https://docs.omg.network/elixir-omg/docs-ui/?urls.primaryName=master%2Fsecurity_critical_api_specs#/Status/status_get)
  - Response:
    - `contract_addr`: instead of a hex encoded binary, now an object with entries being pairs of “name: contract_address”; all contract addresses within the object are hex encoded binaries
- [`/utxo.get_challenge_data`](https://docs.omg.network/elixir-omg/docs-ui/?urls.primaryName=master%2Fsecurity_critical_api_specs#/UTXO/utxo_get_challenge_data)
  - Response:
    - `exiting_tx`: new field, hex encoded binary with the transaction that created the exiting output