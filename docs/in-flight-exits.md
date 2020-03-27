---
id: in-flight-exits
title: In Flight Exits
sidebar_label: In Flight Exits
---

Exits allow a user to withdraw funds from the OMG Network back onto the root chain. There are two types of exit: standard exits and in-flight exits (IFEs). This section will cover in-flight-exits.

A transaction is considered to be “in-flight” if it has been broadcasted but has not yet been included in the child chain. It may also be in-flight from the perspective of an individual user if that user does not have access to the block where the said transaction is included.

A user may consider an exit _in-flight_ in the following scenarios:

- The user has signed and broadcast a transaction, but is unable to verify its inclusion in a block.
- The user can see that the transaction has been included in a block, but believes that the block is invalid due to a dishonest operator.

The user can initiate an IFE regardless of whether the above is factually correct, but must commit an `exit bond`. The purpose of the `exit bond` is to deter users from initiating exits dishonestly, as this bond will be awarded to any party who successfully proves that the exit is dishonest.

> Read more about exit bonds [here](exitbonds).

> The exit protocol forms the crux of the Plasma design. This guide aims to only discuss the implementation of these concepts with respect to the OMG Network. If you want a deeper dive into these concepts, further discussion can be found on the [MoreVP Technical Overview](morevp-technical-overview).

## Implementation

The full lifecycle of an in-flight exit occurs in the following steps:

1. Getting the in-flight exit data.
2. Starting the in-flight exit.
3. Piggybacking the selected inputs or outputs.
4. Waiting for the challenge period, challenging and responding to challenges if necessary.
5. Processing the exit.

> Only steps 1-3 will be covered in this guide as challenges, responses, and processing exits warrant their section.

## Getting Exit Data

A transaction is termed `exitable` if it is correctly formed and properly signed by the owner(s) of the transaction input(s).

To get the necessary exit data, a user must call the Watcher with the signed transaction.

```js
childChain.inFlightExitGetData(signedTransaction)
```

## Starting the IFE

With the exit data, the user can start the in-flight exit to withdraw their funds from the OMG Network.

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

> The inclusion proof is a Merkle proof that the transaction(s) creating the input(s) into the in-flight transaction was/were included in a given valid block.

The above will call the `Payment Exit Game` smart contract and commit a bond to the exit.

## Piggybacking

Once an in-flight exit is initiated, the Watcher emits a `piggyback_available` event. 

```json
{
  "event": "piggyback_available",
  "details": {
    "txbytes": "0xf3170101c0940000...",
    "available_outputs" : [
      {"index": 0, "address": "0xb3256026863eb6ae5b06fa396ab09069784ea8ea"},
      {"index": 1, "address": "0x488f85743ef16cfb1f8d4dd1dfc74c51dc496434"},
    ],
    "available_inputs" : [
      {"index": 0, "address": "0xb3256026863eb6ae5b06fa396ab09069784ea8ea"}
    ],
  }
}
```

This means that a user can `piggyback` onto the in-flight exit. This requires placing a `piggyback bond` on a UTXO from the available set in order to claim ownership and receive it on the root chain once the exit is finalized.

To successfully withdraw an output `out` to a transaction `tx`, it must be proven that:

1. _tx_ is exitable.
2. _tx_ is canonical.

> A transaction is canonical if its inputs were not spent in another transaction previously. Read more about what makes a transaction canonical or non-canonical in the [Glossary](glossary#canonical-transaction).

The owner of an output can `piggyback` with the following call:

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

There are specific scenarios whereby a user will want to exit his or her inputs in a **non-canonical** transaction. It must be established that the transaction is indeed non-canonical for this to be successful.

The owner of an input can `piggyback` with the following call:

```js
rootChain.piggybackInFlightExitOnInput({
  inputIndex,
  inFlightTx: exitData.in_flight_tx,
  txOptions: {
    from: Alice,
    privateKey: AlicePrivateKey
  }
})
```

Both will call the `Payment Exit Game` smart contract and commit a `piggyback bond`.

Note that since a transaction is either canonical or non-canonical, only the transaction's inputs or outputs, and not both, may be withdrawn.