---
id: standard-exits
title: Standard Exits
sidebar_label: Standard Exits
---

Exits provide the ability to exit funds from the OmiseGO Network back onto the Rootchain. There are 2 types of exits, standard exits and in-flight exits. This section will only discuss standard exits.

A standard exit can be performed by a user who has access to the contents of a valid block where their transaction has been included. This implies that the transaction is proven to be exitable.

> The exit protocol forms the crux of the Plasma design. This guide aims to only discuss implementation of these concepts with respect to the OmiseGO Network. If you want a deeper dive of these concepts, further discussion can be found on the [MoreVP Technical Overview](morevp-technical-overview).

> The standard exit process is the same for both ETH and ERC20 UTXOs.

## Implementation
Below are the necessary steps to take when performing a standard exit. Each step is explained in more detail in this guide.

1. Make sure that an exit queue exits for the token in the UTXO being exited.
2. Get the exiting UTXO's information.
3. Start the standard exit.
4. Wait for the challenge period.

## Checking the Exit Queue
Exits are processed in queues. Before starting a standard exit, the exit queue for that token must exist. Calls are made directly to the Plasma framework contract to get this information.

```js
async function checkForExitQueue (tokenAddress) {
  // called to check for the existence of an exit queue
  const queueForTokenExists = await rootChain.hasToken(tokenAddress)

  if (!queueForTokenExists) {
    // add the exit queue for this token if it doesn't exist
    return rootChain.addToken({
      token: tokenAddress,
      txOptions: {
        from: Alice,
        privateKey: AlicePrivateKey
      }
    })
  }
}
```

## Getting UTXO Information
In order to start a standard exit, you first need to retrieve the UTXO information that you want to exit. This can be accomplished with calls to the Watcher. The Watcher is able to return Alice's UTXO information and provide the exit data necessary to start the standard exit.

```js
async function getUTXOInformation () {
  const alicesUtxos = await childChain.getUtxos(Alice)

  // we will naively take Alice's first UTXO for the sake of this example
  return childChain.getExitData(alicesUtxos[0])
}
```

## Starting the Standard Exit
With a valid UTXO and exit data returned from the Watcher, Alice can now start her standard exit. A standard exit involves the `Payment Exit Game` contract, with the initiator of the standard exit commiting an `exit bond`. The purpose of this bond is simply an economic mechanism to incentivize users to act honestly when starting an exit, since the bond will be awarded to any user that can disprove the canonicity of the transaction.

```js
async function startStandardExit () {
  const transactionReceipt = await rootChain.startStandardExit({
    utxoPos: exitData.utxo_pos,
    outputTx: exitData.txbytes,
    inclusionProof: exitData.proof,
    txOptions: {
      from: Alice,
      privateKey: AlicePrivateKey
    }
  })
}
```

> **Helpful Tip**
>
> You can only exit one UTXO at a time. Therefore, it is recommended that you consolidate your UTXOs to reduce the number of exits you'll need to perform. See the [transfer](transfers) guide for further information on merging UTXOs.

## Waiting for the Challenge Period
After successfully starting a standard exit, Alice will have to wait for the challenge period to pass before being able to process and release her funds back to the Rootchain. The challenge period exists to provide time for other users to disprove the canonicity of the transaction if the transaction is indeed dishonest. 

We can look to `omg-js` to give us more information on how long we have to wait with some of the information we already have from the exit process. Behind the scenes, these functions are calling the `Payment Exit Game` contract as well as retrieving the minimum exit period defined on the `Plasma Framework Contract`. Based on different rules set on exit priority (deposits having an elevated exit priority), the scheduled finalization time is calculated.

```js
async function waitForChallengePeriod () {
  const exitId = await rootChain.getStandardExitId({
    txBytes: exitData.txbytes,
    utxoPos: exitData.utxo_pos,
    isDeposit: false
  })
  return rootChain.getExitTime({
    exitRequestBlockNumber: transactionReceipt.blockNumber,
    submissionBlockNumber: alicesUtxos[0].blknum
  })
}
```

This function will return the scheduled finalization unix time and the milliseconds until that time. 
Only when this time has passed, can we [process the exit](process-exits) and release the funds.
