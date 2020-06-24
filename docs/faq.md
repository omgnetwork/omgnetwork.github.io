---
id: faq
title: FAQ
sidebar_label: FAQ
---

Below is a list of frequently asked questions regarding the OMG Network and the behaviors of Plasma.

## What is Plasma?
Plasma is a Layer 2 (i.e. off-chain) scaling solution for Ethereum. Compared to other Layer 2 solutions, Plasma's advantage is that every block on the Plasma (or child) chain is committed to the root chain. This means that if anything goes wrong on the child chain, honest users will always be able to exit the child chain and recover their funds on the root chain.

There are several versions of Plasma, including MoreVP, OMG Network's chosen solution. 
Different versions of Plasma are suited to specific use cases and the operator (OMG Network in this case) typically chooses the most suitable version for their scenario. From the users’ perspective, all versions of Plasma behave more or less the same.

Plasma is typically used for the following:

* Depositing funds from the root chain (Ethereum) into the child chain.
* Transacting on the child chain (sell, trade, transfer, etc.).
* Exiting remaining funds from the child chain back to the root chain.

Plasma is designed to be somewhat optimistic. It assumes everything is correct unless proven otherwise. Users play their part in ensuring the correctness of the system using the Exit Games.

## What is the Plasma Framework?
The PlasmaFramework contract can be seen as the top-level contract that contains many of the other components described below:
- BlockController
- ExitGameController
- ExitGameRegistry
- VaultRegistry

It provides access to various components in the system. For example, to get the Payment ExitGame you should call `PlasmaFramework.exitGames(PaymentType)`.

The PlasmaFramework also provides the means for the `maintainer` to upgrade the components in the system. This has important security considerations and the PlasmaFramework will emit events whenever a component is added. Watcher must monitor these events and inform users.

## What is a Transaction?
Transactions are composed of inputs and outputs. An input is simply a pointer to the output of another transaction. In the OMG Network, transactions are limited to 4 possible inputs and 4 possible outputs.

Transactions that have been included in a block have a position which is the number of the block it's in and its index in that block. For example, the fourth transaction in block 5000 has a position of `(5000, 3)`.

The position of the outputs of a transaction can be obtained by including the index of the output in the transaction. So the position of the second output of the transaction in the above example would be `(5000, 3, 1)`.

#### Transaction type and output type

Abstract Layer Design introduces the concept of Transaction Type and Transaction Output Type. Each Transaction Type and Transaction Output Type can define different rules about how to spend funds.

