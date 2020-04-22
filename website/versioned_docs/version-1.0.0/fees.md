---
id: version-1.0.0-fees
title: Fees
sidebar_label: Fees
original_id: fees
---

Users are charged a fee to transact on the OMG Network. The OMG Network supports a variety of different tokens that the fee can be paid with. The fees charged are currently pegged to some factor of the gas price of ETH. This can be updated as transaction volume on the network grows.
 
## Supported Tokens
 
To return the list of currently supported fee tokens and amounts charged, `omg-js` includes a helper method to call the `fees.all` endpoint on the Watcher. Note that the returned response will be indexed by the transaction type.
 
```js
childChain.getFees()
```
 
> Fees must meet the exact amount defined in the fee spec, or the transaction will be rejected.
 
> Merge transactions are free and fees are not charged. It is highly encouraged for users to maintain the smallest count of UTXOs possible. This acts as a mitigation for the mass exit vulnerability.
 
## Defining Fees in a Transaction
 
Because fees cannot be explicitly defined in a transaction, they are implicit in the difference between transaction inputs and outputs. 
 
For example:
- Alice has `UTXO1` worth 100 wei.
- Alice wants to send 10 WEI to Bob using `UTXO1` in `TX1`. This transaction will cost 5 wei in fees.
- The transaction body of `TX1` is constructed as follows:
```
inputs: [
  {
    (UTXO1)
    owner: Alice,
    amount: 100,
    currency: ETH
  }
],
outputs: [
  { 
    (UTXO2)
    owner: Bob,
    amount: 10,
    currency: ETH
  },
  {
    (UTXO3)
    owner: Alice,
    amount: 85,
    currency: ETH
  }
]
```
- Bob receives `UTXO2` of 10 wei as his payment, and Alice receives `UTXO3` as a change from the transaction.
- As you can see, the difference between the sum of the inputs (100 wei) to the sum of the outputs (95 wei) is the implicit fee (5 wei). 
 
## A Multi-Currency Transaction Example
 
It is possible to make a payment in one currency and pay the fee in another. This is possible as long as the UTXO used to pay the fee is a supported fee token.
 
For example:
- Alice has `UTXO1` worth 100 wei.
- Alice has `UTXO2` worth 100 OMG.
- Alice wants to send 10 wei to Bob using `UTXO1` in `TX1` and pay the fee using OMG.
- At current prices, the fee for paying in OMG costs 10 OMG per transaction.
- The transaction body of `TX1` is constructed as follows:
```
inputs: [
  {
    (UTXO1)
    owner: Alice,
    amount: 100,
    currency: ETH
  },
  {
    (UTXO2)
    owner: Alice,
    amount: 100,
    currency: OMG
  }
],
outputs: [
  { 
    (UTXO3)
    owner: Bob,
    amount: 10,
    currency: ETH
  },
  {
    (UTXO4)
    owner: Alice,
    amount: 90,
    currency: ETH
  },
  {
    (UTXO5)
    owner: Alice,
    amount: 90,
    currency: OMG
  }
]
``` 
- Bob receives `UTXO3` of 10 wei as his payment, and Alice receives `UTXO4` and `UTXO5` as a change from the transaction.
- As you can see, the difference between the sum of the inputs (100 wei & 100 OMG) to the sum of the outputs (100 wei && 90 OMG) is the implicit fee (10 OMG).
 
## Implementation
 
When creating a transaction using the helper `childchain.createTransaction` in `omg-js`, fee amounts are fetched internally. The only thing the user has to do is to define with which token they want to pay the fee.
 
```js
childChain.createTransaction({
  owner: aliceAddress,
  payments: [
    {
      owner: bobAddress,
      currency: tokenAddress,
      amount: transferAmount
    }
  ],
  fee: {
    currency: feeToken
  },
  metadata: "data"
});
```