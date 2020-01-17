---
id: transfers
title: Transfers
sidebar_label: Transfers
---

## Transfers

## Definition

A transfer involves one wallet sending tokens to another wallet on the OMG Network.

## Lifecycle

Once a transaction is created, signed and encoded, it is submitted to the `Watcher`.

The `Watcher` will check for various conditions of invalidity before submitting the transaction to the child chain.

> The following conditions would cause the `Watcher` to invalidate the transaction:
>
> - The transaction is using inputs being used for another transaction in the block.
> - The transaction is using inputs spent in any prior block.
> - The transaction is using inputs that were exited.
> - The transaction is using inputs from a non-validated deposit.
> - The transaction is signed with an invalid signature.

The child chain will subsequently create a transaction hash, mark the transaction inputs as spent and create the transaction inputs - before adding the transaction the currently pending child chain block. This block is then submitted to the root chain for finalization.

## Implementation

Four steps are required to implement the deposit flow:

1. Create a transaction body with the basic information pertaining to the transaction, including the UTXOs to be spent by the sender.

2. Convert the transaction body into typed data - a sanitized version of the transaction body intended for transaction signing and encoding.

3. Sign and encode the typed data into a signed transaction.

4. Submit the signed transaction to the `Watcher`.
