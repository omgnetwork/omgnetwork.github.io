---
id: chained-trx
title: Make a Chained Transaction
sidebar_label: Make a Chained Transaction
---

Chained transactions represent a set of sequential transactions where the result and UTXO(s) of the previous transaction are used to perform the next one.

## Implementation

### 1. Install [`omg-js`](https://github.com/omgnetwork/omg-js), [`ethereumjs-util`](https://github.com/ethereumjs/ethereumjs-util), [`eth-sig-util`](https://github.com/MetaMask/eth-sig-util), [`bn.js`](https://github.com/indutny/bn.js), [`bignumber.js`](https://github.com/MikeMcl/bignumber.js)

To access network features from your application, use our official libraries:

<!--DOCUSAURUS_CODE_TABS-->

<!-- Node -->

Requires Node >= 8.11.3 < 13.0.0

```js
npm install @omisego/omg-js ethereumjs-util eth-sig-util bn.js bignumber.js
```

<!-- Browser -->

You can add `omg-js` to a website using a script tag:

```js
<script src="https://unpkg.com/@omisego/browser-omg-js"></script>
```

<!-- React Native -->

You can easily integrate `omg-js` with React Native projects. First, add this postinstall script to your project's `package.json`:

```js
"scripts": {
    "postinstall": "omgjs-nodeify"
}
```

Then install the react native compatible library:

```js
npm install @omisego/react-native-omg-js
```

<!--END_DOCUSAURUS_CODE_TABS-->

<!--DOCUSAURUS_CODE_TABS-->
<!-- JavaScript (ESNext) -->

### 2. Import dependencies, define constants

```js
import BN from "bn.js";
import BigNumber from "bignumber.js";
import { ChildChain, OmgUtil } from "@omisego/omg-js";
import config from "../../config.js";
const ethUtil = require('ethereumjs-util');
const sigUtil = require('eth-sig-util');

const childChain = new ChildChain({
  watcherUrl: watcherUrl,
  watcherProxyUrl: '',
  plasmaContractAddress: plasmaContractAddress
});

// constants
const sender = {
  address: '0x8CB0DE6206f459812525F2BA043b14155C2230C0',
  privateKey: 'CD55F2A7C476306B27315C7986BC50BD81DB4130D4B5CFD49E3EAF9ED1EDE4F7'
}

const receiverA = {
  address: '0xA9cc140410c2bfEB60A7260B3692dcF29665c254',
  privateKey: 'E4F82A4822A2E6A28A6E8CE44490190B15000E58C7CBF62B4729A3FDC9515FD2'
}

const receiverB = {
  address: '0x001ebfBd3C6D6855bF4EF1a2Ec7f2a779B1028C2',
  privateKey: '5444fec49a972a1c6264745610ef3c8107980540ff3d732af4c5ddb87c5f03c2'
}

const transfer = {
  plasmaContractAddress: '0xb43f53394d86deab35bc2d8356d6522ced6429b5',
  currency: '0xd92e713d051c37ebb2561803a3b5fbabc4962431',
  feeCurrency: OmgUtil.transaction.ETH_CURRENCY
}
```

> - `watcherUrl` - the Watcher Info URL for defined [environment](/environments) (personal or from OMG Network).
> - `plasmaContractAddress` - `CONTRACT_ADDRESS_PLASMA_FRAMEWORK` for defined [environment](/environments).

> The above constants are defined for the Rinkeby environment. If you want to work with the Mainnet, check the [Environments](/environments) page.

### 3. Create helpers

#### BigNumber helper

BigNumber helper converts a given amount into a BigNumber. It helps to be explicit about how many decimals your token has when you convert the transferred amount while performing a chained transaction. Most of the tokens have 18 decimals by default, however, some tokens have 6 (e.g. USDT), or even 0 decimals.

```js
// NOTE: bn.js no longer supports conversion from float numbers, only integers
const amountToBN = (amount, decimals = 18) => {
  const multiplier = new BigNumber(10).pow(decimals);
  const subunit = new BigNumber(amount).times(multiplier).toFixed();
  return new BN(subunit);
}
```

#### Fee helper

The fee helper retrieves the fee amount you need to pay during a chained transaction.

```js
const getFeeAmount = async (currency) => {
  const fees = await childChain.getFees();
  const selectedFee = fees['1'].find(fee => fee.currency === currency);
  return BN.isBN(selectedFee.amount)
    ? selectedFee.amount
    : new BN(selectedFee.amount.toString());
}
```

#### UTXO change helper

UTXO change helper checks if the provided UTXO (payment or fee) needs a change. If the change is needed, the helper creates and pushes an additional output to the existing array of transaction outputs.

