---
id: version-1.0.0-byzantine-conditions
title: Byzantine Conditions
sidebar_label: Byzantine Conditions
original_id: byzantine-conditions
---

These are Byzantine Conditions that are signals for users to exit the child chain.
 
#### `unchallenged_exit`
Indicates that an invalid exit is dangerously close to finalization and hasn't been challenged and the user should exit.
See docs on [`unchallenged_exit` condition](https://github.com/omisego/elixir-omg/blob/master/docs/exit_validation.md#unchallenged_exit-condition) for more details.
 
```json
{
  "event": "unchallenged_exit",
  "details": {
    "amount": 12000000000000000000,
    "currency": "0x0000000000000000000000000000000000000000",
    "eth_height": 899,
    "name": "unchallenged_exit",
    "owner": "0x37d5c1fbfa32b6582b425d5ea8d724478dac0aee",
    "root_chain_txhash": "0x5ebfbd6caff8d53e74590a646ffa5018e8776445c78ed735e29bdb52e55edd9c",
    "utxo_pos": 2001000000000
  }
}
```
 
#### `invalid_block`
Indicates that an invalid block has been added to the chain. A block is considered to be invalid when there is something wrong with a block received by the child chain. Including a situation where the root hash of the transactions in a block that has been submitted to the root chain does not match with the content of the block found on the child chain's API. The user should exit.
 
```json
{
  "event": "invalid_block",
  "details": {
    "blockhash"  : "0x0017372421f9a92bedb7163310918e623557ab5310befc14e67212b660c33bec",
    "blknum"  : 10000,
    "error_type": "tx_execution"
  }
}
```
 
#### `block_withholding`
Indicates that the child chain is withholding a block whose hash has been published on the root chain and is not available via the child chain's API. The user should exit.
 
```json
{
  "event": "block_withholding",
  "details": {
    "hash"  : "0x0017372421f9a92bedb7163310918e623557ab5310befc14e67212b660c33bec",
    "blknum"  : 10000
  }
}
```