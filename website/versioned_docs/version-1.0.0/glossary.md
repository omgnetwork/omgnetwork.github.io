---
id: version-1.0.0-glossary
title: Glossary
sidebar_label: Glossary
original_id: glossary
---

This page provides explanations of the core concepts and terminology for the OMG Network.

## Accountability
The ability to detect that trade did not execute as expected.

## Accounts
Accounts refer to a grouping of users and wallets. 

## API
Application Programming Interface. Acts as the interface between different software programs.

## Average block time
Source: https://medium.facilelogin.com/the-mystery-behind-block-time-63351e35603a

The average time it takes to mine a block on a blockchain, determined by evaluating the network after n number of blocks. Compares to expected block time, which is a constant value. When average block time is greater than the expected block time, the difficulty level of the proof of work algorithm is reduced, and if it is less than the expected block time, the difficulty level is increased. 

## BlockHeight
The number of blocks in a blockchain counted between the last block and the first block.

## Blockchain
Wikipedia describes a blockchain as "a growing list of records, called blocks that are linked using cryptography. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data (generally represented as a Merkle tree)". Thus, a blockchain is a digital record or ledger. Transactions on a blockchain are public and are ordered chronologically. Source: https://en.wikipedia.org/wiki/Blockchain.

## Canonical transaction 
A transaction is canonical if none of its inputs were previously spent in another transaction.
The definition of "previously spent" depends on whether a particular transaction is included in the child chain.
The position of a transaction in the chain is determined by the tuple (block number, transaction index).
An input to a transaction is considered previously spent if the "other" transaction spending is in an earlier block or has a lower index in the same block.
If the "other" transaction is not included in the chain but known to exist, it is not possible to determine which transaction came first, so neither is considered canonical.

## CEX
A centralized network where users and nodes are all connected to a central server. 

## Cash in/Cash out
A cash-in/cash-out solution assumes that everyone has a smartphone with access to e-wallet applications that exist in a 'closed-loop' payment infrastructure. OMG Network aims to open up these wallet siloes to allow wallets to exchange with each other. Cash-in and cash-out touchpoints aim to create a network of banking, hardware, and retail partners where users can deposit and withdraw their cash. The cash becomes tokenized on any wallet application the user chooses and may immediately be exchanged for other tokenized currencies and assets via the OMG Network.

## Child chain
The OMG Network.

## Chain validator
PoS block proposer and transaction verifier.

## Clearing
The procedure to settle financial trades. This involves a correct and timely transfer of funds to the seller and securities to the buyer. A specialized organization may act as an intermediary and assume the role of tacit buyer and seller in a transaction to reconcile orders between transacting parties. The clearing is required for matching all buy and sell orders in the market. Parties to the transaction can make transfers to the clearing cooperation rather than to each party they transact with.

## Consensus algorithm
A process that allows nodes (devices or data points) in a distributed system or blockchain network to reach an agreement.

## Contract
A contract is an agreement that involves two or more parties to a mutual obligation. On the blockchain, contracts inherit some of the blockchain's properties. Contracts executed on the blockchain are known as smart contracts. Smart contracts are self-executable when they meet specified conditions and immutable, which means their code can't be changed once they're created and deployed. The Ethereum blockchain employs the ERC20 technical standard for implementing tokens in smart contracts. Most tokens issued on an Ethereum blockchain are ERC20-compliant. 

## Cold storage
An offline wallet provided for cryptocurrency storage.

## Competing transaction, competitors
Two transactions are *competing* if they share at least one input. Competitors to a transaction are the set of all transactions that are competing with the transaction in question, including the transaction itself. 

## Custody
A custodial service takes care of assets on behalf of clients. For example, a brokerage or other financial institution that holds securities on behalf of clients. In the context of cryptocurrency assets, the custody service stores private keys in a hardware solution to hold cryptocurrency funds on behalf of users who don't want to risk taking care of their keys. 

## Decentralized Application
Also known as dApp. An open-source application that utilizes blockchain technology, runs on a P2P (peer-to-peer) network and adheres to its consensus algorithm.

## Decentralized Exchange
Also known as DEX. A cryptocurrency exchange that trades via an automated, peer-to-peer process instead of through a centralized authority. A DEX has the following benefits:
* No third-party operator.
* Low trading volume (less than CEX).
* Low liquidity.
* Private key is available to store.
* Information is stored in nodes so cannot be hacked.
* Market traders are only part of the platform.
* No database entry (all entries are in the blockchain).
* Peer-to-peer exchange.
* High level of privacy because trader details can't be stored.
* Infrastructure is more secure because it's distributed through nodes.

