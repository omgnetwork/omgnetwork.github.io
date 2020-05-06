---
id: retrieve-balances
title: Retrieve Root Chain and Child Chain Balances
sidebar_label: Retrieve Balances
---

Retrieving balances involves converting an [RLP encoded](https://github.com/ethereum/wiki/wiki/RLP) array of balances into a human-readable array of balances.

## Implementation

1. Retrieve root chain balances.
2. Retrieve an encoded child chain array of balances.
3. Map child chain array to a human-readable array of balances.

### ETH Example

<!--DOCUSAURUS_CODE_TABS-->
<!-- JavaScript -->

```js
async function retrieveRootChainBalance () {
  return web3.eth.getBalance({
    <ALICE_ETH_ADDRESS>
  })
}

async function retrieveChildChainBalance () {
  const childchainBalanceArray = await childChain.getBalance(<ALICE_ETH_ADDRESS>);
  const aliceChildchainBalance = alicesBalanceArray.map((i) => {
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
<!-- JavaScript -->

```js
async function retrieveRootChainBalance () {
  await OmgUtil.getErc20Balance({
    web3,
    address: <ALICE_ETH_ADDRESS>,
    erc20Address: <ERC20_CONTRACT_ADDRESS>
  });
}

async function retrieveChildChainBalance () {
  const childchainBalanceArray = await childChain.getBalance(<ALICE_ETH_ADDRESS>);
  const aliceChildchainBalance = alicesBalanceArray.map((i) => {
    return {
      currency:
        i.currency === <ERC20_CONTRACT_ADDRESS> ? "ERC20" : i.currency,
      amount: web3.utils.fromWei(String(i.amount)),
    };
  });
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Lifecycle

1. A user calls the `getBalance` or `getErc20Balance` function to create a RLP encoded array of balances that contain [BigNum](https://github.com/indutny/bn.js) objects.
2. A user filters an array of balances and returns an array for desired currency (`ETH_CURRENCY` for ETH or `ERC20_CONTRACT_ADDRESS` for ERC20 tokens).
3. A user converts the amount of each balance from Wei into a decimal number.

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

7. Select [`Retrieve Balances`](https://github.com/omisego/omg-samples/tree/master/omg-js/app/01-balances) on the left side, observe the logs on the right.

> Code samples for all tutorials use the same repository — `omg-samples`, thus skip steps 1-4 if you've set up the project already.
