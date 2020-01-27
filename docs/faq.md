---
id: faq
title: FAQ
sidebar_label: FAQ
---

Below are a list of frequently asked questions regarding the OMG Network and the behaviors of Plasma.

## What is Plasma?
Plasma is a Layer 2 (i.e. off-chain) scaling solution for Ethereum. Compared to other Layer 2 solutions, Plasma's advantage is that every block on the Plasma (or child) chain is committed to the root chain. This means that if anything goes wrong on the child chain, honest users will always be able to exit the child chain and recover their funds on the root chain.

There are several versions of Plasma, including MoreVP, which is OmiseGO's chosen solution. 
Different versions of Plasma are suited to specific use cases and the operator (OmiseGO in this case) typically chooses the most suitable version for their scenario. From a users perspective, all versions of Plasma behave more or less the same.

Plasma is typically used for the following:

* Depositing funds from the root chain (Ethereum) into the child chain.
* Transacting on the child chain (sell, trade, transfer, etc.).
* Exiting remaining funds from the child chain back to the root chain.

Plasma is designed to be somewhat optimistic - it assumes everything is correct unless proven otherwise. Users play their part in ensuring the correctness of the system by means of the Exit Games.

## What is the Plasma Framework?
The PlasmaFramework contract can be seen as the top-level contract that contains many of the other components described below:
- BlockController
- ExitGameController
- ExitGameRegistry
- VaultRegistry

It provides access to the various components in the system. For example, to get the Payment ExitGame you should call `PlasmaFramework.exitGames(PaymentType)`.

The PlasmaFramework also provides the means for the `maintainer` to upgrade the components in the system. This has important security considerations and the PlasmaFramework will emit events whenever a component is added. Watcher must monitor these events and inform users.

## What is the OMG Network architecture?
The table describes the components of the OMG Network architecture:
| Component | Description |
| ---       | ---         |
| Ethereum  | The root chain. |
| Child chain | Currently, in Proof of Authority mode, there is only one child chain service that implements the child blockchain. It is anticipated that this will change when OMG Network transitions to Proof of Stake. |
| Watcher | A service that monitors the child chain for suspicious activity, such as the operator or any user acting dishonestly. If the watcher discovers suspicious activity, it prompts users to challenge invalid exits, or to exit the child chain. Users can run their own Watcher, but it is also expected that some trusted entity will run Watchers as a service. |

## What is a Transaction?
Transactions are composed of inputs and outputs. An input is simply a pointer to the output of another transaction. 

Transactions that have been included in a block have a position which is the number of the block it's in and its index in that block. For example the fourth transaction in block 5000 has a position of `(5000, 3)`.

The position of the outputs of a transaction can be obtained by including the index of the output in the transaction. So the position of the second output of the transaction in the above example would be `(5000, 3, 1)`.

#### Transaction type and output type

The Abstract Layer Design introduces the concept of Transaction Type and Transcation Output Type. Each Transaction Type and Transcation Output Type can define different rules about how to spend funds.

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

Note that currently we don't fully follow the proposed Wire Transaction format - our implementation of output type is `outputType outputGuard token amount` instead of `outputType outputGuard token vaultId standardSpecificData confirmAddress`.

The current implementation only supports `Payment` and `DEX` transaction types.
We will need to change this when we introduce new transaction types, e.g. ERC721

#### Deposit transactions
Deposit transactions are special transactions that have no inputs. Note that this should be encoded as an empty array. Deposit transactions are created by the Vault contracts and do not need to be explicitly submitted.

#### EIP-712 signing
The witness field of a transaction is the data that proves its inputs can be spent. For a normal Payment transaction this data is the signatures of the owners of the inputs. We use [EIP-712](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-712.md) for signing transactions.

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

## What is a Merkle Tree
TODO

## How is the UTXO position calculated?
Formula:

```
block number * the block offset (defaults: `1000000000`) + transaction position * transaction offset (defaults to `10000`) + the index of the UTXO in the list of outputs of the transaction
```

For example, if we have a deposit transaction in block 160000 at index 0, and we want the utxoPos of the output at index 0 (deposit transactions only have one output, and no inputs):

```
160000 * 10000 + 0 * 10000 + 0 = 1600000000
```