## Decentralized Finance
Also known as DeFi. OMG Network contributes to and supports DeFi, enabling interoperability of multiple solutions to guard against fragmentation. DeFi requires a network with an ecosystem that makes it attractive to build products on it, including adequate liquidity. DeFi can lower barriers to access financial services, supporting the provision of loans, for example data on the blockchain can be used as input to identify credit risk of the debtor. Financial literacy is a requirement since users must look after their keys and use the technology responsibly.

## Decentralized network
In a decentralized network, such as a blockchain, data is redundantly stored and monitored by multiple nodes, instead of on a private server. Additionally, data is distributed amongst a web of individual machines with different owners that perform continuous consensus on the validity of changes to its state. In a decentralized network, mechanisms exist to reward nodes that align themselves with network consensus and penalize those which do not. See Proof of Stake for more information about OMG Network's enforcement mechanisms. Centralized networks require trust in a central party, which is opaque and gated. Centralized databases are vulnerable to attack because they present a single point of entry for bad actors looking to steal or manipulate data. Decentralized networks are transparent. Every state change of such networks (i.e. every balance and every transaction) is stored on a shared ledger that can be viewed by anyone or is obscured in a way that makes voluntary provable traceability possible where necessary. Thus, there is no need to trust the word of a central authority.

## Deposit Finality Period
The deposit finality period refers to the number of Ethereum block confirmations required before a deposit can be used on the network. It is in place to mitigate the risk posed to the OMG Network by Ethereum chain re-organizations.

A chain re-organization can happen when a node on the Ethereum network realizes that what is considered to be the canonical chain turns out not to be. As this node then jumps back to the canonical chain, the transactions in the latter part of its chain are reverted and can end up in subsequent blocks. 

A chain re-organization can be problematic for the child chain in the following scenario: 

1. Alice deposits 1 ETH into the child chain (`Ethereum TX1`).
2. Alice quickly sends 1 ETH to Bob on the child chain. This transaction is then added to a block that is submitted to the root chain (`Ethereum TX2`).
3. Chain re-organization results in `Ethereum TX2` being placed in an earlier Ethereum block than `Ethereum TX1` ⁠— rendering the child chain spuriously invalid. 

By requiring a number N of Ethereum block confirmations before the deposit can be used, the deposit finality period significantly reduces the probability of the above scenario. 

## EIP-712
An Ethereum standard that allows the signing of a Plasma transaction with MetaMask. Involves typed message signing and data hashing in a structured and readable format.

## ERC-20
An Ethereum standard that provides developers with a set of rules and guidelines for issuing and implementing tokens within the Ethereum ecosystem.

## Ethereum platform
The platform of the world's second-largest cryptocurrency by market capitalization. Ethereum was launched in July 2015 by Vitalik Buterin. The goal of the platform is to provide developers with an open distributed network for starting their decentralized applications (DApps) and smart contracts. If the Bitcoin network plays the role of a peer-to-peer payment system, then Ethereum is designed to execute the program code using a decentralized virtual machine (EVM). 
See also: https://www.ethereum.org/

## Exit
Exit refers to the position at which an investor or institution sells its stake or liquidates its assets to claim a gain or loss.

## Exitable transaction
A spend transaction can be called *exitable* if the transaction is correctly formed (e.g. more input value than output value, inputs older than outputs, proper structure) and is properly signed by the owners of the transaction’s inputs.
If a transaction is *exitable*, a user may try to start an exit that references the transaction. 

## Front running
Also known as tailgating. The prohibited practice of entering into an equity (stock) trade, option, futures contract, derivative, or security-based swap, to capitalize on the advance, nonpublic knowledge of a large ("block") pending transaction that will influence the price of the underlying security.

## Gas price
Refers to the amount of Ether you're willing to pay per unit of gas. Gas is the measure for the computational work of running transactions or smart contracts on the Ethereum network. Gas may be compared to the use of kilowatts (kW) for measuring electricity use. Gas price is typically measured in Gwei. 

## Hard spoon
Hard spoon, a term coined by Jae Kwon (founder, CEO of Tendermint), is a new blockchain that takes the state of an existing chain into account to broaden access, not to compete. A hard spoon occurs when new crypto is minted, replicating the account balance of existing crypto. Vitalik Buterin defined a hard spoon as a "... a meta-protocol on top of a blockchain creating a token that inherits the blockchain’s underlying token's balances. The idea of a soft spoon would be to create two competing branches of a protocol within the same blockchain."

## Hash
A unique identifier for a block or transaction on the Plasma child chain. The transaction hash identifies a particular transaction. The block hash uses an algorithm that relies on data in the header of the block that points to the previous block and indicates the current state of the blockchain.

