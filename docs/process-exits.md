---
id: process-exits
title: Process Exits
sidebar_label: Process Exits
---

Exits can be processed only after an exit has gone through the required challenge period. 
Since exits are processed in queues, we need to have a way to clear this queue to release funds back on the Rootchain.

To better understand this mechanism, consider this example:
1. You start a standard exit and wait for the required challenge period.
2. Your exit is placed 5th in the ETH exit queue (since every token will have their own exit queue).
3. To release your funds back to the Rootchain, you would need to process exits 1-4 before you can process your exit in the 5th position.

## Implementation
`omg-js` provides a general way to process exits in blocks, with `maxExitsToProcess` defining how many exits in the queue we would like to process. Under the hood, this is a direct call to `processExits()` on the Plasma framework contract.

```js
async function processEthExits () {
  const processExitReceipt = await rootChain.processExits({
    token,
    exitId: 0,
    maxExitsToProcess: 20,
    txOptions: {
      from: Alice,
      privateKey: AlicePrivateKey
    }
  })
}
```