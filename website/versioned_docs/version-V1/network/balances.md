---
id: version-V1-balances
title: Retrieve Root Chain and Child Chain Balances
sidebar_label: Retrieve Balances
original_id: balances
---

Retrieving balances involves converting an [RLP encoded](https://github.com/ethereum/wiki/wiki/RLP) array of balances into a human-readable array of balances.

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

`omg-js` library has 3 main objects that are used during all of the code samples. Here's an example of how to instantiate them:

```js
import Web3 from "web3";
import { ChildChain, RootChain, OmgUtil } from "@omisego/omg-js";

// instantiate omg-js objects
const web3 = new Web3(new Web3.providers.HttpProvider(web3_provider_url));
const rootChain = new RootChain({ web3, plasmaContractAddress });
const childChain = new ChildChain({ watcherUrl });
```

> - `web3_provider_url` - the URL to a full Ethereum RPC node (local or from infrastructure provider, e.g. [Infura](https://infura.io/)).
> - `plasmaContractAddress` - `CONTRACT_ADDRESS_PLASMA_FRAMEWORK` for defined [environment](/environments).
> - `watcherUrl` - the Watcher Info URL for defined [environment](/environments) (personal or from OMG Network).

### 3. Retrieve ETH balances

There's no direct way to retrieve balances on both Ethereum and OMG networks. Instead, you first retrieve an [RLP encoded](https://github.com/ethereum/wiki/wiki/RLP) array of [BigNum](https://github.com/indutny/bn.js) balances, and then convert it to a preferred format.

The amount in balance array is defined in WEI (e.g. `429903000000000000`), the smallest denomination of ether, ETH. The `currency` contains `0x0000000000000000000000000000000000000000` for ETH currency or a smart contract address (e.g. `0xd74ef52053204c9887df4a0e921b1ae024f6fe31`) for ERC20 tokens.

#### 3.1 Retrieve child chain (OMG Network) balance

```js
async function retrieveChildChainBalance() {
  // retrieve an encoded child chain array of balances
  const childchainBalanceArray = await childChain.getBalance(
    "0x8CB0DE6206f459812525F2BA043b14155C2230C0"
  );
  // map child chain array to a human-readable array of balances
  const aliceChildchainBalance = childchainBalanceArray.map((i) => {
    return {
      currency:
        i.currency === OmgUtil.transaction.ETH_CURRENCY ? "ETH" : i.currency,
      amount: web3.utils.fromWei(String(i.amount)),
    };
  });
}
```

#### 3.2 Retrieve root chain (Ethereum) balance

```js
async function retrieveRootChainBalance() {
  // retrieve an encoded root chain array of balances
  const rootchainBalanceArray = await web3.eth.getBalance(
    "0x8CB0DE6206f459812525F2BA043b14155C2230C0"
  );
  // map root chain array to a human-readable array of balances
  const aliceRootchainBalance = childchainBalanceArray.map((i) => {
    return {
      currency:
        i.currency === "ETH",
      amount: web3.utils.fromWei(String(i.amount), "ether"),
    };
  });
```

### Retrieve ERC20 balances

#### 4.1 Retrieve child chain balance

```js
async function retrieveChildChainBalance() {
  // retrieve an encoded child chain array of balances
  const childchainBalanceArray = await childChain.getBalance(
    "0x8CB0DE6206f459812525F2BA043b14155C2230C0"
  );
  // map child chain array to a human-readable array of balances
  const aliceChildchainBalance = alicesBalanceArray.map((i) => {
    return {
      currency:
        i.currency === "0xd74ef52053204c9887df4a0e921b1ae024f6fe31"
          ? "ERC20"
          : i.currency,
      amount: web3.utils.fromWei(String(i.amount)),
    };
  });
}
```

#### 4.2 Retrieve root chain balance

```js
async function retrieveRootChainBalance() {
  // retrieve an encoded root chain array of balances
  const rootchainBalanceArray = await OmgUtil.getErc20Balance({
    web3,
    address: "0x8CB0DE6206f459812525F2BA043b14155C2230C0",
    erc20Address: "0xd74ef52053204c9887df4a0e921b1ae024f6fe31",
  });
  // map child chain array to a human-readable array of balances
  const aliceRootchainBalance = rootchainBalanceArray.map((i) => {
    return {
      currency:
        i.currency === "ERC20",
      amount: web3.utils.fromWei(String(i.amount)),
    };
  });
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Lifecycle

1. A user calls the `getBalance` or `getErc20Balance` function to create a RLP encoded array of balances that contain [BigNum](https://github.com/indutny/bn.js) objects.
2. A user filters an array of balances and returns an array for desired currency (`ETH_CURRENCY` for ETH or `ERC20_CONTRACT_ADDRESS` for ERC20 tokens).
3. A user converts the amount of each balance from WEI into a decimal number (optional).

## Demo Project

This section provides a demo project that contains a detailed implementation of the tutorial. If you consider integrating with the OMG Network, you can use this sample to significantly reduce the time of development. It also provides step-by-step instructions and sufficient code guidance that is not covered on this page.

### JavaScript

For running a full `omg-js` code sample for the tutorial, please use the following steps:

1. Clone [omg-js-samples](https://github.com/omgnetwork/omg-js-samples) repository:

```
git clone https://github.com/omgnetwork/omg-js-samples.git
```

2. Create `.env` file and provide the [required configuration values](https://github.com/omgnetwork/omg-js-samples/tree/master/omg-js#setup).

3. Run these commands:

```
npm install
npm run start
```

4. Open your browser at [http://localhost:3000](http://localhost:3000). 

5. Select [`Retrieve Balances`](https://github.com/omgnetwork/omg-js-samples/tree/master/app/01-balances) on the left side, observe the logs on the right.

> Code samples for all tutorials use the same repository — `omg-js-samples`, thus you have to set up the project and install dependencies only one time.
