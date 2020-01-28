---
id: glossary
title: Glossary
sidebar_label: Glossary
---

This page provides explanations of the core concepts and terminology for OmiseGO.

## Accountability
The ability to detect that a trade did not execute as expected.


## Accounts
Accounts refers to a grouping of users and wallets. 


## API
Application Programming Interface. Acts as the interface between different software programs.


## Average block time
Source: https://medium.facilelogin.com/the-mystery-behind-block-time-63351e35603a

The average time it takes to mine a block on a blockchain, determined by evaluating the network after n number of blocks. Compares to expected block time, which is a constant value. When average block time is greater than the expected block time, the difficulty level of the proof of work algorithm is reduced, and if it is less than the expected block time, the difficulty level is increased. 


## BlockHeight
The number of blocks in a blockchain, counted between the last block and the first block.


## Blockchain
Wikepedia describes a blockchain as "a growing list of records, called blocks, which are linked using cryptography. Each block contains a cryptographic hash of the previous block, a timestamp, and transaction data (generally represented as a Merkle tree)". A blockchain is thus a digital record, or ledger. Transactions on a blockchain are public, and are ordered chronologically. Source: https://en.wikipedia.org/wiki/Blockchain


### Canonical transaction 
A transaction is *canonical* if none of its inputs were previously spent in any other transaction; that is, the transaction is the oldest among all its competitors. 
The definition of *previously spent* depends on whether the transaction in question is included in the Plasma chain.
The position of a transaction in the chain is determined by the tuple (block number, transaction index).
If the transaction was included in the chain, an input to that transaction would be considered previously spent if another transaction also spending the input was included in the chain *before* the transaction in question, decided by transaction position.
If the transaction was not included in the chain, an input to that transaction would be considered previously spent if another transaction also spending the input is *known to exist*.

In this second scenario, it is unimportant whether or not the other transaction is included in the chain:

| Transaction included in the chain? | The other transaction is clearly included before the transaction in question. |
| Other transaction is not included in the chain? | In this case, we can’t tell which transaction *came first*; thus, we simply say that neither is canonical. |


## CEX
Centralized network, in which users and nodes are all connected to a central server. 


## Cash in/Cash out
A cash in/cash out solution assumes that everyone everyone has a smartphone with access to e-wallet applications that exist in a 'closed loop' payment infrastructure. OmiseGO aims to open up these wallet siloes to allow wallets to exchange with each other. Cash in and cash out touchpoints aim to create a network of banking, hardware, and retail partners where users can deposit and withdraw their cash. The cash becomes tokenized on any wallet applicatoin the user chooses, and may immediately be exchanged for other tokenized currencies and assets via the OmiseGO blockchain.


## Childchain
The OMG Network.


## Chain validator
PoS block proposer and transaction verifier.


## Clearing
The procedure by which financial trades settle; that is, the correct and timely transfer of funds to the seller and securities to the buyer. A specialized organization may act as intermediary and assume the role of tacit buyer and seller in a transaction to reconcile orders between transacting parties. Clearing is required for matching all buy and sell orders in the market. Parties to the transacton can make transfers to the clearing cooperation rather than to each party with whom they transact.


## Consensus algorithm
A process that allows nodes (devices or data points) in a distributed system or blockchain network to reach agreement.


## Contract
A contract is an agreement involving two or more parties to a mutual obligation. On the blockchain, contracts inherit some of the blockchain's properties. Contracts executed on the blockchain are known as smart contracts. Smart contracts self-execute when specified conditions are met, and they're immutable, which means their code can't be changed once they're created and deployed. The Ethereum blockchain employs the ERC20 technical standard for implementing tokens in smart contracts. Most tokens issued on an Ethereum blockchain are ERC20-compliant. 


## Cold storage
An offline wallet provided for storing cryptocurrency.


## Competing transaction, competitors
Two transactions are *competing* if they share at least one input. Competitors to a transaction is the set of all transactions that are competing with the transaction in question, including the transaction itself. 


## Custody
A custodial service takes care of assets on behalf of clients. For example, a brokerage or other financial institution that holds securities on behalf of clients. In the context of cryptocurrency assets, the custody service stores private keys in a hardware solution to hold cryptocurrency funds on behalf of users who don't want to risk taking care of their own keys. 


## Decentralized Application
Also known as dApp. An open-source application that utilizes blockchain technology, runs on a P2P (peer-to-peer) network, and adheres to its own consensus algorithm.


