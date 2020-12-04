---
id: network-architecture
title: Network Architecture
sidebar_label: Network Architecture
---

The OMG Network consists of three components interacting together: 
 
* The OMG Smart Contracts
* The Child Chain
* The Watcher
 
## PlasmaFramework Smart Contract
 
Deployed to the Ethereum network, the `PlasmaFramework` contract can be seen as a top-level contract containing other smart contract level functionalities, namely deposits, exits, and the receipt of blocks from the child chain.
 
## Child Chain
 
Run by the OMG Network, the child chain application maintains the network state. It receives users' transactions and bundles them into blocks that are submitted to the `PlasmaFramework` contract.
 
## Watcher
 
Watcher application continuously monitors the child chain – validating its behavior and reporting any inconsistency or malicious behavior to subscribed users. Watchers can be run by anyone. The bigger the number of running Watchers, the safer the network.