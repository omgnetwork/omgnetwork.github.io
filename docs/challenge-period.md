---
id: challenge-period
title: Challenge Period
sidebar_label: Challenge Period
---

The scheduled finalization time is the time when the challenge period of an exit expires and the exit can be processed. The calculation of this time will differ depending on a few variables. All exits must wait at least the Minimum Finalization Period (MFP). This is hard coded into the `Plasma Framework` contract. Freshly exited UTXOs must wait an additional Required Exit Period (REP), counting from their submission to the root chain contract.

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

We can look to `omg-js` to abstract this calculation and tell us how long we have to wait with some of the information we have from the exit process. Behind the scenes, these functions are calling the `Payment Exit Game` contract as well as retrieving the minimum finalization period defined on the `Plasma Framework` contract. Based on different rules set on exit priority (as explained in the table above), the scheduled finalization time is calculated.

```js
rootChain.getExitTime({ exitRequestBlockNumber, submissionBlockNumber })
```

This function will return the scheduled finalization unix time and the milliseconds until that time. 
Only when this time has passed, can we [process the exit](process-exits) and release the funds.