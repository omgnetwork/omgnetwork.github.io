---
id: version-V1-retrieve-balances
title: Retrieve Root Chain and Child Chain Balances
sidebar_label: Retrieve Balances
original_id: retrieve-balances
---

Retrieving balances involves converting an [RLP encoded](https://github.com/ethereum/wiki/wiki/RLP) array of balances into a human-readable array of balances.

## Implementation

1. Retrieve root chain balances.
2. Retrieve an encoded child chain array of balances.
3. Map child chain array to a human-readable array of balances (optional).

### ETH Example

<!--DOCUSAURUS_CODE_TABS-->
<!-- JavaScript (ESNext) -->

```js
async function retrieveRootChainBalance() {
  return web3.eth.getBalance("0x8CB0DE6206f459812525F2BA043b14155C2230C0");
}

async function retrieveChildChainBalance() {
  const childchainBalanceArray = await childChain.getBalance(
    "0x8CB0DE6206f459812525F2BA043b14155C2230C0"
  );
  const aliceChildchainBalance = childchainBalanceArray.map((i) => {
    return {
      currency:
        i.currency === OmgUtil.transaction.ETH_CURRENCY ? "ETH" : i.currency,
      amount: web3.utils.fromWei(String(i.amount)),
    };
  });
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

### ERC20 Example

<!--DOCUSAURUS_CODE_TABS-->
<!-- JavaScript (ESNext) -->

```js
async function retrieveRootChainBalance() {
  await OmgUtil.getErc20Balance({
    web3,
    address: "0x8CB0DE6206f459812525F2BA043b14155C2230C0",
    erc20Address: "0xd74ef52053204c9887df4a0e921b1ae024f6fe31",
  });
}

async function retrieveChildChainBalance() {
  const childchainBalanceArray = await childChain.getBalance(
    "0x8CB0DE6206f459812525F2BA043b14155C2230C0"
  );
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

<!--END_DOCUSAURUS_CODE_TABS-->

## Lifecycle

1. A user calls the `getBalance` or `getErc20Balance` function to create a RLP encoded array of balances that contain [BigNum](https://github.com/indutny/bn.js) objects.
2. A user filters an array of balances and returns an array for desired currency (`ETH_CURRENCY` for ETH or `ERC20_CONTRACT_ADDRESS` for ERC20 tokens).
3. A user converts the amount of each balance from WEI into a decimal number (optional).

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

5. Select [`Retrieve Balances`](https://github.com/omgnetwork/omg-samples/tree/master/omg-js/app/01-balances) on the left side, observe the logs on the right.

> Code samples for all tutorials use the same repository — `omg-samples`, thus you have to set up the project and install dependencies only one time.