```js
const checkUtxoForChange = (address, utxo, amount, transactionBody) => {
  BN.isBN(utxo.amount)
    ? utxo.amount
    : new BN(utxo.amount.toString());

  if (!utxo || utxo.length === 0) {
    throw new Error(`No UTXO provided for ${address}`);
  }

  if (transactionBody.outputs.lenght > 4) {
    throw new Error(`The provided transaction body has 4 outputs. You need to have at least 1 spare output to proceed.`);
  }

  if (utxo.amount.gt(amount)) {
    const changeAmount = utxo.amount.sub(amount);
    const changeOutput = {
      outputType: 1,
      outputGuard: address,
      currency: utxo.currency,
      amount: changeAmount
    }
    transactionBody.outputs.push(changeOutput);
  }
}
```

#### Signature helper

Signature helper signs and returns signatures based on the number of provided inputs. 

```js
const getSignatures = (typedData, signer, inputsNumber) => {
  const toSign = OmgUtil.transaction.getToSignHash(typedData);
  const signature = ethUtil.ecsign(
    toSign,
    Buffer(signer.privateKey.replace('0x', ''), 'hex')
  );
  const signedTypedData = sigUtil.concatSig(signature.v, signature.r, signature.s);
  const signatures = new Array(inputsNumber).fill(signedTypedData);
  return signatures;
}
```

#### Next transaction UTXO helper

Next transaction UTXO helper returns change payment and fee UTXOs that will be used to construct a custom transaction body for the next transaction in a chained transaction sequence. Note, you need to find the index of the output in a transaction (i.e. `oindex`) to find the corresponding UTXOs as follows:

```js
const getNextTransationUtxo = (
  transactionBody,
  receipt,
  transferCurrency,
  sender,
  feeCurrency
) => {
  let nextPaymentUtxo = [];
  let nextFeeUtxo = [];

  // receive token output index
  const tokenOutputIndex = transactionBody.outputs.findIndex(
    output => output.currency.toLowerCase() === transferCurrency.toLowerCase()
      && output.owner.toLowerCase() === sender.address.toLowerCase()
  );

  // set payment uxto for the next transfer
  if (tokenOutputIndex !== -1) {
    nextPaymentUtxo = transactionBody.outputs[tokenOutputIndex];
    nextPaymentUtxo.blknum = receipt.blknum;
    nextPaymentUtxo.txindex = receipt.txindex;
    nextPaymentUtxo.oindex = tokenOutputIndex;
  }

  // receive fee output index
  const feeOutputIndex = transactionBody.outputs.findIndex(
    output => output.currency.toLowerCase() === feeCurrency.toLowerCase()
      && output.owner.toLowerCase() === sender.address.toLowerCase()
  );

  // set fee uxto for the next transfer
  if (feeOutputIndex !== -1) {
    nextFeeUtxo = transactionBody.outputs[feeOutputIndex];
    nextFeeUtxo.blknum = receipt.blknum;
    nextFeeUtxo.txindex = receipt.txindex;
    nextFeeUtxo.oindex = feeOutputIndex;
  }
  return {
    tokenOutputIndex, feeOutputIndex, nextPaymentUtxo, nextFeeUtxo
  }
}
```

#### Custom transaction body helper

This helper allows constructing a custom transaction body that is required to make a chained or any type of non-standard transaction on the OMG Network.

```js
const createTransactionBody = (
  sender,
  senderUtxo,
  receiver,
  feeAmount,
  feeUtxo,
  transferAmount,
  metadata
) => {

  // encode metadata
  const encodedMetadata = metadata
    ? OmgUtil.transaction.encodeMetadata(metadata)
    : OmgUtil.transaction.NULL_METADATA;

  // construct transaction body
  const transactionBody = {
    inputs: [senderUtxo, feeUtxo],
    outputs: [{
      outputType: 1,
      outputGuard: receiver,
      currency: senderUtxo.currency,
      amount: transferAmount
    }],
    metadata: encodedMetadata
  }

  // check payment and fee utxo for change
  checkUtxoForChange(sender, senderUtxo, transferAmount, transactionBody);
  checkUtxoForChange(sender, feeUtxo, feeAmount, transactionBody);
  return transactionBody;
}
```

### 4. Create 'Send transaction' function

A chained transaction consists of the standard payment transaction and a subsequent set of custom transactions. You can send the first one as any other transaction on the network as follows:

