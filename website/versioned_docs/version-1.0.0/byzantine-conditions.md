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
    "eth_height"  : 3521678,
    "utxo_pos"  : 10000000010000000,
    "owner"  : "0xb3256026863eb6ae5b06fa396ab09069784ea8ea",
    "currency"  : "0x0000000000000000000000000000000000000000",
    "amount" : 100
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