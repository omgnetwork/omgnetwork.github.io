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

## Invalid Exit Example
Alice attempts to steal tokens from the child chain.

**Scenario**

* Alice sends Bob tokens on the child chain.
* Alice attempts to exit those same tokens.

**Solution**

To prevent the theft of tokens on the child chain, Alice's invalid exit can be challenged:

* When Alice starts an exit she must put up an exit bond and wait for the challenge period for the exit to be finalized.

* Meanwhile, the Watchers report that Alice is attempting to exit tokens that she has already spent.

* Anyone can now challenge Alice’s exit by proving that Alice has already spent the UTXO in a transaction.

* If the challenge is successful, Alice does not exit the tokens and the challenger is awarded the exit bond that Alice put up.
