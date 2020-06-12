---
id: version-V1-challenge-period
title: Challenge Period
sidebar_label: Challenge Period
original_id: challenge-period
---

The *Scheduled Finalisation Time (SFT)* is the time when an exit can be processed after its challenge period has passed. 

Any exit must await a *Minimum Finalisation Period (MFP)* from the moment it is initiated. Exits involving fresh UTXOs are additionally subject to a *Required Exit Period (REP)*. Both are set in the `Plasma Framework` contract.

The formal calculation for the SFT is as follows:

| Exit type | Scheduled finalisation time (SFT) |
|   ---     |   ---     |
| Standard exits | `SFT = max(exit_request_block.timestamp + MFP, utxo_submission_block.timestamp + MFP + REP)` |
| In-flight exits   | `SFT = max(exit_request_block.timestamp + MFP, youngest_input_block.timestamp + MFP + REP)` |
| Deposit * | `exit_request_block.timestamp + MFP's`

**&nbsp;Refers to a standard exit on a deposit-generated UTXO.*

*Parameters*:

| Parameter | Description |
|   ---     |   ---     |
| exit_request_block  | The root chain block where the exit request is mined. |
| utxo_submission_block | The root chain block where the exiting UTXO was created in a child chain block. |
| youngest_input_block  | The root chain block where the youngest input of the exiting transaction was created. |

Consider an example whereby the MFP and RFP are set to <u>one week</u> each.

For a standard exit, this would mean that the Scheduled Finalisation Time is one week from the exit transaction if the UTXO is one week old or more, or two weeks from the creation of the UTXO if the UTXO is less than one week old. The same logic would apply to in-flight exits but on the youngest input of the exiting transaction.

For a standard exit on a deposit-generated UTXO, the SFT would be simply one week from the exit transaction.

**Getting the Scheduled Finalisation Time** 

We can look to `omg-js` to abstract this calculation and give us the Scheduled Finalisation Time of an exit.

```js
rootChain.getExitTime({ exitRequestBlockNumber, submissionBlockNumber })
```

Under the hood, this function is calling the `Payment Exit Game` and `Plasma Framework` contracts to apply the logic explained above. It will return the Scheduled Finalisation Time (in Unix) and the milliseconds until that time.