#### Transaction format
Transactions follow the [Wire Transaction format](https://docs.google.com/document/d/1ETAO5ZUO7S_A8sXUK5cyAN6yMMotRDbJphAa2hPJIyU/edit).

Briefly, this is:

```
transaction::= transactionType [input] [output] metadata [witness]
```

Where 
```
transactionType::= uint256
input ::= outputId | outputPosition
outputId ::= hash of the transaction that produced the output concatenated with the outputIndex
outputPosition ::= 32 byte string that is (blockNumber * BLOCK_OFFSET + txIndex * TX_OFFSET + outputIndex)
output ::= outputType outputGuard token amount
outputType ::= uint256
outputGuard ::= bytes20
token ::= address
amount ::= uint256
witness ::= bytes
```

Note that currently, we don't fully follow the proposed Wire Transaction format. Our implementation of output type is `outputType outputGuard token amount` instead of `outputType outputGuard token vaultId standardSpecificData confirmAddress`.

The current implementation only supports `Payment` and `DEX` transaction types.
We will need to change this when we introduce new transaction types, e.g. ERC721.

#### Deposit transactions
Deposit transactions are special transactions that have no inputs. Note that this should be encoded as an empty array. Deposit transactions are created by the `Vault` contracts and do not need to be explicitly submitted.

#### EIP-712 signing
The witness field of a transaction is the data that proves its inputs can be spent. For a normal Payment transaction, this data is the signatures of the owners of the inputs. We use [EIP-712](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md) for signing transactions.

The EIP-712 typed data structure is as follows:
```
{
  types: {
    EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'verifyingContract', type: 'address' },
        { name: 'salt', type: 'bytes32' }
    ],
    Transaction: [
        { name: 'txType', type: 'uint256' },
        { name: 'input0', type: 'Input' },
        { name: 'input1', type: 'Input' },
        { name: 'input2', type: 'Input' },
        { name: 'input3', type: 'Input' },
        { name: 'output0', type: 'Output' },
        { name: 'output1', type: 'Output' },
        { name: 'output2', type: 'Output' },
        { name: 'output3', type: 'Output' },
        { name: 'metadata', type: 'bytes32' }
    ],
    Input: [
        { name: 'blknum', type: 'uint256' },
        { name: 'txindex', type: 'uint256' },
        { name: 'oindex', type: 'uint256' }
    ],
    Output: [
        { name: 'outputType', type: 'uint256' },
        { name: 'outputGuard', type: 'bytes20' },
        { name: 'currency', type: 'address' },
        { name: 'amount', type: 'uint256' }
    ]
  },
  domain: {
        name: 'OMG Network',
        version: '1',
        verifyingContract: '',
        salt: '0xfad5c7f626d80f9256ef01929f3beb96e058b8b4b0e3fe52d84f054c0e2a7a83'
    },
  primaryType: 'Transaction'
}
```

## How is the UTXO position calculated?
Formula:

```
block number * the block offset (defaults: `1000000000`) + transaction position * transaction offset (defaults to `10000`) + the index of the UTXO in the list of outputs of the transaction
```

For example, if we have a deposit transaction in block 160000 at index 0, and we want the utxoPos of the output at index 0 (deposit transactions only have one output and no inputs):

```
160000 * 10000 + 0 * 10000 + 0 = 1600000000
```

## What is a Block Explorer?
A block explorer is an online blockchain browser that allows you to explore the entire blockchain of the platform you're using, such as the OMG Network. 

Cryptocurrency miners and users rely on block explorers to track their transactions and to view details for the latest blocks in the blockchain. Block explorers list newly discovered blocks as soon as they're generated, display information for each block and transaction, and allow you to search for transaction IDs and wallet addresses so that you can check on specific transactions.

## I made a deposit but don't have access to a running Watcher. How can I exit my deposit?

To exit a deposit from the OMG Network, you would need to start a standard exit. To start the exit, you first need exit data. You would usually get this data by calling the Watcher.

ie.
```js
childChain.getExitData(utxo)
```

In the unlikely situation where you don't have access to a Watcher, constructing the exit data is still possible as the information needed exists with the deposit transaction. This process has been abstracted away in `omg-js`. You only need to pass the transaction hash from the deposit transaction.

```js
rootChain.getDepositExitData({ transactionHash })
```

This function will return the same data that the Watcher call would have.

You can then start an exit as you would normally.

```js
rootChain.startStandardExit({
  utxoPos: exitData.utxo_pos,
  outputTx: exitData.txbytes,
  inclusionProof: exitData.proof,
  txOptions: {
    from: Alice,
    privateKey: AlicePrivateKey
  }
})
```

## Why does a smaller UTXO set on the OMG Network reinforce the safety of user funds in a mass exit event? 

Consider a scenario whereby a dishonest child chain operator steals user funds by creating an invalid block and then initiates a `Standard Exit` on his UTXOs. In such a scenario, users must exit their UTXOs back to the root chain to safely retain ownership of their funds. 

Because every UTXO requires its exit, a larger number of exiting UTXOs means more exit transactions submitted to the root chain. If this results in network congestion, exiting users could be faced with higher gas fees.

However, users must also exit *before* the dishonest operator does if they are to safely preserve their funds. Failure to do so could mean there is nothing left for them in the `Vault`. If congestion on the root chain reaches a certain level due to the number of exiting UTXOs, users may be prevented from executing an exit on time.

A smaller UTXO set on the child chain can mitigate these vulnerabilities, and thereby reinforce the safety of user funds. For this reason, users are encouraged to merge their UTXOs continuously.

> Due to the mechanics of the [Scheduled Finalisation Time (SFT)](/network/challenge-period), users generally have <u>one week</u> to initiate an exit that can safely restore ownership of their funds. For UTXOs that are less than one week old, however, this window of safety is reduced to the time between the UTXO's creation and the start of the operator's dishonest exit.