## Decentralized Exchange
Also known as DEX. A cryptocurrency exchange that trades via an automated, peer-to-peer process instead of through a centralized authority. A DEX has the following benefits:
* No third party operator
* Low trading volume (less than CEX)
* Low liquidity
* Private key is available to store
* Information is stored in nodes so cannot be hacked
* Market traders are only part of the platform
* No database entry (all entries are in blockchain)
* Peer-to-peer exchange
* High level of privacy because trader details can't be stored
* Infrastructure is more secure because it's distributed through nodes


## Decentralized Finance
Also known as DeFi. OmiseGO contributes to and supports DeFi, enabling interoperability of multiple solutions to guard against fragmentation. DeFi requires a network with an ecosystem that makes it attractive to build products on it, including adequate liquidity. DeFi can lower barriers to access financial services, supporting provision of loans, for example, since data on the blockchain can be used as input to identify credit risk of the debtor. Financial literacy is a requirement since users must look after their own keys and use the technology responsibly.


## Decentralized network
In a decentralized network, such as a blockchain, data is redundantly stored and monitored by multiple nodes, instead of on a private server. Additionally, data is distributed amongst a web of individual machines with different owners that perform continuous consensus on the validity of changes to its state. In a decentralized network, mechanisms exist to reward nodes that align themselves with network consensus, and penalize those which do not. See Proof of Stake for more information about OmiseGO's enforcement mechanisms. Centralized networks require trust in a central party, are opaque, and gated. Centralized databases are vulnerable to attack because they present a single point of entry for bad actors looking to steal or manipulate data. Decentralized networks are transparent in that every state and every state change (i.e. every balance and every transaction) is stored on a shared ledger, which can be viewed by anyone, or are obscured in a way that makes voluntary provable traceability possible where necessary, so there is no need to trust the word of a central authority.

## Deposit Finality Period
The deposit finality period refers to the number of Ethereum block confirmations required before a deposit can be used on the network. It is in place to mitigate the risk posed to the OMG Network by Ethereum chain re-organisations.

A chain re-organisation can happen when a node on the Ethereum network realises that what it considered to be the canonical chain turns out not to be. As this node then jumps back to the canonical chain, the transactions in the latter part of its chain are reverted and can end up in subsequent blocks. 

A chain re-organisation can be problematic for the Plasma Chain in the following scenario: 

1. Alice deposits 1 ETH into the Plasma Chain (`Ethereum TX1`)
2. Alice quickly sends 1 ETH to Bob on the Plasma Chain. This transaction is then added to a block that is submitted to the root chain (`Ethereum TX2`)
3. Chain re-organisation results in `Ethereum TX2` being placed in an earlier Ethereum block than `Ethereum TX1` - rendering the Plasma Chain spuriously invalid. 

By requiring a number N of Ethereum block confirmations before the deposit can be used, the deposit finality period significantly reduces the probability of the above scenario. 

## EIP-712
An Ethereum standard that allows signing of a Plasma transaction with MetaMask. Involves typed message signing and data hashing in a structured and readable format.


## ERC-20
An Ethereum standard that provides developers with a set of rules and guidelines for issuing and implementing tokens within the Ethereum ecosystem.


## Ethereum platform
The platform of the world's second-largest cryptocurrency by market capitalization. Ethereum was launched in July 2015 by Vitalik Buterin. The goal of the platform is to provide developers with an open distributed network for starting their own decentralized applications (DApps) and smart contracts. If the Bitcoin network plays the role of a peer-to-peer payment system, then Ethereum is designed to execute the program code using a decentralized virtual machine (EVM). 
See also: https://www.ethereum.org/


## Exit
Exit refers to the position at which an investor or institution sells their stake or liquidates their assets to claim a gain or loss.


### Exitable transaction
A spend transaction can be called *exitable* if the transaction is correctly formed (e.g. more input value than output value, inputs older than outputs, proper structure) and is properly signed by the owners of the transaction’s inputs.
If a transaction is *exitable*, a user may try to start an exit that references the transaction. 


## Front running
Also known as tailgating. The prohibited practice of entering into an equity (stock) trade, option, futures contract, derivative, or security-based swap, to capitalize on advance, nonpublic knowledge of a large ("block") pending transaction that will influence the price of the underlying security.


## Gas price
Refers to the amount of Ether you're willing to pay per unit of gas. Gas is the measure for the computational work of running transactions or smart contracts on the Ethereum network. Gas may be compared to the use of kilowatts (kW) for measuring electricity use. Gas price is typically measured in Gwei. 


