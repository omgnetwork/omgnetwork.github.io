---
id: version-1.0.0-deposits
title: Deposit Funds
sidebar_label: Deposit Funds
original_id: deposits
---

A deposit involves sending ETH or ERC-20 tokens to the `Vault` smart contract on the root chain for subsequent use on the OMG network.

## Implementation

1. For ERC20 tokens only: approve a token. 
2. Make a deposit.

### ETH Example

<!--DOCUSAURUS_CODE_TABS-->
<!-- JavaScript -->

```js
async function makeDeposit () {
  return rootChain.deposit({
    <ALICE_ETH_DEPOSIT_AMOUNT>,
    <CURRENCY>,
    txOptions: {
      from: <ALICE_ETH_ADDRESS>,
      privateKey: <ALICE_ETH_ADDRESS_PRIVATE_KEY>
    }
  })
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

### ERC20 Example

<!--DOCUSAURUS_CODE_TABS-->
<!-- JavaScript -->

```js
async function makeDeposit () {
  await rootChain.approveToken({
    <ERC20_CONTRACT_ADDRESS>,
    <ALICE_ERC20_DEPOSIT_AMOUNT>,
    txOptions: {
      from: <ALICE_ETH_ADDRESS>,
      privateKey: <ALICE_ETH_ADDRESS_PRIVATE_KEY>
    }
  })
  
  return rootChain.deposit({
    <ALICE_ERC20_DEPOSIT_AMOUNT>,
    <CURRENCY>,
    txOptions: {
      from: <ALICE_ETH_ADDRESS>,
      privateKey: <ALICE_ETH_ADDRESS_PRIVATE_KEY>
    }
  })
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

## Lifecycle

1. A user calls the `deposit` function that creates an [RLP-encoded](https://github.com/ethereum/wiki/wiki/RLP) transaction that will be used to deposit into the ETH or ERC-20 `Vault` smart contracts (`ETHVault` for ETH and `ERC20Vault` for ERC20 tokens).
2. The `Vault` in question creates a deposit block and submits it to the `PlasmaFramework` contract.
3. The `Vault` in question emits a `DepositCreated` event.
4. The child chain receives the `DepositCreated` and creates the corresponding UTXO.
5. After a defined [finality period](glossary#deposit-finality-period) the UTXO is ready for transacting on the network.

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

7. Select [`Make an ETH Deposit`](https://github.com/omisego/omg-samples/tree/master/omg-js/app/02-deposit-eth) or [`Make an ERC20 Deposit`](https://github.com/omisego/omg-samples/tree/master/omg-js/app/02-deposit-erc20) on the left side, observe the logs on the right.

> Code samples for all tutorials use the same repository — `omg-samples`, thus skip steps 1-4 if you've set up the project already.
