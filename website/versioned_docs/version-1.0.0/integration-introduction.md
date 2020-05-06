---
id: version-1.0.0-integration-introduction
title: Introduction
sidebar_label: Introduction
original_id: integration-introduction
---

The tutorials section aims to give a deeper technical explanation and code implementation around specific features of the OMG Network's products and services. It serves as a guide for integrators using the OMG Network.

## Code Samples

The majority of tutorials have sufficient code as a part of a larger [OMG Samples](https://github.com/omisego/omg-samples) project. This project contains code samples in multiple programming languages. You may find a full implementation of a chosen tutorial for your preferred language in the respective folder (e.g. `omg-js` for Javascript).
 
> Currently, all code samples are implemented in Javascript as a part of [omg-js](https://github.com/omisego/omg-js) library.

The tutorials section explains how things work under the hood and show a general integration approach for each of the network's features or services. If you want to learn the core network implementation, please check the following references:
- [Plasma Framework Contracts](https://github.com/omisego/plasma-contracts)  
- [Child Chain and Watcher](https://github.com/omisego/elixir-omg) 

### Omg-js Code Samples

`omg-js` library has 3 main objects that are used during all of the code samples. Here's an example of how to instantiate them:

```js
import Web3 from "web3"
import { ChildChain, RootChain, OmgUtil } from "@omisego/omg-js"

const web3 = new Web3(new Web3.providers.HttpProvider(web3_provider_url))
const rootChain = new RootChain({ web3, plasmaContractAddress })
const childChain = new ChildChain({ watcherUrl })
```

> Some details might be omitted from the `omg-js` code examples for the sake of brevity (type information, optional arguments, etc.) For more information regarding the library, please check the [API documentation](https://docs.omg.network/omg-js).

## Reference Values

You will find references to the values of different objects across the documentation. This allows to abstract names, types, and descriptions for a given object used in code snippets. Here's a complete list of referenced values used:

| Value Name                         | Type                        | Description                                                               |
|:---------------------------------- |:--------------------------- | ------------------------------------------------------------------------- |
| `ALICE_ETH_ADDRESS`                | string                      | Address (public key) of Alice's ETH account                               |
| `ALICE_ETH_ADDRESS_PRIVATE_KEY`    | string                      | Private key of Alice's ETH account                                        |
| `ALICE_ETH_DEPOSIT_AMOUNT`         | string                      | ETH amount Alice will deposit into the child chain                        |
| `ALICE_ERC20_DEPOSIT_AMOUNT`       | string                      | ERC20 amount Alice will deposit into the child chain                      |
| `ALICE_ETH_TRANSFER_AMOUNT`        | string                      | ETH amount Alice will transfer to Bob                                     |
| `ALICE_ERC20_TRANSFER_AMOUNT`      | string                      | ERC20 amount Alice will transfer to Bob                                   |
| `BOB_ETH_ADDRESS`                  | string                      | Address (public key) of Bob's ETH account                                 |
| `BOB_ETH_ADDRESS_PRIVATE_KEY`      | string                      | Private key of Bob's ETH account                                          |
| `PLASMAFRAMEWORK_CONTRACT_ADDRESS` | string                      | Address of the `PlasmaFramework` contract                                 |
| `ERC20_CONTRACT_ADDRESS`           | string                      | Address of the ERC20 contract that Alice will deposit and transfer to Bob |
| `CURRENCY`                         | number, string or BigNumber | Token's type (ETH or ERC20) used for making transactions, deposits, etc.  |
| `MAX_EXITS_TO_PROCESS`             | number                      | The maximum number of exits to process during the exit processing.        |
| `AMOUNT_TO_SPLIT`                  | number, string or BigNumber | ETH or ERC20 amount that defines new UTXOs during the split procedure     |

> The names of the values used in the [`.env`](https://github.com/omisego/omg-samples/tree/master/omg-js#setup) file match with the values above.
>
> CURRENCY can take `OmgUtil.transaction.ETH_CURRENCY` for ETH or `ERC20_CONTRACT_ADDRESS` for ERC20 tokens.