## In-flight transaction
A transaction is considered to be “in-flight” if it has been broadcast but has not yet been included in the child chain. It may also be in-flight from the perspective of an individual user if that user does not have access to the block in which the said transaction is included.

## Inclusion Proof
A Merkle Proof that a given transaction was included in a given block. Read more about Merkle Proofs [here](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5).

## Integration libraries
Integration libraries exist in the layer between web applications and the blockchain, providing the end-to-end infrastructure for integrating an end-user application, from application to the library to watcher to child chain.

## Interoperability
A characteristic of a product or system that has interfaces understood to be able to work with other products or systems, at present or in the future, in either implementation or access, without any restrictions. See https://en.wikipedia.org/wiki/Interoperability

## Liquidity
Refers to the ability to buy or sell assets in the market (including digital assets), quickly and at a good price. In a liquid market, investors are willing to trade. A liquid asset is one that is easily converted to cash.

## Mainnet
A blockchain network on which projects run. The final product of a project.

## Market maker
A company, financial institution, or individual dealing in securities or other assets, and who commits to buying and selling some quantity of an asset at a publicly quoted price at all times.

## Mempool
On a blockchain, mempool (memory pool) is the number of currently unconfirmed transactions. The mempool figure is an estimate, and changes frequently, as the status of transactions goes from unconfirmed to confirmed. The size of the mempool is an indicator of transactions waiting to be included in the block. A large mempool means the network is getting full, which may delay the transaction, and increases network fees. The size of the mempool is thus an important indicator for determining how the network handles transactions.

## Mint
Mint is a record of each occurrence when more tokens were put into circulation.

## MoreVP

## Node
Any computer that connects to the blockchain network.

