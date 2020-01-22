---
id: in-flight-exits
title: In Flight Exits
sidebar_label: In Flight Exits
---

Exits allow a user to withdraw funds from the OMG Network back onto the root chain. There are two types of exit:
standard exits and in-flight exits (IFEs). This section will cover in-flight-exits.

A transaction is considered to be “in-flight” if it has been broadcast but has not yet been included in the Plasma chain. It may also be in-flight from the perspective of an individual user if that user does not have access to the block in which the said transaction is included.

A user may consider an in-flight _exit_ in the following scenarios:

- The user has signed and broadcast a transaction, but is unable to verify its inclusion in a block.
- The user can see that the transaction has been included in a block, but believes that the block is invalid due to a dishonest operator.

For more scenarios elaborated in detail, click [here]().

The user can initiate an IFE regardless of whether the above is factually correct, but must commit an `exit bond`. The purpose of the `exit bond` is to deter users from initating exits dishonestly, as this bond will be awarded to any party who successfully proves that the exit is dishonest.

> For further information on the bond mechanism and the definiton of a "dishonest" exit, please see the [Appendix]().

> The exit protocol forms the crux of the Plasma design. This guide aims to only discuss implementation of these concepts with respect to the OMG Network. If you want a deeper dive of these concepts, further discussion can be found on the [MoreVP Technical Overview](morevp-technical-overview).

## Implementation

The full lifecycle of an in-flight exit occurs in the following steps:

1. Getting the in-flight exit data
2. Starting the in-flight exit
3. Piggybacking the selected inputs or outputs.
4. Waiting for the challenge period, challenging and responding to challenges if necessary
5. Processing the exit

> Only steps 1-3 will be covered in this guide as challenges, responses, and processing exits warrant their own section.

## Getting Exit Data

A transaction is termed `exitable` if it is correctly formed and properly signed by the owner(s) of the transaction input(s).

To get the necessary exit data, a user must call the `Watcher` with the signed transaction.

```js
childChain.inFlightExitGetData(signedTransaction);
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
});
```

The above will call the `Payment Exit Game` smart contract and commit a bond to the exit.

## Piggybacking

A user can `piggyback` onto the exit once it is initiated. This requires placing a `piggyback bond` on selected UTXOs in order to claim ownership and receive them on the root chain once the exit is finalized.

To successfully withdraw an output `out` to a transaction `tx`, it must be established that:

1. _tx_ is exitable.
2. _tx_ is canonical.

> A transaction is canonical if its inputs were not spent in another transaction previously. Read more about canonicity in the [Glossary]().

The owner of an output can `piggyback` with the following call:

```js
rootChain.piggybackInFlightExitOnOutput({
  outputIndex,
  inFlightTx: exitData.in_flight_tx,
  txOptions: {
    privateKey: aliceAccount.privateKey,
    from: aliceAccount.address
  }
});
```

There are specific scenarios whereby a user will want to exit his or her inputs in a **non-canonical** transaction.
It must be established that the transaction is indeed non-canonical for this to be successful.

The owner of an input can `piggyback` with the following call:

```js
rootChain.piggybackInFlightExitOnInput({
  inputIndex,
  inFlightTx: exitData.in_flight_tx,
  txOptions: {
    from: Alice,
    privateKey: AlicePrivateKey
  }
});
```

Both will call the `Payment Exit Game` smart contract and commit a `piggyback bond`.

Note that since a transaction is either canonical or non-canonical, only the transaction's inputs or outputs, and not both, may be withdrawn.
