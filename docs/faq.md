---
id: faq
title: FAQ
sidebar_label: FAQ
---

Below are a list of frequently asked questions regarding the OmiseGO Network and the behaviors of Plasma.

## What is Plasma?
Plasma is a Layer 2 (i.e. off-chain) scaling solution for Ethereum. Compared to other Layer 2 solutions, Plasma's advantage is that every block on the Plasma (or child) chain is committed to the root chain. This means that if anything goes wrong on the child chain, honest users will always be able to exit the child chain and recover their funds on the root chain.

There are several versions of Plasma, including MoreVP, which is OmiseGO's chosen solution. 
Different versions of Plasma are suited to specific use cases and the operator (OmiseGO in this case) typically chooses the most suitable version for their scenario. From a users perspective, all versions of Plasma behave more or less the same.

Plasma is typically used for the following:

* Depositing funds from the root chain (Ethereum) into the child chain.
* Transacting on the child chain (sell, trade, transfer, etc.).
* Exiting remaining funds from the child chain back to the root chain.

## What is the OmiseGO Network architecture?
The table describes the components of the OmiseGO Network architecture:
| Component | Description |
| ---       | ---         |
| Ethereum  | The root chain. |
| Child chain | Currently, in Proof of Authority mode, there is only one child chain service that implements the child blockchain. It is anticipated that this will change when OmiseGO network transitions to Proof of Stake. |
| Watcher | A service that monitors the child chain for suspicious activity, such as the operator or any user acting dishonestly. If the watcher discovers suspicious activity, it prompts users to challenge invalid exits, or to exit the child chain. Users can run their own Watcher, but it is also expected that some trusted entity will run Watchers as a service. |

## What is a UTXO?
UTXO stands for Unspent Transaction Output. It is a data structure that consists of 4 inputs and 4 outputs. Inputs consist of the funds being spent, and the outputs consist of where the funds are headed. 

The OmiseGO Network utilizes a UTXO-based blockchain.

