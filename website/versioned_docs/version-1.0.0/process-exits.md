---
id: version-1.0.0-process-exits
title: Process an Exit
sidebar_label: Process an Exit
original_id: process-exits
---

Processing an exit allows a user to release their funds locked in the `Plasma Framework` contract. Any exit bonds from the exit game are also paid out at this time.

## Implementation
1. Get the current exit queue.
2. Process defined exit(s).


> Exit processing is the same for both ETH and ERC20 UTXOs. This method demonstrates exit processing for ETH funds. If you want to process an ERC20 exit, change the `token` value to a corresponding smart contract address.

<!--DOCUSAURUS_CODE_TABS-->
<!-- JavaScript (ESNext) -->
```js
async function processExit() {
  // get exit queue
  const ethQueue = await rootChain.getExitQueue();

  // process exits
  const exitReceipt = await rootChain.processExits({
    token: OmgUtil.transaction.ETH_CURRENCY,
    exitId: 0,
    maxExitsToProcess: 5,
    txOptions: {
      privateKey: "0xCD5994C7E2BF03202C59B529B76E5582266CEB384F02D32B470AC57112D0C6E7",
      from: "0x0dC8e240d90F3B0d511b6447543b28Ea2471401a"
    };
  });

  return exitReceipt;
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Lifecycle
1. A user has started an honest exit, the UTXO(s) has passed the challenge period and is ready to be processed.
2. A user calls the `getExitQueue` function to return the current exit queue for a particular token, showing exit ids and details about when each exit can be exited.
3. A user calls the `getStandardExitId` function on the `PlasmaFramework` contract to get the `exitId` in question.
4. A user calls the `processExits` function on the `Plasma Framework` contract to start processing defined exit(s) according to `maxExitsToProcess` that defines how many exits in the queue need to be processed. Note that it is not possible to process exits in the middle of the queue, only from the top of the queue down.
5. The `Plasma Framework` contract releases the funds and the exit bond back to the user.

### Priority Queue
When a user starts an exit, its placed in a priority queue that exists for every token. Thus, when processing exits, you are processing the exits for the particular queue of that token.

Exits are placed in the queue based on priority. The priority is calculated based on [several factors](https://github.com/omgnetwork/plasma-contracts/blob/master/plasma_framework/contracts/src/framework/utils/ExitPriority.sol). Deposit UTXO(s) also have an elevated priority compared to other UTXO(s). Therefore, you can only process your exit if the exits before yours have been processed already.

To better understand this mechanism, consider the following example:
1. Alice starts an honest standard exit and her exit is placed 5th in the ETH exit priority queue.
2. Alice waits for the required challenge period. Since her exit is honest, nobody challenges her exit.
3. Alice's exit is still 5th in the priority queue. Nobody has processed exits 1-4 yet.
4. To release her funds back to the root chain, Alice has a few options:
  - The recommended approach for her is to process exits 1-4 so she can process her exit in the 5th position immediately. It is allowed to process other user's exits, although it will cost you more gas.
  - She can wait for exits 1-4 to be processed by other users so that when her exit reaches the top of the queue, she only has to process her exit.
  -  She can wait for somebody else with a lower priority to process her exit as they want to release their funds immediately.

## Demo Project

This section provides a demo project that contains a detailed implementation of the tutorial. If you consider integrating with the OMG Network, you can use this sample to significantly reduce the time of development. It also provides step-by-step instructions and sufficient code guidance that is not covered on this page.

### JavaScript

For running a full `omg-js` code sample for the tutorial, please use the following steps:

1. Clone [OMG Samples](https://github.com/omgnetwork/omg-samples) repository:

```
git clone https://github.com/omgnetwork/omg-samples.git
```

2. Create `.env` file and provide the [required configuration values](https://github.com/omgnetwork/omg-samples/tree/master/omg-js#setup).

3. Run these commands:

```
cd omg-js
npm install
npm run start
```

4. Open your browser at [http://localhost:3000](http://localhost:3000). 

5. Select [`Process an ETH Exit`](https://github.com/omgnetwork/omg-samples/tree/master/omg-js/app/05-exit-process-eth) or [`Process an ERC20 Exit`](https://github.com/omgnetwork/omg-samples/tree/master/omg-js/app/05-exit-standard-erc20) on the left side, observe the logs on the right.

> Code samples for all tutorials use the same repository — `omg-samples`, thus you have to set up the project and install dependencies only one time.
