---
id: network-architecture
title: Network Architecture
sidebar_label: Network Architecture
---

The OMG Network consists of three components interacting together: 

* The OMG Smart Contracts
* The Child Chain
* The Watcher

## OMG Smart Contracts

Deployed to the Ethereum network, the OMG Smart Contracts provide the decentralised interface through which users can deposit funds into the network and withdraw them at any point. 

## Child Chain

Run by OMG Network, the child chain application maintains the network state. It receives users' transactions and bundles them into blocks that are submitted to the OMG Smart Contracts.

## Watcher

The Watcher application continuously monitors the child chain – validating its behaviour and reporting any inconsistency or malicious behaviour to subscribed users. Watchers can be run by anyone. The greater the number of running Watchers, the safer the network.
