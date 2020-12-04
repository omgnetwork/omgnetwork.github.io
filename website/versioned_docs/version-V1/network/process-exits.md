---
id: version-V1-process-exits
title: Process an Exit
sidebar_label: Process an Exit
original_id: process-exits
---

Processing an exit allows a user to release their funds locked in the `Plasma Framework` contract. Any exit bonds from the exit game are also paid out at this time.

## Implementation

### 1. Install [`omg-js`](https://github.com/omgnetwork/omg-js)

To access network features from your application, use our official libraries:

<!--DOCUSAURUS_CODE_TABS-->

<!-- Node -->

Requires Node >= 8.11.3 < 13.0.0

```js
npm install @omisego/omg-js
```

<!-- Browser -->

You can add `omg-js` to a website using a script tag:

```js
<script src="https://unpkg.com/@omisego/browser-omg-js"></script>
```

<!-- React Native -->

You can easily integrate `omg-js` with React Native projects. First, add this postinstall script to your project's `package.json`:

```js
"scripts": {
    "postinstall": "omgjs-nodeify"
}
```

Then install the react native compatible library:

```js
npm install @omisego/react-native-omg-js
```

<!--END_DOCUSAURUS_CODE_TABS-->

<!--DOCUSAURUS_CODE_TABS-->
<!-- JavaScript (ESNext) -->

### 2. Import dependencies, define constants

Processing exits involves using 2 `omg-js` objects. Here's an example of how to instantiate them:

```js
import Web3 from "web3";
import { RootChain, OmgUtil } from "@omisego/omg-js";

const web3 = new Web3(new Web3.providers.HttpProvider(web3_provider_url));
const rootChain = new RootChain({ web3, plasmaContractAddress });

// define constants
const exitProcess = {
  currency: "0xd92e713d051c37ebb2561803a3b5fbabc4962431",
  maxExits: 1,
  address: "0x8CB0DE6206f459812525F2BA043b14155C2230C0",
  privateKey: "0xCD55F2A7C476306B27315C7986BC50BD81DB4130D4B5CFD49E3EAF9ED1EDE4F7"
}
```

> - `web3_provider_url` - the URL to a full Ethereum RPC node (local or from infrastructure provider, e.g. [Infura](https://infura.io/)).
> - `plasmaContractAddress` - `CONTRACT_ADDRESS_PLASMA_FRAMEWORK` for defined [environment](/environments).

### 3. Process an exit

> Exit processing is the same for both ETH and ERC20 UTXOs. This method demonstrates exit processing for ERC20 funds. If you want to process an ETH exit, change the `currency` value of the `exitProcess` object into `OmgUtil.transaction.ETH_CURRENCY`.

Before you start processing, you can check the exit queue to see how many available exits the OMG Network has at a given moment:

```js
async function processExit() {
  // get exit queue
  const ethQueue = await rootChain.getExitQueue();
  
  if (ethQueue.length) {
    // process exits
    const exitReceipt = await rootChain.processExits({
      token: exitProcess.currency,
      exitId: 0,
      maxExitsToProcess: exitProcess.maxExits,
      txOptions: {
        privateKey: exitProcess.privateKey,
        from: exitProcess.address
      }
    });
    return exitReceipt;
  } else {
    console.log("Exit queue is empty");
  }
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
When a user starts an exit, it's placed in a priority queue that exists for every token. Thus, when processing exits, you are processing the exits for the particular queue of that token.

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

1. Clone [omg-js-samples](https://github.com/omgnetwork/omg-js-samples) repository:

```
git clone https://github.com/omgnetwork/omg-js-samples.git
```

2. Create `.env` file and provide the [required configuration values](https://github.com/omgnetwork/omg-js-samples/tree/master#setup).

3. Run these commands:

```
npm install
npm run start
```

4. Open your browser at [http://localhost:3000](http://localhost:3000). 

5. Select [`Process an ETH Exit`](https://github.com/omgnetwork/omg-js-samples/tree/master/app/05-exit-process-eth) or [`Process an ERC20 Exit`](https://github.com/omgnetwork/omg-js-samples/tree/master/app/05-exit-standard-erc20) on the left side, observe the logs on the right.

> Code samples for all tutorials use the same repository — `omg-js-samples`, thus you have to set up the project and install dependencies only one time.
