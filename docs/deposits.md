---
id: deposits
title: Deposit Funds
sidebar_label: Deposit Funds
---

A deposit involves sending ETH or ERC-20 tokens to the `Vault` smart contract on the root chain for subsequent use on the OMG network.

## Implementation

1. Approve a token (for ERC20 tokens only). 
2. Make a deposit.

> Deposit amount is defined in WEI, the smallest denomination of ether (ETH), the currency used on the Ethereum network. You can use [ETH converter](https://eth-converter.com) or alternative tool to know how much WEI you have to put as the `amount` value.

### ETH Example

<!--DOCUSAURUS_CODE_TABS-->
<!-- JavaScript (ESNext) -->

```js
async function makeDeposit () {
  // deposit ETH funds
  return rootChain.deposit({
    amount: "50000000000000000",
    currency: OmgUtil.transaction.ETH_CURRENCY,
    txOptions: {
      from: "0x0dC8e240d90F3B0d511b6447543b28Ea2471401a",
      privateKey: "0xCD5994C7E2BF03202C59B529B76E5582266CEB384F02D32B470AC57112D0C6E7"
    }
  })
}
```

<!--END_DOCUSAURUS_CODE_TABS-->

### ERC20 Example

<!--DOCUSAURUS_CODE_TABS-->
<!-- JavaScript (ESNext) -->

```js
async function makeDeposit () {
  // approve ERC20 token
  await rootChain.approveToken({
    erc20Address: "0xd74ef52053204c9887df4a0e921b1ae024f6fe31",
    amount: "13000000000000000000",
    txOptions: {
      from: "0x0dC8e240d90F3B0d511b6447543b28Ea2471401a",
      privateKey: "0xCD5994C7E2BF03202C59B529B76E5582266CEB384F02D32B470AC57112D0C6E7"
    }
  })
  
  // deposit ERC20 funds
  return rootChain.deposit({
    amount: "13000000000000000000",
    currency: "0xd74ef52053204c9887df4a0e921b1ae024f6fe31",
    txOptions: {
      from: "0x0dC8e240d90F3B0d511b6447543b28Ea2471401a",
      privateKey: "0xCD5994C7E2BF03202C59B529B76E5582266CEB384F02D32B470AC57112D0C6E7"
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

5. Select [`Make an ETH Deposit`](https://github.com/omgnetwork/omg-samples/tree/master/omg-js/app/02-deposit-eth) or [`Make an ERC20 Deposit`](https://github.com/omgnetwork/omg-samples/tree/master/omg-js/app/02-deposit-erc20) on the left side, observe the logs on the right.

> Code samples for all tutorials use the same repository — `omg-samples`, thus you have to set up the project and install dependencies only one time.
