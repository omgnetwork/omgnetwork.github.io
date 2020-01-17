---
id: block-explorer-troubleshooting
title: Troubleshooting
sidebar_label: Troubleshooting
---

## Check Network Availability
A color marker on the block explorer toolbar allows you to see whether the Plasma child chain and API (OMG Network) is available, unavailable, or problematic: 
* Green - available
* Amber - problem state; byzantine events detected
* Red - unavailable

![Mainnet available](assets/mainnet-available.png)

## Network Failure

The table desribes events that may cause network failures, and proposed solutions: 

| Event | Description |
| ----------------   | ---  |
| Plasma interaction fails due to not enough gas for the contract calls.  | Retry with higher gas. |
| Network congestion on the root chain extends beyond challenge period. | Challenge with more gas. |
| Users unable to perform exits due to lack of access to watcher data. | Provide users with alternative source of watcher data. Watcher data redundant due to failure or corruption. Try adding multiple watchers in the wild, or user could be reliant on their own or third party's data as well. If child chain is still running, it's possible to run a watcher and be synced up. If the operator has gone down and no watcher is running, user's funds are lost. Operator should keep persistent watcher data even after the chain is gone, and if user funds have not exited. |
| Every user performs a mass exit, causing network congestion. | Wait, or retry with more gas once the network is less congested. |
| Operator unable to submit new blocks. | Retry with more gas. |
| User starts exit, but does not process exit. | Network alerts or prompts user to sign the transaction. |
| User fails to start exit. | Network alerts or prompts user to sign the transaction. |
| Operator's child chain is down. | Wait for the operator to start up new services. |
| Provider's watcher instance is down. | Wait for provider to start new instances of watcher, or rely on third party. |
| Root chain hard forks | All chains (operator and third party) should point to the canonical Ethereum chain. |


## Byzantine Events
This section describes byzantine events that interfere with the health and performance of the OMG Network. When byzantine events are detected, a color indicator adjacent to the network name on the block explorer toolbar changes to amber, indicating that the network is problematic.

Three categories of byzantine events may occur: 
* Dishonest users
* Dishonest operator
* Dishonest venues

### Dishonest user
The table describes how dishonest user events may interfere with the state of the OMG Network: 

| Event | Description | 
| --- | --- |
| Double-spend via simultaneous withdrawal and trade. | Trader has to send a withdrawal notification to venue before withdrawing. |
| Double-spend via exit from deposit transaction and trade on Plasma chain. | Venue can challenge the exit with the output of the trade. |


### Dishonest operator
The table describes how a dishonest operator may interfere with the state of the OMG Network: 

| Event | Description | 
| -------- | ------- |
| Operator produces a block that steals funds and withholds it. | In-flight trade settlements: full tx info is delivered to every trader on every batch. The venue exits to Ethereum, traders have full visibility and do not need to challenge.  |
|          | In-flight deposits: In-flight exit with piggyback on output doable by deposit owner.  |
|       | In-flight withdrawals: Unlikely to occur, unless at least one of venue and operator is dishonest. Venue would help traders exit the trade settlement when operator is dishonest. If the venue is dishonest, traders can have their funds returned by withdrawing properly via honest operator. |




### Dishonest venue
The table describes how a dishonest venue may interfere with the state of the OMG Network: 


| Event | Description | 
| --- | --- |
| Indirect heist via trade against market order, combined with censorship of the order book | Solved by venue committing to the state of order book before learning about its contents |
| Direct heist by transfer to hacker’s address. | Venue cannot spend RC Deposit or Settlement output (Operator will not accept tx) |
| Direct heist by exiting money to Ethereum via standardExit. | Venue cannot exit RC Deposit or Settlement output (only real owner can) |
| Indirect heist via trade based on non-existing orders. The venue fakes “sell this asset really cheap” order and puts itself as a counter-party. | The venue has to provide validity proofs for every batch settlement. Operator checks such settlement before including it into the chain |
| Indirect heist via trade based on non-existing orders, exited via standardExit on Ethereum. | Venue can't use standardExit as operator won't provide inclusionProof. |
| Indirect heist via trade based on non-existing orders, exited via inFlightExit on Ethereum. | The IFE would be challenged and non-existing orders cannot be proved correct. Trader can then withdraw funds. |


