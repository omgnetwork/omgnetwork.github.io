---
id: transfers
title: Make a Transfer
sidebar_label: Make a Transfer
---

A transfer involves one wallet sending tokens to another wallet on the OMG Network.

## Implementation

### 1. Install [`omg-js`](https://github.com/omgnetwork/omg-js)

To access network features from your application, use our official libraries:

<!--DOCUSAURUS_CODE_TABS-->

<!-- Node -->

Requires Node >= 8.11.3 < 13.0.0

```js
npm install @omisego/omg-js
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

### 2. Import dependencies

Transferring funds to the OMG Network involves using 2 `omg-js` objects. Here's an example of how to instantiate them:

```js
import Web3 from "web3";
import { ChildChain, OmgUtil } from "@omisego/omg-js";

const web3 = new Web3(new Web3.providers.HttpProvider(web3_provider_url));
const childChain = new ChildChain({ watcherUrl });
```

> - `web3_provider_url` - the URL to a full Ethereum RPC node (local or from infrastructure provider, e.g. [Infura](https://infura.io/)).
> - `watcherUrl` - the Watcher Info URL for defined [environment](/environments) (personal or from OMG Network).

There are several ways to send a transaction on the OMG Network. It's recommended to use the first method but you may want to choose another approach for your specific use case.

### 3. Send a payment transaction

Transactions are composed of inputs and outputs. An input is simply a pointer to the output of another transaction. An output is a transaction that hasn't been spent yet (also known as UTXO). Each transaction should be signed by the owner of funds (UTXOs), have a specific format, and encoded with [RLP encoding](https://github.com/ethereum/wiki/wiki/RLP) according to the following rules:

```
[txType, inputs, outputs, txData, metaData]

txType ::= uint256
inputs ::= [input]
input ::= bytes32
outputs ::= [output]
output ::= [outputType, outputData]
outputType ::= uint256
outputData ::= [outputGuard, token, amount]
outputGuard ::= bytes20
token ::= bytes20
amount ::= uint256
txData ::= uint256 (must be 0)
metadata ::= bytes32
```

Transactions are signed using the [EIP-712](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md) method. The EIP-712 typed data structure is defined as follows:

```
{
  types: {
    EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'verifyingContract', type: 'address' },
        { name: 'salt', type: 'bytes32' }
    ],
    Transaction: [
        { name: 'txType', type: 'uint256' },
        { name: 'input0', type: 'Input' },
        { name: 'input1', type: 'Input' },
        { name: 'input2', type: 'Input' },
        { name: 'input3', type: 'Input' },
        { name: 'output0', type: 'Output' },
        { name: 'output1', type: 'Output' },
        { name: 'output2', type: 'Output' },
        { name: 'output3', type: 'Output' },
        { name: 'txData', type: 'uint256' },
        { name: 'metadata', type: 'bytes32' }
    ],
    Input: [
        { name: 'blknum', type: 'uint256' },
        { name: 'txindex', type: 'uint256' },
        { name: 'oindex', type: 'uint256' }
    ],
    Output: [
        { name: 'outputType', type: 'uint256' },
        { name: 'outputGuard', type: 'bytes20' },
        { name: 'currency', type: 'address' },
        { name: 'amount', type: 'uint256' }
    ]
  },
  domain: {
        name: 'OMG Network',
        version: '1',
        verifyingContract: '',
        salt: '0xfad5c7f626d80f9256ef01929f3beb96e058b8b4b0e3fe52d84f054c0e2a7a83'
    },
  primaryType: 'Transaction'
}
```

The child chain server collects fees for sending a transaction. The fee can be paid in a variety of supported tokens by the network, the fee amount is automatically calculated by the child chain. To get more details on how the fees are defined, please refer to [Fees](/network/fees). Note, testnet and mainnet might support different currencies for fees.

#### 3.1 Method A

The most "granular" implementation of transfer includes creating, typing, signing and submitting the transaction. Such an approach will have the following structure of the code:

> This method demonstrates a transfer made in ETH. If you want to make an ERC20 transfer, change the `currency` value to a corresponding smart contract address. 

```js
async function transfer() {
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
      currency: OmgUtil.transaction.ETH_CURRENCY
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

#### 3.2 Method B

Another option relies on the child chain completely to create and send the transaction. Note that this method will choose the UTXO for you by using the largest UTXO of that specific currency. Also, you won't able to do 2 transactions in the same block using this method. 

> This method demonstrates a transfer made in ERC20. If you want to make an ETH transfer, change the `currency` value to `OmgUtil.transaction.ETH_CURRENCY`.

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

1. Clone [omg-js-samples](https://github.com/omgnetwork/omg-js-samples) repository:

```
git clone https://github.com/omgnetwork/omg-js-samples.git
```

2. Create `.env` file and provide the [required configuration values](https://github.com/omgnetwork/omg-js-samples/tree/master#setup).

3. Run these commands:

```
npm install
npm run start
```

4. Open your browser at [http://localhost:3000](http://localhost:3000). 

5. Select [`Make an ETH Transaction`](https://github.com/omgnetwork/omg-js-samples/tree/master/app/03-transaction-eth) or [`Make an ERC20 Transaction`](https://github.com/omgnetwork/omg-js-samples/tree/master/app/03-transaction-erc20) on the left side, observe the logs on the right.

> Code samples for all tutorials use the same repository — `omg-js-samples`, thus you have to set up the project and install dependencies only one time.
