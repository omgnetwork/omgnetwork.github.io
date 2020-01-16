---
id: challenges
title: Challenging Exits
sidebar_label: Challenging Exits
---

The process of challenging exits takes place during a challenge period after an exit has been started. The challenge period exists to provide time for other users to disprove the canonicity of the transaction if the transaction is indeed dishonest. Based on the type of exit, the finalization time may differ.

The table describes the scheduled finalization time for different types of exits: 

| Exit type | Scheduled finalization time (SFT) |
|   ---     |   ---     |
| Regular exits | SFT = max(exit_request_block.timestamp + MFP, utxo_submission_block.timestamp + MFP + REP) |
| In-flight exits   | exitable_at = max(exit_request_block.timestamp + MFP, youngest_input_block.timestamp + MFP + REP) |
| Deposits  |   The exit priority for deposits is elevated to protect against malicious operators:   SFT = max(exit_request_block.timestamp + MFP, utxo_submission_block.timestamp + MFP) |

We can look to `omg-js` to abstract this behavior and tell us how long we have to wait with some of the information we have from the exit process. Behind the scenes, these functions are calling the `Payment Exit Game` contract as well as retrieving the minimum exit period defined on the `Plasma Framework Contract`. Based on different rules set on exit priority (as explained in the table above), the scheduled finalization time is calculated.

```js
rootChain.getExitTime({
  exitRequestBlockNumber: exitTransactionReceipt.blockNumber,
  submissionBlockNumber: exitingUtxo.blknum
})
```

This function will return the scheduled finalization unix time and the milliseconds until that time. 
Only when this time has passed, can we [process the exit](process-exits) and release the funds.