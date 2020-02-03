---
id: managing-utxos
title: Managing UTXOs
sidebar_label: Managing UTXOs
---


UTXOs are core to the logic of the OMG Network. Read more about what UTXOs are in the [Glossary](glossary#UTXO).

## User Considerations

A user may find it desirable to *merge* or *split* UTXOs that her or she owns.

### Merging UTXOs

Merging UTXOs is desirable in the following scenarios.

 1. **Exiting your funds as a single UTXO**

Standard Exits are initated on a single UTXO and not a specified amount. However, a user may want to exit an amount greater than the value of any UTXO he or she owns. For example: 

- Alice owns 4 UTXOs worth 1 ETH each. 
- Alice would like to withdraw all her funds from the network. 
- To exit her funds, Alice would need to initiate a `Standard Exit` (with an `exit bond`) on each UTXO.

> In the above scenario, it would be more economical for Alice to merge these UTXOs and exit a single one.


2. **Fitting Inputs into a Transaction**

A transaction can have a maximum of <u>four inputs</u> ‒ but a user may not own four UTXOs that can cover the amount needed for a given transaction. For example: 

- Alice owns 5 UTXOs worth 1 ETH each. 
- Alice would like to send 5 ETH to Bob. 
- Alice cannot send 5 ETH to Bob in a single transaction as a transaction can take four inputs only. 

> In the above scenario, Alice can merge her UTXOs in order to send the desired amount to Bob in a single transaction.

**Implementation**

A merge transaction is formatted as an ordinary transaction whereby the sender is specified as the recipient.

```js
const payments = [{
    owner: Bob,
    currency: <UTXO_CURRENCY>,
    amount: <UTXO_TOTAL_AMOUNT>
}];

const txBody = OmgUtil.transaction.createTransactionBody({
    fromAddress: Bob,
    fromUtxos: [BobsUTXO1, BobsUTXO2],
    payments,
    fee: {
        amount: 0,
        currency: transaction.ETH_CURRENCY
    }
});
```

### Splitting UTXOs

For the same reason that a user may want to *merge* UTXOs prior to a Standard Exit, a user may also want to *split* UTXOs if he or she would like to exit an amount smaller than the value of any UTXO he or she owns. For example: 

- Alice owns 1 UTXO worth 5 ETH. 
- Alice would withdraw 2 ETH back onto the root chain. 
- Alice cannot exit 2 ETH unless she splits her UTXO.

> In the above scenario, Alice can split her UTXO in order to withdraw 2 ETH. 

**Implementation**

A split transaction is formatted as an ordinary transaction whereby: 

- The sender is specified as the recipient. 
- The input consist of a single UTXO.
- The transaction amount is set at the amount the user wants to split from said UTXO.

```js
const payments = [{
    owner: Bob,
    currency: <UTXO_CURRENCY>,
    amount: <AMOUNT_TO_SPLIT>
}];

const txBody = OmgUtil.transaction.createTransactionBody({
    fromAddress: Bob,
    fromUtxos: [BobUTXO],
    payments,
    fee: {
        amount: 0,
        currency: transaction.ETH_CURRENCY
    }
});
```

### Cost

<u>No fee is charged</u> for merge or split transactions on the OMG Network. 

> For this purpose, a transaction is determined to be fee-exempt if all its inputs and outputs belong to the same address.

## Network Considerations

...