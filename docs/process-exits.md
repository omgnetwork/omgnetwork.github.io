---
id: process-exits
title: Process Exits
sidebar_label: Process Exits
---

Exits can be processed only after an exit has gone through the required challenge period. 
Since exits are processed in a priority queue, we need to have a way to clear this queue to release funds back on the Rootchain.

To better understand this mechanism, consider this example:
1. You start a standard exit and wait for the required challenge period.
2. Your exit is placed 5th in the ETH exit priority queue.
3. To release your funds back to the Rootchain, you would need to process exits 1-4 before you can process your exit in the 5th position.

Every token will have it's own priority queue. Thus, when processing exits, you are processing the exits for a particular token.
Exits are also placed in the queue based on priority. This is based on when the `UTXO` being exited was spent. The ones spent earlier will have priority and be placed closed to the front of the queue.

## Implementation
`omg-js` provides a general way to process exits in blocks, with `maxExitsToProcess` defining how many exits in the queue we would like to process. Under the hood, this is a direct call to `processExits()` on the `Plasma Framework` contract`.

```js
rootChain.processExits({
  token,
  exitId,
  maxExitsToProcess,
  txOptions: {
    from: Alice,
    privateKey: AlicePrivateKey
  }
})
```