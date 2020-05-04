---
id: integration-introduction
title: Introduction
sidebar_label: Introduction
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

You will find references to values of different objects across the documentation. This allows to abstract names, types and descriptions for a given object used in a short code snippet. Here's a complete list of referenced values used:

| Value Name                         | Type   | Description             |
|:---------------------------------- | ------ | ----------------------- |
| `ALICE_ETH_ADDRESS`                |        |                         |
| `ALICE_ETH_ADDRESS_PRIVATE_KEY`    |        |                         |
| `ALICE_ETH_DEPOSIT_AMOUNT`         |        |                         |
| `ALICE_ERC20_DEPOSIT_AMOUNT`       |        |                         |
| `ALICE_ETH_TRANSFER_AMOUNT`        |        |                         |
| `ALICE_ERC20_TRANSFER_AMOUNT`      |        |                         |
| `BOB_ETH_ADDRESS`                  |        |                         |
| `BOB_ETH_ADDRESS_PRIVATE_KEY`      |        |                         |
| `ETH_NODE`                         |        |                         |
| `WATCHER_URL`                      |        |                         |
| `WATCHER_PROXY_URL`                |        |                         |
| `PLASMAFRAMEWORK_CONTRACT_ADDRESS` |        |                         |
| `ERC20_CONTRACT_ADDRESS`           |        |                         |
| `MILLIS_TO_WAIT_FOR_NEXT_BLOCK`    |        |                         |
| `BLOCKS_TO_WAIT_FOR_TXN`           |        |                         |
| `CURRENCY`                         |        |                         |

> The names of the values used in the `.env` file match with the values above.
