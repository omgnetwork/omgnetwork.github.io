---
id: fees
title: Fees
sidebar_label: Fees
---

Users are charged a fee to transact on the OMG Network. The OMG Network supports a variety of different tokens that the fee can be paid with. The fees charged are currently pegged to some factor of the gas price of ETH. This can be updated as transaction volume on the network grows.
 
## Supported Tokens

There are two ways to find a list of supported tokens:
1. Block explorer: [Ropsten testnet](https://blockexplorer.ropsten.v1.omg.network/fees).
2. Calling the `getFees` function using one of the available libraries. [`omg-js`](https://github.com/omisego/omg-js) includes a helper method to call the `fees.all` endpoint on the Watcher. Note that the returned response will be indexed by the transaction type.
 
<!--DOCUSAURUS_CODE_TABS-->
<!-- JavaScript -->
```js
function getFees() {
  return childChain.getFees();
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

- Fees must meet the exact amount defined in the fee spec, or the transaction will be rejected.
- Merge transactions are free and fees are not charged. It is highly encouraged for users to maintain the smallest count of UTXOs possible. This acts as a mitigation for the mass exit vulnerability.
- The `getFees` function returns an array that contains numbered objects with the following structure:

```
{
  "1": [
    {
      "amount": 30000000000000,
      "currency": "0x0000000000000000000000000000000000000000",
      "pegged_amount": null,
      "pegged_currency": null,
      "pegged_subunit_to_unit": null,
      "subunit_to_unit": "0de0b6b3a7640000",
      "updated_at": "2020-01-01T10:10:00Z"
    }
  ]
}
```
 
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

> The most common use cases for defining custom fees are during merging or splitting UTXOs. You can find more details and demo project [here](managing-utxos).
