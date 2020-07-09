---
id: utxos
title: Merge or Split UTXO
sidebar_label: Merge or Split UTXO
---

[UTXOs](/glossary#utxo) are core to the logic of the OMG Network.

## Merging UTXOs

Merging UTXOs is desirable in the following scenarios:

**1. Exiting your funds as a single UTXO**

Standard Exits are initiated on a single UTXO and not a specified amount. However, a user may want to exit an amount greater than the value of any UTXO one owns. For example: 

- Alice owns 4 UTXOs worth 1 ETH each. 
- Alice would like to withdraw all her funds from the network. 
- To exit her funds, Alice would need to initiate a `Standard Exit` (with an `exit bond`) on each UTXO.

In the above scenario, it would be more economical for Alice to merge these UTXOs and exit a single one.

**2. Fitting Inputs into a Transaction**

A transaction can have a maximum of <u>4 inputs</u> but a user may not own four UTXOs that can cover the amount needed for a given transaction. For example: 

- Alice owns 5 UTXOs worth 1 ETH each. 
- Alice would like to send 5 ETH to Bob. 
- Alice cannot send 5 ETH to Bob in a single transaction as a transaction can take four inputs only. 

In the above scenario, Alice can merge her UTXOs to send the desired amount to Bob in a single transaction.

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

Merging UTXOs involves using 2 `omg-js` objects. Here's an example of how to instantiate them:

```js
import Web3 from "web3";
import { ChildChain, OmgUtil } from "@omisego/omg-js";

const web3 = new Web3(new Web3.providers.HttpProvider(web3_provider_url));
const childChain = new ChildChain({ watcherUrl });
```

> - `web3_provider_url` - the URL to a full Ethereum RPC node (local or from infrastructure provider, e.g. [Infura](https://infura.io/)).
> - `watcherUrl` - the Watcher Info URL for defined [environment](/environments) (personal or from OMG Network).

### 3. Merge UTXOs

Note, the minimum number of UTXOs to merge is 2, the maximum — 4. You also can't mix ETH and ERC20 UTXOs while performing merging.

> The merging UTXOs process is the same for both ETH and ERC20. This method demonstrates merging for ETH UTXOs. If you want to merge ERC20 tokens, change the `currency` value to a corresponding smart contract address.

```js
async function mergeUtxo() {
  // retrieve all utxos
  const aliceUtxosAll = await childChain.getUtxos("0x8CB0DE6206f459812525F2BA043b14155C2230C0");
  
  // filter utxos based on the token
  const aliceEthUtxos = aliceUtxosAll.filter(
    (u) => u.currency === OmgUtil.transaction.ETH_CURRENCY
  );

  // slice the array to only 4 utxos
  const utxosToMerge = aliceEthUtxos.slice(0, 4);

  // merge utxos
  const utxo = await childChain.mergeUtxos({
    utxos: utxosToMerge,
    privateKey: "0xCD55F2A7C476306B27315C7986BC50BD81DB4130D4B5CFD49E3EAF9ED1EDE4F7",
    verifyingContract: "0x96d5d8bc539694e5fa1ec0dab0e6327ca9e680f9",
  });

  return utxo;
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

<u>No fee is charged</u> for merge transactions on the OMG Network since these are transactions that benefit the network.

### Lifecycle

1. A user calls the `getUtxos` function to retrieve the list of all available UTXOs.
2. A user filters an array of UTXOs and returns an UTXOs for desired currency (`ETH_CURRENCY` for ETH or `ERC20_CONTRACT_ADDRESS` for ERC20 tokens). This step is important because you can't merge ETH and ERC20 tokens together.
3. A user calls the `mergeUtxos` function and returns an array of merged UTXOs.

## Splitting UTXOs

A user may also want to *split* UTXOs if one would like to exit an amount smaller than the value of any UTXO one owns. For example: 
- Alice owns 1 UTXO worth 5 ETH. 
- Alice wants to withdraw 2 ETH back onto the root chain and keep 3 ETH on the child chain.
- Alice cannot exit 2 ETH unless she splits her UTXO.

In the above scenario, Alice can split her UTXO to withdraw 2 ETH. 

### Implementation

For splitting UTXO, a user needs to follow the same steps as [making a transaction](/network/transfers) but using the following transaction format:
- The sender is specified as the recipient. 
- The input consists of a single UTXO.
- The amount set in each payment object corresponds to the desired output value. In other words, the amount the user wants to split from the input UTXO.

As a transaction can produce a maximum of <u>four</u> outputs, you can generally have up to <u>three</u> payment objects. Each one will produce an output, the value of the fourth output will correspond to the value remaining after the split(s). It is possible to have four payment objects only if their amounts add up to the exact value of the input UTXO.

> The splitting of UTXO process is the same for both ETH and ERC20. This method demonstrates splitting for ERC20 UTXO. If you want to split ETH UTXO, change the `currency` value to `OmgUtil.transaction.ETH_CURRENCY`.

<!--DOCUSAURUS_CODE_TABS-->
<!-- JavaScript (ESNext) -->
```js
async function splitUtxo() {
  // define payments objects that will represent new utxos
  const payments = [
    {
      owner: "0x8CB0DE6206f459812525F2BA043b14155C2230C0",
      currency: "0xd74ef52053204c9887df4a0e921b1ae024f6fe31",
      amount: "120000000000000",
    },
    {
      owner: "0x8CB0DE6206f459812525F2BA043b14155C2230C0",
      currency: "0xd74ef52053204c9887df4a0e921b1ae024f6fe31",
      amount: "250000000000000",
    },
    {
      owner: "0x8CB0DE6206f459812525F2BA043b14155C2230C0",
      currency: "0xd74ef52053204c9887df4a0e921b1ae024f6fe31",
      amount: "250000000000000",
    },
  ];

  // create a transaction body
  const transactionBody = await childChain.createTransaction({
    owner: "0x8CB0DE6206f459812525F2BA043b14155C2230C0",
    payments,
    fee: {
      currency: "0xd74ef52053204c9887df4a0e921b1ae024f6fe31",
    },
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

### Lifecycle

1. A user defines multiple `payments` objects that will generate new UTXOs. The sender is specified as the recipient.
2. A user calls the `createTransaction` function to create a transaction that will split a single UTXO.
3. A user signs, encodes, and submits the transaction's data to the child chain and the Watcher for validation.
4. If the transaction is valid, the child chain server creates a transaction hash and adds the transaction to a pending block.
5. The child chain bundles the transactions in the block into a Merkle tree and submits its root hash to the `Plasma Framework` contract.
6. The Watcher receives a list of transactions from the child chain and recomputes the Merkle root to check for any inconsistency.

## Network Considerations

Users are highly encouraged to merge UTXOs continuously as a way of mitigating the vulnerability of OMG Network funds in a mass exit event. Read more in the [FAQ Section](/faq#why-does-a-smaller-utxo-set-on-the-omg-network-reinforce-the-safety-of-user-funds-in-a-mass-exit-event).

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

6. Open your browser at [http://localhost:3000](http://localhost:3000). 

7. Select [`Show UTXOs`](https://github.com/omgnetwork/omg-js-samples/tree/master/app/04-utxo-show), [`Merge UTXOs`](https://github.com/omgnetwork/omg-js-samples/tree/master/app/04-utxo-merge) or [`Split UTXOs`](https://github.com/omgnetwork/omg-js-samples/tree/master/app/04-utxo-split) on the left side, observe the logs on the right.

> Code samples for all tutorials use the same repository — `omg-js-samples`, thus you have to set up the project and install dependencies only one time.
