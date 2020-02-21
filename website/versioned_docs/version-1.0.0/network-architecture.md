---
id: version-1.0.0-network-architecture
title: Network Architecture
sidebar_label: Network Architecture
original_id: network-architecture
---

The OMG Network consists of three components interacting together: 

* The OMG Smart Contracts
* The Child Chain
* The Watcher

## PlasmaFramework Smart Contract

Deployed to the Ethereum network, the `PlasmaFramework` contract can be seen as a top-level contract containing other smart contract level functionalities, namely deposits, exits and the receipt of blocks from the child chain.

## Child Chain

Run by OMG Network, the child chain application maintains the network state. It receives users' transactions and bundles them into blocks that are submitted to the `PlasmaFramework` contract.

## Watcher

The Watcher application continuously monitors the child chain – validating its behaviour and reporting any inconsistency or malicious behaviour to subscribed users. Watchers can be run by anyone. The greater the number of running Watchers, the safer the network.
