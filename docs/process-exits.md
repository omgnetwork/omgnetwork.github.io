---
id: process-exits
title: Process Exits
sidebar_label: Process Exits
---

Processing an exit allows a user to release their funds locked in the `Plasma Framework` contract. Any exit bonds from the exit game are also paid out at this time.

## Lifecycle
1. A user starts an honest exit. That exit is placed in a priority queue.
2. The exit must wait for the required challenge period for other users to be able to challenge it, if it is a dishonest exit.
3. When the required challenge period has passed, the user calls `processExits()` on the priority queue.
4. The `Plasma Framework` contract releases the funds and the exit bond back to the user.

## Priority Queue
When a user starts an exit, its placed in a priority queue. Every token will have its own priority queue. Thus, when processing exits, you are processing the exits for the particular queue of that token.

Exits are placed in the queue based on priority. The priority is calculated based on a number of [different factors](https://github.com/omisego/plasma-contracts/blob/master/plasma_framework/contracts/src/framework/utils/ExitPriority.sol). Deposit UTXO's also have an elevated priority compared to other UTXO's. Therefore, you can only process your exit if the exits before yours have been processed already.

To better understand this mechanism, consider the following example:
1. Alice starts an honest standard exit and her exit is placed 5th in the ETH exit priority queue.
2. Alice waits for the required challenge period. Since her exit is honest, nobody challenges her exit.
3. Alice's exit is still 5th in the priority queue. Nobody has processed exits 1-4 yet.
4. To release her funds back to the root chain, Alice has a few options:
  - The recommended approach is for her to processes exits 1-4 so she can process her exit in the 5th position immediately. You are allowed to process other user's exits, although it will cost you more gas.
  - She can wait for exits 1-4 to be processed by other users, so that when her exit reaches the top of the queue, she only has to process her exit.
  -  She can wait for somebody else with a lower priority to process her exit as they want to release their funds immediately.

## Implementation
`omg-js` provides an easy way to process exits, with `maxExitsToProcess` defining how many exits in the queue you would like to process. Note that it is not possible to process exits in the middle of the queue, only from the top of the queue down. Under the hood, this is a direct call to `processExits()` on the `Plasma Framework` contract`.

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

You can also view more information about the queue using the `getExitQueue` call. This will return the current exit queue for a particular token, showing details about when each exit can be exited as well as the exit ids. If you know your exit id, you can use this information to find where your exit is in the queue.

```js
rootChain.getExitQueue(token)
```
