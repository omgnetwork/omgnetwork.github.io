---
id: transfers
title: Make a Transfer
sidebar_label: Make a Transfer
---

A transfer involves one wallet sending tokens to another wallet on the OMG Network.

## Implementation

For creating a transfer, the following steps are needed:
1. Create a transaction body with the basic information about the transaction, including the UTXOs to be spent by the sender.
2. Convert the transaction body into typed data, a sanitized version of the transaction body intended for transaction signing and encoding.
3. Sign and encode the typed data into a signed transaction.
4. Submit the signed transaction to the Watcher.

There are several ways to send a transaction on the OMG Network. It's recommended to use the first method but you may want to choose another approach for your specific use case.

### Method A

The most "granular" implementation includes fetching fees, creating, typing, signing and submitting the transaction. Such an approach will have the following structure of the code:

> This method demonstrates a transfer made in ETH. If you want to make an ERC20 transfer, change the `currency` value to a corresponding smart contract address. 

<!--DOCUSAURUS_CODE_TABS-->
<!-- JavaScript (ESNext) -->
```js
async function transfer() {
  // fetch ETH fee amount from the Watcher
  const allFees = await childChain.getFees();
  const feesForTransactions = allFees["1"];
  const { amount: feeAmount } = feesForTransactions.find(
    (i) => i.currency === OmgUtil.transaction.ETH_CURRENCY
  );

  // construct a transaction body
  const transactionBody = await childChain.createTransaction({
    owner: "0x8CB0DE6206f459812525F2BA043b14155C2230C0",
    payments: [
      {
        owner: "0xA9cc140410c2bfEB60A7260B3692dcF29665c254",
        currency: OmgUtil.transaction.ETH_CURRENCY,
        amount: "350000000000000",
      },
    ],
    fee: {
      currency: OmgUtil.transaction.ETH_CURRENCY,
      amount: feeAmount,
    },
    metadata: "data",
  });

  // sanitize transaction into the correct typedData format
  // the second parameter is the address of the RootChain contract
  const typedData = OmgUtil.transaction.getTypedData(
    transactionBody.transactions[0],
    "0x96d5d8bc539694e5fa1ec0dab0e6327ca9e680f9"
  );

  // define private keys to use for transaction signing
  const privateKeys = new Array(
    transactionBody.transactions[0].inputs.length
  ).fill("0xCD55F2A7C476306B27315C7986BC50BD81DB4130D4B5CFD49E3EAF9ED1EDE4F7");

  // locally sign typedData with passed private keys, useful for multiple different signatures
  const signatures = childChain.signTransaction(typedData, privateKeys);

  // return encoded and signed transaction ready to be submitted
  const signedTxn = childChain.buildSignedTransaction(typedData, signatures);

  // submit to the child chain
  return childChain.submitTransaction(signedTxn);
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Method B

Another option relies on the child chain completely to create and send the transaction. Note that this method will choose the UTXO for you by using the largest UTXO of that specific currency. Also, you won't able to do 2 transactions in the same block using this method. 

> This method demonstrates a transfer made in ERC20. If you want to make an ETH transfer, change the `currency` value to `OmgUtil.transaction.ETH_CURRENCY`. Notice, the fee is paid in ETH. If you want to know the list of supported tokens you can pay your fee, refer to [Fees documentation](/fees).

<!--DOCUSAURUS_CODE_TABS-->
<!-- JavaScript (ESNext) -->
```js
async function transfer() {
  // construct a transaction body
  const transactions = await childChain.createTransaction({
    owner: "0x8CB0DE6206f459812525F2BA043b14155C2230C0",
    payments: [
      {
        owner: "0xA9cc140410c2bfEB60A7260B3692dcF29665c254",
        currency: "0xd74ef52053204c9887df4a0e921b1ae024f6fe31",
        amount: "350000000000000",
      },
    ],
    fee: {
      currency: OmgUtil.transaction.ETH_CURRENCY,
    },
    metadata: "data",
  });

  // define private keys to use for transaction signing
  const privateKeys = new Array(transactions[0].inputs.length).fill(
    "0xCD55F2A7C476306B27315C7986BC50BD81DB4130D4B5CFD49E3EAF9ED1EDE4F7"
  );

  // locally sign a transaction
  const signedTypedData = childchain.signTypedData(
    transactions[0],
    privateKeys
  );

  // submit the result of signTypedData
  return childChain.submitTyped(signedTypedData);
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Lifecycle

1. A user calls the `createTransaction` function to create a transaction.
2. A user signs, encodes, and submits the transaction's data to the child chain and the Watcher for validation.
3. If the transaction is valid, the child chain server creates a transaction hash and adds the transaction to a pending block.
4. The child chain bundles the transactions in the block into a Merkle tree and submits its root hash to the `Plasma Framework` contract.
5. The Watcher receives a list of transactions from the child chain and recomputes the Merkle root to check for any inconsistency.

> The following conditions would cause the Watcher or the child chain to reject the transaction as invalid:
> - The transaction is using inputs used for another transaction in the block.
> - The transaction is using inputs spent in any prior block.
> - The transaction is using inputs that were exited.
> - The transaction is using inputs from a non-validated deposit.
> - The transaction is signed with an invalid signature.

## Demo Project

This section provides a demo project that contains a detailed implementation of the tutorial. If you consider integrating with the OMG Network, you can use this sample to significantly reduce the time of development. It also provides step-by-step instructions and sufficient code guidance that is not covered on this page.

### JavaScript

For running a full `omg-js` code sample for the tutorial, please use the following steps:

1. Clone [OMG Samples](https://github.com/omgnetwork/omg-samples) repository:

```
git clone https://github.com/omgnetwork/omg-samples.git
```

2. Create `.env` file and provide the [required configuration values](https://github.com/omgnetwork/omg-samples/tree/master/omg-js#setup).

3. Run these commands:

```
cd omg-js
npm install
npm run start
```

4. Open your browser at [http://localhost:3000](http://localhost:3000). 

5. Select [`Make an ETH Transaction`](https://github.com/omgnetwork/omg-samples/tree/master/omg-js/app/03-transaction-eth) or [`Make an ERC20 Transaction`](https://github.com/omgnetwork/omg-samples/tree/master/omg-js/app/03-transaction-erc20) on the left side, observe the logs on the right.

> Code samples for all tutorials use the same repository — `omg-samples`, thus you have to set up the project and install dependencies only one time.
