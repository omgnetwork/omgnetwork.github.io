---
id: in-flight-exits
title: In Flight Exits
sidebar_label: In Flight Exits
---

Exits allow a user to withdraw funds from the OMG Network back onto the root chain. There are two types of exit:
standard exits and in-fligt exits (IFEs). This section will cover in-flight-exits.

A user would consider an in-flight exit in the following scenarios:

- The user has signed and broadcast a transaction, but is unable to verify its inclusion in a block.
- The user can see that the transaction has been included in a block, but believes that the block is invalid due to a dishonest operator.

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

To get the necessary exit data, a user must have access to the signed transaction and call the `Watcher`.

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

The above will make a call to the `Payment Exit Game` smart contract and commit a bond to the exit.
