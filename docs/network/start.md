---
id: start
title: Getting Started
sidebar_label: Getting Started
---

This section aims to give a deeper technical explanation and code implementation around specific features of the OMG Network's products and services. It serves as a guide for integrators using the OMG Network.

## Code Samples

The majority of tutorials have sufficient code as a part of a larger [OMG Samples](https://github.com/omgnetwork/omg-samples) project. This project contains code samples in multiple programming languages. You may find a full implementation of a chosen tutorial for your preferred language in the respective folder (e.g. `omg-js` for Javascript).
 
> Currently, all code samples are implemented in Javascript as a part of [omg-js](https://github.com/omgnetwork/omg-js) library.

The tutorials section explains how things work under the hood and show a general integration approach for each of the network's features or services. If you want to learn the core network implementation, please check the following references:
- [Plasma Framework Contracts](https://github.com/omgnetwork/plasma-contracts)  
- [Child Chain and Watcher](https://github.com/omgnetwork/elixir-omg) 

### Alice and Bob

In most of the code samples, Alice refers to the account of a sender (Wallet A), Bob refers to the account that receives funds (Wallet B). Notice, all of the samples use Alice as the primary wallet. 

All of the tutorials use predefined public and private keys for Alice and Bob. They contain only Ropsten test tokens, thus don't spend all of them, share responsibly with others. If the wallets are empty, feel free to send [Ropsten faucets](https://faucet.metamask.io) there. 

It is always recommended to use personal public and private keys to avoid unexpected movements of the funds on the testnet environment. You should never share your private keys to anyone if they contain funds on the Ethereum mainnet.

### API documentation

Some details might be omitted from the `omg-js` code examples (type information, optional arguments, etc.) For more information regarding the library, please check the [API documentation](https://docs.omg.network/omg-js).
