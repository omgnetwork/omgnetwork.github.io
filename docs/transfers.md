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

<!--DOCUSAURUS_CODE_TABS-->
<!-- JavaScript -->
```js
async function transfer() {
  // fetch ETH fee amount from the Watcher
  const allFees = await childChain.getFees();
  const feesForTransactions = allFees["1"];
  const { amount: feeAmount } = feesForTransactions.find(
    (i) => i.currency === <CURRENCY>
  );

  // convert transfer amount to wei
  const transferAmount = new BigNumber(
    web3.utils.toWei(<ALICE_ETH_TRANSFER_AMOUNT>, "ether")
  );

  // construct a transaction body
  const transactionBody = await childChain.createTransaction({
    owner: <ALICE_ETH_ADDRESS>,
    payments: [
      {
        owner: <BOB_ETH_ADDRESS>,
        currency: <CURRENCY>,
        amount: Number(transferAmount),
      },
    ],
    fee: {
      currency: <CURRENCY>,
      amount: feeAmount,
    },
    metadata: "data",
  });

  // sanitize transaction into the correct typedData format
  const typedData = OmgUtil.transaction.getTypedData(
    transactionBody.transactions[0],
    rootChainPlasmaContractAddress
  );

  // define private keys to use for transaction signing
  const privateKeys = new Array(transactionBody.transactions[0].inputs.length).fill(<ALICE_ETH_ADDRESS_PRIVATE_KEY>);
  
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

<!--DOCUSAURUS_CODE_TABS-->
<!-- JavaScript -->
```js
async function transfer () {
  // convert transfer amount to wei
  const transferAmount = new BigNumber(
    web3.utils.toWei(<ALICE_ETH_TRANSFER_AMOUNT>, "ether")
  );

  // construct a transaction body
  const transactions = await childChain.createTransaction({
    owner: <ALICE_ETH_ADDRESS>,
    payments: [
      {
        owner: <BOB_ETH_ADDRESS>,
        currency: <CURRENCY>,
        amount: Number(transferAmount),
      },
    ],
    fee: {
      currency: <CURRENCY>
    },
    metadata: "data"
  });

  // define private keys to use for transaction signing
  const privateKeys = new Array(transactions[0].inputs.length).fill(<ALICE_ETH_ADDRESS_PRIVATE_KEY>);
  
  // locally sign a transaction
  const signedTypedData = childchain.signTypedData(transactions[0], privateKeys);
  
  // submit the result of signTypedData
  return childChain.submitTyped(signedTypedData);
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Lifecycle

1. The transaction is created, signed, and encoded. 
2. The transaction is submitted to the child chain and the Watcher for validation.
3. If the transaction is valid, the child chain server creates a transaction hash and adds the transaction to a pending block.
4. The child chain bundles the transactions in the block into a Merkle tree and submits its root hash to the `Plasma Framework` contract.
5. The Watcher receives a list of transactions from the child chain and recomputes the Merkle root to check for any inconsistency.

> The following conditions would cause the Watcher or the child chain to reject the transaction as invalid:
> - The transaction is using inputs used for another transaction in the block.
> - The transaction is using inputs spent in any prior block.
> - The transaction is using inputs that were exited.
> - The transaction is using inputs from a non-validated deposit.
> - The transaction is signed with an invalid signature.

## Real-World Code Sample

This section provides a demo project that contains a detailed implementation of the tutorial. If you consider integrating with the OMG Network, you can use this sample to significantly reduce the time of development. It also provides step-by-step instructions and sufficient code guidance that is not covered on this page.

### JavaScript

For running a full `omg-js` code sample for the tutorial, please use the following steps:

1. Clone [OMG Samples](https://github.com/omisego/omg-samples) repository:

```
git clone https://github.com/omisego/omg-samples.git
```

2. Enter the root of `omg-js` folder:

```
cd omg-js
```

3. Install dependencies:

```
npm install
```

4. Create `.env` file and provide the [required configuration values](https://github.com/omisego/omg-samples/tree/master/omg-js#setup).

5. Run the app:

```
npm run start
```

6. Open your browser at [http://localhost:3000](http://localhost:3000). 

7. Select [`Make an ETH Transaction`](https://github.com/omisego/omg-samples/tree/master/omg-js/app/03-transaction-eth) or [`Make an ERC20 Transaction`](https://github.com/omisego/omg-samples/tree/master/omg-js/app/03-transaction-erc20) on the left side, observe the logs on the right.

> Code samples for all tutorials use the same repository — `omg-samples`, thus skip steps 1-4 if you've set up the project already.
