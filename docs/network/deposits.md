---
id: deposits
title: Deposit Funds
sidebar_label: Deposit Funds
---

A deposit involves sending ETH or ERC-20 tokens to the `Vault` smart contract on the root chain for subsequent use on the OMG network.

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

Depositing funds to the OMG Network involves using 2 `omg-js` objects. Here's an example of how to instantiate them:

```js
import Web3 from "web3";
import { RootChain, OmgUtil } from "@omisego/omg-js";

const web3 = new Web3(new Web3.providers.HttpProvider(web3_provider_url));
const rootChain = new RootChain({ web3, plasmaContractAddress });
```

> - `web3_provider_url` - the URL to a full Ethereum RPC node (local or from infrastructure provider, e.g. [Infura](https://infura.io/)).
> - `plasmaContractAddress` - `CONTRACT_ADDRESS_PLASMA_FRAMEWORK` for defined [environment](/environments).

### 3. Make an ETH deposit

Performing any operation on the OMG Network requires funds. Funds deposit happens when a user sends ETH or ERC20 tokens to the `Vault` smart contract on Ethereum Network. A vault holds custody of tokens transferred to the Plasma Framework. Deposits increase the pool of funds held by the contract and also signals to the child chain server that the funds should be accessible on the child chain.

```js
async function makeDeposit () {
  // deposit ETH funds
  return rootChain.deposit({
    amount: "50000000000000000",
    currency: OmgUtil.transaction.ETH_CURRENCY,
    txOptions: {
      from: "0x8CB0DE6206f459812525F2BA043b14155C2230C0",
      privateKey: "0xCD55F2A7C476306B27315C7986BC50BD81DB4130D4B5CFD49E3EAF9ED1EDE4F7"
    }
  })
}
```

> Deposit amount is defined in WEI, the smallest denomination of ether (ETH), the currency used on the Ethereum network. You can use [ETH converter](https://eth-converter.com) or alternative tool to know how much WEI you have to put as the `amount` value.

A deposit generates a transaction receipt verifiable on Ethereum Network. A typical receipt has the following structure:

```
{
    "blockHash": "0x41455ed19db8e5a495233e54c1813962edaf8a5fb87f847a704c72efa90e2c71",
    "blockNumber": 7779244,
    "contractAddress": null,
    "cumulativeGasUsed": 391297,
    "from": "0x0dc8e240d90f3b0d511b6447543b28ea2471401a",
    "gasUsed": 130821,
    "logs": [
        {
            "address": "0x895Cc6F20D386f5C0deae08B08cCFeC9f821E7D9",
            "topics": [
                "0x18569122d84f30025bb8dffb33563f1bdbfb9637f21552b11b8305686e9cb307",
                "0x0000000000000000000000000dc8e240d90f3b0d511b6447543b28ea2471401a",
                "0x0000000000000000000000000000000000000000000000000000000000023e42",
                "0x0000000000000000000000000000000000000000000000000000000000000000"
            ],
            "data": "0x000000000000000000000000000000000000000000000000006a94d74f430000",
            "blockNumber": 7779244,
            "transactionHash": "0x0e7d060a63cb65f629cc6d053e71397c7fa3250b41e36cb2cae40b2acb4350a2",
            "transactionIndex": 12,
            "blockHash": "0x41455ed19db8e5a495233e54c1813962edaf8a5fb87f847a704c72efa90e2c71",
            "logIndex": 1,
            "removed": false,
            "id": "log_8b0a6416"
        }
    ],
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000001000000000024000000000000000000800000000000000000000010080000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000004000000010000000000000000000020000000000000000000000000000000000000080000022000000000000000000000",
    "status": true,
    "to": "0x895cc6f20d386f5c0deae08b08ccfec9f821e7d9",
    "transactionHash": "0x0e7d060a63cb65f629cc6d053e71397c7fa3250b41e36cb2cae40b2acb4350a2",
    "transactionIndex": 12
}
```

After the funds are confirmed on the rootchain, child chain server generates a transaction in a form of UTXO corresponding to the deposited amount. UTXO (unspent transaction output) is a model used to keep a track of balances on the OMG Network.

If a transaction is successful, you will see a unique `transactionHash` that can be verified on Ethereum block explorer, such as [Etherescan](https://ropsten.etherscan.io/tx/0xbcb340775157d5f0d21ae8bd5b13d51b7dd62bf79737f8ceea1f46bf33ae4fbe). Copy the hash and paste it in the search box for transaction's details.

Depositing also involves forming a pseudo-block on the child chain. Such a block contains a single transaction with the deposited funds as a new UTXO. You can check a new block on [the OMG Block Explorer](https://blockexplorer.ropsten.v1.omg.network).

### 4. Make an ERC20 deposit

Depositing ERC20 tokens requires an approval of the corresponding `Vault` contract. You can deposit tokens only after this process is finished. 

```js
async function makeDeposit () {
  // approve ERC20 token
  await rootChain.approveToken({
    erc20Address: "0xd74ef52053204c9887df4a0e921b1ae024f6fe31",
    amount: "13000000000000000000",
    txOptions: {
      from: "0x8CB0DE6206f459812525F2BA043b14155C2230C0",
      privateKey: "0xCD55F2A7C476306B27315C7986BC50BD81DB4130D4B5CFD49E3EAF9ED1EDE4F7"
    }
  })
  
  // deposit ERC20 funds
  return rootChain.deposit({
    amount: "13000000000000000000",
    currency: "0xd74ef52053204c9887df4a0e921b1ae024f6fe31",
    txOptions: {
      from: "0x8CB0DE6206f459812525F2BA043b14155C2230C0",
      privateKey: "0xCD55F2A7C476306B27315C7986BC50BD81DB4130D4B5CFD49E3EAF9ED1EDE4F7"
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
5. After a defined [finality period](/glossary#deposit-finality-period) the UTXO is ready for transacting on the network.

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

5. Select [`Make an ETH Deposit`](https://github.com/omgnetwork/omg-js-samples/tree/master/app/02-deposit-eth) or [`Make an ERC20 Deposit`](https://github.com/omgnetwork/omg-js-samples/tree/master/app/02-deposit-erc20) on the left side, observe the logs on the right.

> Code samples for all tutorials use the same repository — `omg-js-samples`, thus you have to set up the project and install dependencies only one time.
