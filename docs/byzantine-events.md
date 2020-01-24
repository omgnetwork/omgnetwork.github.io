## Unchallengeable Events

These are byzantine events that are signals for users to exit the Childchain.

#### `unchallenged_exit`
Indicates that an invalid exit is dangerously close to finalization and hasn't been challenged. User should exit.
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
Indicates that an invalid block has been added to the chain. User should exit.

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
Indicates that the Childchain is withholding a block whose hash has been published on the Rootchain. User should exit.

```json
{
  "event": "block_withholding",
  "details": {
    "hash"  : "0x0017372421f9a92bedb7163310918e623557ab5310befc14e67212b660c33bec",
    "blknum"  : 10000
  }
}
```