## Hard spoon
Hard spoon, a term coined by Jae Kwon (founder, CEO of Tendermint), is a new blockchain that takes the state of an existing chain into account in order to broaden access, not to compete. A hard spoon occurs when a new crypto is minted, replicating the account balance of an existing crypto. Vitalik Buterin defined a hard spoon as a "... a meta-protocol on top of a blockchain creating a token that inherits the blockchain’s underlying token's balances. The idea of a soft spoon would be to create two competing branches of a protocol within the same blockchain."


## Hash
A unique identifier for a block or transaction on the Plasma child chain. The transaction hash identifies a particular transaction. The block hash uses an algorithm that relies on data in the header of the block, which points to the previous block, and indicates the current state of the blockchain.


## In-flight transaction
A transaction is considered in-flight if it has been broadcast but has not yet been included in the Plasma chain. A transaction may be in-flight from the perspective of an individual user if that user does not have access to the block in which the transaction is included.  


## Inclusion Proof
A Merkle Proof that a given transaction was included in a given block. Read more about Merkle Proofs [here](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5).


## Integration libraries
Integration libraries exist in the layer between web applications and the blockchain, providing the end-to-end infrastructure for integrating an end-user application, from application to library to watcher to child chain.


## Interoperability
A characteristic of a product or system, which has interfaces that are understood to be able to work with other products or systems, at present or in the future, in either implementation or access, without any restrictions. See https://en.wikipedia.org/wiki/Interoperability


## Liquidity
Refers to the ability to buy or sell assets in the market (including digital assets), quickly and at a good price. In a liquid market, investors are willing to trade. A liquid asset is one that is easily converted to cash.


## Mainnet
A blockchain network on which projects run. The final product of a project.


## Market maker
A company, financial institution, or individual dealing in securities or other assets, and who commits to buying and selling some quantity of asset at a publicly quoted price at all times.


## Mempool
On a blockchain, mempool (memory pool) is the number of currently unconfirmed transactions. The mempool figure is an estimate, and changes frequently, as the status of transactions goes from unconfirmed to confirmed. The size of the mempool is an indicator of transactions waiting to be included in the block. A large mempool means the network is getting full, which may delay the transaction, and increases network fees. The size of the mempool is thus an important indicator for determining how the network handles transactions.


## Mint
A mint is a record of each occurrence when more tokens were put into circulation.


## MoreVP


## Node
Any computer that connects to the blockchain network.


