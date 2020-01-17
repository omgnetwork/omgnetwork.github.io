---
id: challenges
title: Challenging Exits
sidebar_label: Challenging Exits
---

The process of challenging exits takes place during a challenge period after an exit has been started. The challenge period exists to provide time for other users to disprove the canonicity of the transaction if the transaction is dishonest. Based on the type of exit, the finalization time may differ.

## Finalization Time

All exits must wait at least the Minimum Finalization Period (MFP), to always have the challenge period. 

Freshly exited UTXOs must wait an additional Required Exit Period (REP), counting from their submission to the root chain contract. 

Example values for these exit waiting periods:  
MFP - 1 week  
REP - 1 week

This table describes the scheduled finalization time calculation for different types of exits: 

| Exit type | Scheduled finalization time (SFT) |
|   ---     |   ---     |
| Regular exits | SFT = max(exit_request_block.timestamp + MFP, utxo_submission_block.timestamp + MFP + REP) |
| In-flight exits   | exitable_at = max(exit_request_block.timestamp + MFP, youngest_input_block.timestamp + MFP + REP) |
| Deposits  |   The exit priority for deposits is elevated to protect against malicious operators:   SFT = max(exit_request_block.timestamp + MFP, utxo_submission_block.timestamp + MFP) |

This table describes the configuration parameters for the Scheduled Finalization Time (SFT): 

| Parameter | Description |
|   ---     |   ---     |
| exit_request_block  | The root chain block where the exit request is mined. |
| utxo_submission_block | The root chain block where the exiting UTXO was created in a child chain block. |
| youngest_input_block  | The root chain block where the youngest input of the exiting transaction was created. |

We can look to `omg-js` to abstract this behavior and tell us how long we have to wait with some of the information we have from the exit process. Behind the scenes, these functions are calling the `Payment Exit Game` contract as well as retrieving the minimum exit period defined on the `Plasma Framework` contract. Based on different rules set on exit priority (as explained in the table above), the scheduled finalization time is calculated.

```js
rootChain.getExitTime({
  exitRequestBlockNumber: exitTransactionReceipt.blockNumber,
  submissionBlockNumber: exitingUtxo.blknum
})
```

This function will return the scheduled finalization unix time and the milliseconds until that time. 
Only when this time has passed, can we [process the exit](process-exits) and release the funds.

## Byzantine Events
The Watcher provides a useful utility of alerting byzantine behavior on the OMG Network. Users can use this information to decide whether they should exit or challenge the event.

These events are reported in the Watcher's `/status.get` endpoint providing an array of byzantine events.

```js
childChain.status()
```

## Challengeable Events
These are byzantine events reported where further action by users of the network are required.

#### invalid_exit
Indicates that an invalid exit is occurring. It should be challenged.

```json
{
    "event": "invalid_exit",
    "details": {
        "eth_height"  : 3521678,
        "utxo_pos"  : 10000000010000000,
        "owner"  : "0xb3256026863eb6ae5b06fa396ab09069784ea8ea",
        "currency"  : "0x0000000000000000000000000000000000000000",
        "amount" : 100
    }
}
```

**Scenario**
Alice attempts to steal tokens from the child chain.

* Alice sends Bob tokens on the child chain.
* Alice attempts to exit those same tokens.

**Solution**

To prevent the theft of tokens on the child chain, Alice's invalid exit can be challenged:

* When Alice starts an exit she must put up an exit bond and wait for the challenge period for the exit to be finalized.

* Meanwhile, the Watchers report that Alice is attempting to exit tokens that she has already spent.

* Anyone can now challenge Alice’s exit by proving that Alice has already spent the UTXO in a transaction.

* If the challenge is successful, Alice does not exit the tokens and the challenger is awarded the exit bond that Alice put up.


#### noncanonical_ife
Indicates an in-flight exit of a non-canonical transaction has been started. It should be challenged.

```json
{
    "event": "noncanonical_ife",
    "details": {
        "txbytes": "0xf3170101c0940000..."
    }
}
```

Event details:

Attribute | Type | Description
--------- | ------- | -----------
txbytes | Hex encoded string | The in-flight transaction that the event relates to

#### invalid_ife_challenge
Indicates a canonical in-flight exit has been challenged. The challenge should be responded to.

```json
{
    "event": "invalid_ife_challenge",
    "details": {
        "txbytes": "0xf3170101c0940000..."
    }
}
```

Event details:

Attribute | Type | Description
--------- | ------- | -----------
txbytes | Hex encoded string | The in-flight transaction that the event relates to

#### invalid_piggyback
Indicates an invalid piggyback is in process. Should be challenged.

```json
{
    "event": "invalid_piggyback",
    "details": {
        "txbytes": "0xf3170101c0940000...",
        "inputs": [1],
        "outputs": [0]
    }
}
```

Event details:

Attribute | Type | Description
--------- | ------- | -----------
txbytes | Hex encoded string | The in-flight transaction that the event relates to
inputs | Integer array | A list of invalid piggybacked inputs
outputs | Integer array | A list of invalid piggybacked outputs

## Unchallengeable Events
These are byzantine events that are signals for users to exit the Childchain.

#### unchallenged_exit
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

#### invalid_block
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

#### block_withholding
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

## Other Events
These are events that do not require any action on the users of the network and are not signals of an unhealthy Childchain.

#### piggyback_available
Indicates an in-flight exit has been started and can be piggybacked. If all inputs are owned by the same address, then `available_inputs` will not be present.
This event is reported only for in-flight exits from transactions that have not been included in a block.
If input or output of exiting transaction is piggybacked it does not show up as available for piggybacking.
When in-flight exit is finalized, transaction's inputs and outputs are not available for piggybacking.

```json
{
    "event": "piggyback_available",
    "details": {
        "txbytes": "0xf3170101c0940000...",
        "available_outputs" : [
            {"index": 0, "address": "0xb3256026863eb6ae5b06fa396ab09069784ea8ea"},
            {"index": 1, "address": "0x488f85743ef16cfb1f8d4dd1dfc74c51dc496434"},
        ],
        "available_inputs" : [
            {"index": 0, "address": "0xb3256026863eb6ae5b06fa396ab09069784ea8ea"}
        ],
    }
}
```

Event details:

Attribute | Type | Description
--------- | ------- | -----------
txbytes | Hex encoded string | The in-flight transaction that the event relates to
available_outputs | Object array | The outputs (index and address) available to be piggybacked
available_inputs | Object array | The inputs (index and address) available to be piggybacked
