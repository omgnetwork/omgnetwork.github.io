---
id: in-flight-exits
title: In Flight Exits
sidebar_label: In Flight Exits
---

Exits provide the ability to exit funds from the OmiseGO Network back onto the Rootchain. There are 2 types of exits, standard exits and in-flight exits. This section will only discuss in-flight exits (IFE).

A transaction is considered in-flight in these scenarios:

* Transaction has been broadcast but has not yet been included in the child chain, or the user does not have access to the block in which the transaction is included; or,
* User has access to the block, but the block is invalid (due to a dishonest operator).

> The exit protocol forms the crux of the Plasma design. This guide aims to only discuss implementation of these concepts with respect to the OmiseGO Network. If you want a deeper dive of these concepts, further discussion can be found on the [MoreVP Technical Overview](morevp-technical-overview).

## Implementation

The full lifecycle of an in-flight exit occurs in the following steps:
1. Getting the in-flight exit data
2. Starting the in-flight exit
3. Piggybacking the in-flight exit
4. Waiting for the challenge period, challenging and responding to challenges if necessary
5. Processing the exit

Only steps 1-3 will be covered in this guide as challenges, responses, and processing exits warrant their own section.

## Getting Exit Data
There are a few different scenarios for the type of information the user has when starting an in-flight exit.

The first scenario is when the user has access to the signed transaction, but has not seen this transaction get included into a block. They can call the Watcher to return the necessary information.

```js
childChain.inFlightExitGetData(signedTransaction)
```

## Starting the IFE
With sufficient data about the exit, users can start an in-flight exit and later piggyback their input or output to get their funds out of the OmiseGO Network.

```js
rootChain.startInFlightExit({
  inFlightTx: exitData.in_flight_tx,
  inputTxs: exitData.input_txs,
  inputUtxosPos: exitData.input_utxos_pos,
  inputTxsInclusionProofs: exitData.input_txs_inclusion_proofs,
  inFlightTxSigs: exitData.in_flight_tx_sigs,
  txOptions: {
    from: Alice,
    privateKey: AlicePrivateKey
  }
})
```

## Piggybacking IFE Output
Piggybacking is when a user will place a bond on a UTXO involved in an in-flight exit. They are claiming that they have rightful ownership of this UTXO and would like to receive these funds when the exit settles.

```js
rootChain.piggybackInFlightExitOnOutput({
  outputIndex,
  inFlightTx: exitData.in_flight_tx,
  txOptions: {
    from: Alice,
    privateKey: AlicePrivateKey
  }
})
```

## Piggybacking IFE Input
Piggybacking an input occurs when....