## ODP
Short for OmiseGO Developer Program. Find out more [here](https://developer.omisego.co/)


## OMG
Short for OmiseGO, the name of the OMG Network. Also, the ticker of the ERC20 token used to secure the network.


## OMG token
A utility and staking token that gives users the right to take an active role by running validator nodes on OmiseGO's Proof of Stake network, using their tokens as a security deposit. 
An OMG token brings value to the Ethereum Mainnet because the value of the OMG token is backed by the value of the amounts transacted on the OMG Network (both external, real-world money, and crypto-money) and being pushed through the network’s decentralized exchange (including the other applications, businesses, and token projects that are outsourcing their DEX requirements to it). As the OmiseGO platform and the underlying network evolves over time, so does the nature and role of the OMG token.


## OmiseGO
Pronounced oh-mee-say-go, OmiseGO is an incorporated entity, a subsidiary of Omise Holdings.


## Order matching
Refers to the rules of the market for matching orders. An order for OmiseGO and the industry is the intent to trade, which includes the following:
* An instrument (an asset - crypto)
* A price
* Volume (quantity)


## Operator
The company or user running the software that provides blockchain services, such as OmiseGO.


## Proof of Stake
Also known as *PoS*. A blockchain consensus algorithm.

## Peer-to-peer
Also known as P2P, a system in which peers (computers) connect, share resources, or transact with each other, without the need for a central server.


## Proof of Work
Also known as *PoW*. A blockchain consensus algorithm, invented by Satoshi Nakamoto.


## Plasma
Plasma is the scaling solution of OmiseGO. It is a framework for incentivized and enforced execution of smart contracts.


## Plasma block verifier
The entity that verifies blocks in a Plasma chain. In OmiseGO’s case, an entity that runs the watcher software.


## Plasma cash
Assets deposited into a Plasma cash chain are represented as non-fungible tokens (NFTs). Blocks are different from Plasma MVP, in that each Plasma cash block allocates a slot for each token. When a token is transacted, a record of that transaction is placed at the corresponding slot. Plasma cash removes Plasma MVP’s exit time constraints and reduces user storage and computation requirements by only requiring users watch their own value.


## Plasma XT
Introduces checkpointing from the Plasma chain to the root chain, which allows for periodic finalization of a coin’s ownership in order to reduce the amount of data taht must be stored and verified by each user to limit the storage and computation requirements per coin.


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
| PoW  | Requires substantial investment in hardware and energy. First miner to demonstrate correct PoW on a mined block receives a block reward and transaction fees for the block. Investment cost exists regardless of the outcome, but a dishonest miner (e.g. submits incorrect proofs), risks losing the investment. |

OmiseGO used soft slashing in its initial Honte implementation. Returns are distributed in proportion to the number of tokens staked. However, PoS still represents a more equitable system in that returns are directly proportional to your stake. In PoW, the more computing power you have, the cheaper it is to add more - and since computing power is what earns you mining rewards, this leads to people with lots of money collecting disproportionately larger returns. In PoS, a dollar is a dollar no matter how many of them you have.


## Protocol
An established set of rules or parameters for formatting, transmitting, and communicating data between network devices.


## Prover
The entity that generates proofs for trades.


## Restricted custody
A safety guarantee that protects user funds on the network. 

OmiseGO's restricted custody is the safety mechanism that protects users funds when they trade at an exchange. If the operator (OmiseGO, in this case) tries to steal funds, users will not lose their money. The only way funds can be lost is if the operator and the exchange collude. OmiseGO's security guarantee is enforced in its protocol, whereby the actual platform prevents the operator from acting dishonestly. Three parties must agree to allow OmiseGO's exchange to trade: user, operator/OmiseGO, and exchange. This mechanism allows OmiseGO to provide protection for the exchange.


## Rootchain
The Ethereum root chain. Can be differing in environment, ie. Rinkeby, Ropsten, Mainnet, etc.


## Settlement
Refers to the exchange of payment to the seller and the transfer of securities to the buyer of a trade.
Settlement is the final step in the lifecycle of a securities transaction.
Settlement is similar to PSP (Payment Service Provider), reconciliation reports, and so on. The purpose of the audit layer is to support the integrity of these settlements, to ensure that all data is valid.


## Shared liquidity
Shared liquidity implies that there are a large amount (a pool) of orders. OmiseGO does not offer shared liquidity; instead, OmiseGo allows users to move their funds easily between venues. For example, if OmiseGO offered shared liquidity, Binance and GO.Exchange could see and access the orders of both (it is a shared/combined view of orders).

## Spend transaction
A spend transaction is any transaction that spends a UTXO that is already present on the Plasma chain.  

## Staking
Staking refers to holding a cryptocurrency or token in a wallet for a period of time, in return for interest. Staking returns depend on staking (holding) time; the longer the stake duration, the higher the returns.


## Testnet
A sandbox blockchain environment for developers working on a project prototype.


## Trading protocol
A list of well-defined protocols that determine how communication occurs on an electronic trading platform.


## Token
A digital identity for something that can be owned.


## Trade verifier
An entity in secure settlement that verifies correctness of matching off-chain. The role may be performed by the venue or by a trusted third-party.


## Transactions
In blockchain, a transaction is an exchange of value between two wallets. Transactions are stored in the local ledger using a DEB approach. DEB (Double Entry Bookkeeping) is a system where an entry is created and DEBIT/CREDIT transactions are linked to it. The sum of all debits minus the sum of all credits for a specific entry has to be equal to 0. Summing up all credit transactions minus all debit transactions for a specific balance address and token symbol gives the balance of the address.


## Unstoppable
While this is not a typical technical glossary term, it's important to clarify what we mean when we say that the OMG Network is 'Unstoppable'. We use this term to characterize the OMG Network, because even if OmiseGO (the company) ceased to exist and our servers were shut down, the OMG Network can be restarted. All software required to run the network is open source and freely available, and anyone could restart the OMG Network. Additionally, OmiseGO does not control the OMG token; the token cannot be withdrawn from circulation because the authority key for the contract was destroyed. 


## UTXO
Short for Unspent Transaction Output. See: https://bitcoin.org/en/glossary/unspent-transaction-output


### Valid transaction
A valid transaction is a spend transaction that is valid if it is exitable, canonical, and only stems from valid transactions; that is, all transactions in the history are also valid transactions.

A transaction is thus considered invalid if even a single invalid transaction is present in its history.

An exitable transaction is not necessarily a valid transaction, but all valid transactions are, by definition, exitable.

Our exit mechanism ensures that all outputs created by valid transactions can process before any output created by an invalid transaction. 


## Validator
The person responsible for verifying transactions in a blockchain.


## Venue
An entity that holds the order book and matches orders. Venues may be retail or institutional.
