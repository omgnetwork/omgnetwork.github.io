---
id: plasma-proposition
title: Plasma Proposition
sidebar_label: Plasma Proposition
---

## What is Plasma?

Plasma is an off-chain scaling protocol for Ethereum. It is predicated on the creation of a child chain built to suit a given use case and batch transactions before committing them to the  Ethereum root chain. Importantly, however, the child chain relies on the root chain as the ultimate trust and arbitration layer.

What this protocol achieves is a higher transaction throughput at a lower cost while maintaining the same security guarantees as Ethereum. Specifically, if something goes wrong with the child chain, users’ funds are still safe. In the blockchain industry, this characteristic is typically described as trustlessness – users do not need to trust the correct operation of the child chain for the safety of their funds; users can interact with the root chain to claim their funds.

The core security proposition of Plasma revolves around honest users being able to exit the child chain (in other words, withdraw funds to the root chain) at any time. To exit the child chain, a user submits an exit transaction – along with an exit bond – to the root chain. The exit is subject to a challenge period, during which any user can prove, if applicable, that the exit is invalid. If successfully shown to be invalid, the exit is not processed, and the challenger is awarded the exit bond. This exit game is entirely dependent on the root chain.

As the child chain relies on the root chain to be its ultimate arbiter, it must commit a compacted and verifiable version of its state changes periodically to the smart contract running on the root chain. As opposed to submitting individual transaction data onto the root chain, the child chain bundles transactions into a [Merkle tree](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5) and submits the root hash.

Beyond these core elements, there is no prescribed configuration for a Plasma chain. They can take on different consensus protocols, block validation mechanisms, or fraud proofs. The design is adaptable to the use case. The OMG Network is  based on the Plasma [MoreVP](https://github.com/omgnetwork/elixir-omg/blob/master/docs/morevp.md) design, an extension of [Minimum Viable Plasma](https://ethresear.ch/t/minimal-viable-plasma/426) optimized for the settlement of payments and exchanges.


## Plasma versus Side Chains

A side chain is a blockchain that is separate from the main chain but is attached to it using a peg that enables the two-way transfer of assets. It can be operated in different ways, whether by a single trusted entity or a consensus algorithm. Flexible to suit given use cases in their design, side chains are a consequential innovation for the interoperability and scalability of blockchain networks.

A Plasma chain differs from a side chain in the crucial sense that it is ultimately secured by its root chain. Namely, if there is any malicious activity on the Plasma chain, users can safely exit and – after a challenge period – withdraw their funds. This mechanism relies solely on the root chain, so users can secure their funds even if the Plasma chain becomes unavailable or if its operator acts dishonestly.

A regular side chain may not have this security property. A user has to trust the mechanisms of the side chain, not the main chain – and could be vulnerable in this regard.

Vitalik Buterin, a co-founder of Ethereum, describes Plasma chains as “side chains that have a non-custodial property”. Indeed, given its embedded exit mechanism, a Plasma chain allows users to retain a degree of effective custody over their assets.

## Plasma versus State Channels

State channels are a mechanism to conduct transactions off the blockchain without requiring any additional trust. As with side chains and Plasma, the objective of state channels is to yield significant improvements in the cost and speed of blockchain transactions. 

The lifecycle of a state channel is the following: 

1. A defined set of users agree to lock part of the main chain state, in such a way that they must completely agree with one another to update it. 
2. Participants update the state by exchanging signed, valid main chain transactions to validate the new state. These updates are not submitted to the chain, and each new update supersedes the previous one.
3. Participants submit the final state back to the main chain, closing the state channel. The main chain state is unlocked and adjusted to reflect the final state channel update. 

Various mechanisms are proposed to prevent a dishonest participant from closing the state channel with a non-final state. A dispute period, for one, would allow participants to challenge a channel closure by presenting a later version of the state. Alternatively, participants could be required to agree on closing the channel. 

State channels operate with the requirement of unanimous consent on state updates. The resulting advantage is instant finality: as soon as all participants sign a state update, it is final and – if necessary – enforceable on-chain.  In comparison, Plasma relies on Merkle proofs submitted to the main chain, meaning that transactions on the Plasma chain have the same probabilistic finality as their block on the main chain.

On the other hand, state channels require total availability from participants. The absence of a participant could block state updates in the channel,  or be exploited by a dishonest participant to close the channel with a non-final state. 

In addition, state channels are not suited for applications with a changing set of participants. The contract locking the state must know the participants in a given channel and would need to be modified every time one is added or removed. 

In comparison, Plasma does not face these limitations. 

## Plasma versus Optimistic Rollups

As a scaling protocol, Optimistic Rollups (ORs) share several key characteristics with Plasma. A smart contract on the main chain holds user funds and receives compacted, verifiable versions of state updates on the side chain periodically. User withdrawals are, as in Plasma, subject to a challenge game governed by logic on the main chain.

ORs differ from Plasma, however, in that they trade away scalability for [Turing Completeness](https://www.binance.vision/glossary/turing-complete) and greater data availability. 

**Turing Completeness**

Optimistic Rollups run an [EVM](https://www.binance.vision/glossary/virtual-machine)-compatible virtual machine called OVM (Optimistic Virtual Machine). This key innovation enables ORs to execute anything Ethereum can, arguably giving them a wider range of use cases. It is important to note, however, that fraud proofs may become too complicated (or expensive) to process on the main chain as transactions increase in complexity.

**Data Availability**

Whereas Plasma chains compact transaction data into Merkle hashes for submission to the root chain, ORs leverage *calldata* to submit data for individual transactions. The availability of this data simplifies and secures the challenge game, as users do not rely on data from the “side chain” to challenge invalid behavior. On the other hand, *calldata* does have a finite capacity, which limits the potential of Optimistic Rollups for scale and high throughput.

Ultimately, Plasma and Optimistic Rollups are both consequential innovations for the Ethereum landscape. Like all Layer 2 solutions, they come with trade-offs. How those trade-offs fit into applications is what matters.