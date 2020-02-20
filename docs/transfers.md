---
id: transfers
title: Transfers
sidebar_label: Transfers
---

A transfer involves one wallet sending tokens to another wallet on the OMG Network.

## Lifecycle

1. The transaction is created, signed and encoded. 
2. The transaction is submitted to the Watcher and – subsequently – to the child chain for validation. 
3. If the transaction is valid, the child chain creates a transaction hash and adds the transaction to a pending block.
4. The child chain bundles the transactions in the block into a Merkle tree and submits its root hash to the `Plasma Framework` smart contract.
5. The Watcher receives a list of transactions from the child chain and recomputes the Merkle root to check for any inconsistency.


> The following conditions would cause the Watcher or the child chain to reject the transaction as invalid:
>
> - The transaction is using inputs being used for another transaction in the block.
> - The transaction is using inputs spent in any prior block.
> - The transaction is using inputs that were exited.
> - The transaction is using inputs from a non-validated deposit.
> - The transaction is signed with an invalid signature.

## Implementation

The process of creating a transfer can be broken down into four steps:

1. Create a transaction body with the basic information pertaining to the transaction, including the UTXOs to be spent by the sender.

2. Convert the transaction body into typed data - a sanitized version of the transaction body intended for transaction signing and encoding.

3. Sign and encode the typed data into a signed transaction.

4. Submit the signed transaction to the Watcher.

#### Examples:

The most "granular" implementation would look like the following:

```js
function transfer () {
  const transactionBody = OmgUtil.transaction.createTransactionBody({
    fromAddress: aliceAddress,
    fromUtxos: aliceUtxos,
    payments: [
      {
        owner: bobAddress,
        currency: tokenAddress,
        amount: transferAmount
      }
    ],
    fee: {
      currency: tokenAddress,
      amount: transferAmount
    },
    metadata: "data"
  });
  
  const typedData = OmgUtil.transaction.getTypedData(transactionBody, rootChainPlasmaContractAddress)
  const privateKeys = new Array(transactionBody.inputs.length).fill(alicePrivateKey)
  const signatures = childChain.signTransaction(typedData, privateKeys)
  const signedTxn = childChain.buildSignedTransaction(typedData, signatures)
  return childChain.submitTransaction(signedTxn)
}
```

Another method is to call the Watcher for a transaction body with inputs and typed data pre-included:

```js
async function transfer () {
  const transactions = await childChain.createTransaction({
    owner: aliceAddress,
    payments: [
      {
        owner: bobAddress,
        currency: tokenAddress,
        amount: transferAmount
      }
    ],
    fee: {
      currency: tokenAddress,
      amount: transferAmount
    },
    metadata: "data"
  });
  
  const signedTypedData = childchain.signTypedData(transactions[0], privateKeys)
  return childChain.submitTyped(signedTypedData)
}
```