## ODP
Short for OMG Network Developer Program. Find out more [here](https://docs.omg.network).

## OMG
Short for OMG Network, the name of the OMG Network. Also, the ticker of the ERC20 token used to secure the network.

## OMG token
A utility and staking token that gives users the right to take an active role by running validator nodes on OMG Network's Proof of Stake network, using their tokens as a security deposit. 
An OMG token brings value to the Ethereum Mainnet because the value of the OMG token is backed by the value of the amounts transacted on the OMG Network (both external, real-world money, and crypto-money) and being pushed through the network’s decentralized exchange (including the other applications, businesses, and token projects that are outsourcing their DEX requirements to it). As the OMG Network platform and the underlying network evolves, so does the nature and role of the OMG token.

## OMG Network
Pronounced oh-mee-say-go, OMG Network is an incorporated entity, a subsidiary of Omise Holdings.

## Order matching
Refers to the rules of the market for matching orders. An order for OMG Network and the industry is the intent to trade, which includes the following:
* An instrument (an asset - crypto)
* A price
* Volume (quantity)

## Operator
The company or user running the software that provides blockchain services, such as OMG Network.

## Proof of Stake
Also known as *PoS*. A blockchain consensus algorithm.

## Peer-to-peer
Also known as P2P, a system in which peers (computers) connect, share resources, or transact with each other, without the need for a central server.

## Proof of Work
Also known as *PoW*. A blockchain consensus algorithm, invented by Satoshi Nakamoto.

## Plasma
Plasma is the scaling solution of OMG Network. It is a framework for incentivized and enforced execution of smart contracts.

## Plasma block verifier
The entity that verifies blocks in a child chain. In the OMG Network's case, an entity that runs the watcher software.

## Plasma cash
Assets deposited into a Plasma cash chain are represented as non-fungible tokens (NFTs). Blocks are different from Plasma MVP, in that each Plasma cash block allocates a slot for each token. When a token is transacted, a record of that transaction is placed at the corresponding slot. Plasma cash removes Plasma MVP’s exit time constraints and reduces user storage and computation requirements by only requiring users to watch their value.

## Plasma XT
Introduces checkpointing from the child chain to the root chain, which allows for periodic finalization of a coin’s ownership to reduce the amount of data that must be stored and verified by each user to limit the storage and computation requirements per coin.

## Plasma debit
A proposal for enabling partial balances (spending only part of the value of a non-fungible token) in a Plasma cash construction, by making every token a payment channel between the user and the chain operator.

## Private key
The private key grants a cryptocurrency user ownership of the funds on a given address. The Blockchain wallet automatically generates and stores private keys for you.

## Proof
A piece of data that you can show to the world to prove that some fact is correct or incorrect.

## Proof of Authority
Also known as PoA. A consensus mechanism in a private blockchain that gives one client (or a specific number of clients) with one particular private key, the right to make all of the blocks in the blockchain.

## Proof of Stake
Also known as PoS. An alternative to Proof-of-Work (PoW). In PoW, a miner spends enormous computing power to mine blocks. In PoS, your existing stake (amount of cryptocurrency you hold) determines how much currency you can mine. Both systems are designed to reward honest behavior: 
| Term | Description |
| ---  | ---    |
| PoS  | Miner must stake their tokens as security deposit and receives transaction fees for honest behavior. Dishonest users risk losing their tokens (hard slashing) or receive reduced returns (soft slashing).  |
| PoW  | Requires substantial investment in hardware and energy. The first miner to demonstrate correct PoW on a mined block receives a block reward and transaction fees for the block. Investment cost exists regardless of the outcome, but a dishonest miner (e.g. submits incorrect proofs) risks losing the investment. |

OMG Network used soft slashing in its initial Honte implementation. Returns are distributed in proportion to the number of tokens staked. However, PoS still represents a more equitable system in that returns are directly proportional to your stake. In PoW, the more computing power you have, the cheaper it is to add more - and since computing power is what earns you mining rewards, this leads to people with lots of money collecting disproportionately larger returns. In PoS, a dollar is a dollar no matter how many of them you have.

## Protocol
An established set of rules or parameters for formatting, transmitting and communicating data between network devices.

## Prover
The entity that generates proof for trades.

## Restricted custody
A safety guarantee that protects user funds on the network. 

OMG Network's restricted custody is the safety mechanism that protects users’ funds when they trade at an exchange. If the operator (OMG Network, in this case) tries to steal funds, users will not lose their money. The only way funds can be lost is if the operator and the exchange collude. OMG Network's security guarantee is enforced in its protocol, whereby the actual platform prevents the operator from acting dishonestly. Three parties must agree to allow OMG Network's exchange to trade: user, operator/OMG Network, and exchange. This mechanism allows OMG Network to protect the exchange.

## Root chain
The Ethereum root chain. Can be differing in the environment, ie. Rinkeby, Ropsten, Mainnet, etc.

## Settlement
Refers to the exchange of payment to the seller and the transfer of securities to the buyer of a trade.
A settlement is a final step in the lifecycle of a securities transaction.
A settlement is similar to PSP (Payment Service Provider), reconciliation reports, and so on. The purpose of the audit layer is to support the integrity of these settlements, to ensure that all data is valid.

## Shared liquidity
Shared liquidity implies that there is a large amount (a pool) of orders. OMG Network does not offer shared liquidity. Instead, OmiseGo allows users to move their funds easily between venues. For example, if OMG Network offered shared liquidity, Binance and GO.Exchange could see and access the orders of both (it is a shared/combined view of orders).

## Spend transaction
A spend transaction is any transaction that spends a UTXO that is already present on the child chain. 

## Staking
Staking refers to holding a cryptocurrency or token in a wallet for a period of time in return for interest. Staking returns depend on staking (holding) time; the longer the stake duration, the higher the returns.

## Testnet
A sandbox blockchain environment for developers working on a project prototype.

## Trading protocol
A list of well-defined protocols that determine how communication occurs on an electronic trading platform.

## Token
A digital identity for something that can be owned.

## Trade verifier
An entity in a secure settlement that verifies the correctness of matching off-chain. The role may be performed by the venue or by a trusted third-party.

## Transactions
In a blockchain, a transaction is an exchange of value between two wallets. Transactions are stored in the local ledger using a DEB approach. DEB (Double Entry Bookkeeping) is a system where entry is created and DEBIT/CREDIT transactions are linked to it. The sum of all debits minus the sum of all credits for a specific entry has to be equal to 0. Summing up all credit transactions minus all debit transactions for a specific balance address and the token symbol gives the balance of the address.

## Unstoppable
While this is not a typical technical glossary term, it's important to clarify what we mean when we say that the OMG Network is 'Unstoppable'. We use this term to characterize the OMG Network because even if OMG Network (the company) ceased to exist and our servers were shut down, the OMG Network can be restarted. All software required to run the network is open source and freely available, and anyone could restart the OMG Network. Additionally, OMG Network does not control the OMG token; the token cannot be withdrawn from circulation because the authority key for the contract was destroyed. 

## UTXO
Short for Unspent Transaction Output. See: https://bitcoin.org/en/glossary/unspent-transaction-output.

## Valid transaction

A spend transaction is valid if it is exitable, canonical, and if its inputs only stem from valid transactions. A transaction is considered invalid if even a single invalid transaction is present in its history.

An exitable transaction is not necessarily a valid transaction, but all valid transactions are, by definition, exitable.

## Validator
The person responsible for verifying transactions in a blockchain.

## Venue
An entity that holds the order book and matches orders. Venues may be retail or institutional.