```js
async function sendTransaction(
  childChain,
  sender,
  receiver,
  amount,
  currency,
  feeCurrency,
  metadata
) {

  const payments = [{
    owner: receiver.address,
    currency,
    amount: amount
  }];

  const transactionBodyResult = await childChain.createTransaction({
    owner: sender.address,
    payments,
    fee: {
      currency: feeCurrency
    },
    metadata: metadata
  });

  if (transactionBodyResult.result !== 'complete') {
    throw new Error('Cannot complete transaction');
  } else {
    const transactionBody = transactionBodyResult.transactions[0];

    // sanitize transaction into the correct typedData format
    const typedData = OmgUtil.transaction.getTypedData(
      transactionBody,
      transfer.plasmaContractAddress
    );

    // define private keys to use for transaction signing
    const privateKeys = new Array(transactionBody.inputs.length).fill(sender.privateKey);

    // locally sign typedData with passed private keys, useful for multiple different signatures
    const signatures = childChain.signTransaction(typedData, privateKeys);

    // return encoded and signed transaction ready to be submitted
    const signedTx = childChain.buildSignedTransaction(
      typedData,
      signatures
    );

    // submit a signed transaction to the child chain
    const receipt = await childChain.submitTransaction(signedTx);

    return {
      transactionBody, receipt
    };
  }
}
```

### 5. Create 'Send next transaction' function

The next transaction will be based on change UTXOs from the previous transaction. That's why you need the information about the first transaction body and its receipt.

```js
async function sendNextTransaction(
  firstTxBody,
  firstReceipt,
  sender,
  receiver,
  amount,
  currency,
  feeCurrency,
  metadata
) {
  const nextFeeAmount = await getFeeAmount(feeCurrency);

  // get utxos for the next transaction
  const nextUtxo = getNextTransationUtxo(
    firstTxBody,
    firstReceipt,
    currency,
    sender,
    feeCurrency
  );

  // create transaction body for the next transaction
  const nextTransactionBody = createTransactionBody(
    sender.address,
    nextUtxo.nextPaymentUtxo,
    receiver.address,
    nextFeeAmount,
    nextUtxo.nextFeeUtxo,
    amount,
    metadata
  );

  // sanitize transaction into the correct typedData format
  const typedData = OmgUtil.transaction.getTypedData(
    nextTransactionBody,
    transfer.plasmaContractAddress
  );

  // collect signatures
  const signatures = getSignatures(
    typedData,
    sender,
    nextTransactionBody.inputs.length
  );

  // return encoded and signed transaction ready to be submitted
  const signedTx = childChain.buildSignedTransaction(
    typedData,
    signatures
  );

  // submit a signed transaction to the child chain
  const nextReceipt = await childChain.submitTransaction(signedTx);

  return {
    nextTransactionBody, nextReceipt
  };
}
```

### 6. Start a chained transaction

The current chained transaction includes two subsequent transactions of the `TUSDT` token. You can find the result on the blockchain explorer: [transaction 1](https://blockexplorer.rinkeby.v1.omg.network/transaction/0xc8145952b41a455259fadefe54187cb74eb571cc3e40e6fff4fafded50518ee8), [transaction 2](https://blockexplorer.rinkeby.v1.omg.network/transaction/0xdfa40f387a5583f3c943870784deb7e1375e23a31b103b739f16df65f9cd6805).

```js
async function chainedTransaction() {
  // convert amount into a BigNumber with 6 decimals => 3000000
  const firstTransferAmount = amountToBN(3, 6);
  const secondTransferAmount = amountToBN(7, 6);

  // send the first transaction
  const firstTransaction = await sendTransaction(
    childChain,
    sender,
    receiverA,
    firstTransferAmount,
    transfer.currency,
    transfer.feeCurrency,
    "1"
  );

  const firstReceipt = await firstTransaction.receipt;

  // send the second transaction
  const secondTransaction = await sendNextTransaction(
    firstTransaction.transactionBody,
    firstReceipt,
    sender,
    receiverB,
    secondTransferAmount,
    transfer.currency,
    transfer.feeCurrency,
    "2"
  );

  const secondReceipt = await secondTransaction.receipt;
  return secondReceipt;
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Lifecycle

1. A user converts the transfer amount into a BigNumber with corresponding decimal numbers.
2. A user builds, signs, and submits the first transaction.
3. A user retrieves the receipt and transaction body of the first transaction.
4. A user retrieves the fee amount for the next transaction body.
5. A user receives a token output index of the first transaction for both payment and fee outputs.
6. A user selects a corresponding payment and fee output to construct the next transaction.
7. A user constructs a custom transaction body for the next transaction.
8. A user sanitizes the transaction into the correct typedData format.
9. A user signs the sender's inputs with the corresponding private key.
10. A user collects signatures from the sender.
11. A user encodes and submits the transaction's data to the child chain and the Watcher for validation.
12. If the transaction is valid, the child chain server creates a transaction hash and adds the transaction to a pending block.
13. The child chain bundles the transactions in the block into a Merkle tree and submits its root hash to the `Plasma Framework` contract.
14. The Watcher receives a list of transactions from the child chain and recomputes the Merkle root to check for any inconsistency.
15. If a chained transaction involves more than 2 transfers, a user repeats steps 3-14 based on the result of the second transaction.