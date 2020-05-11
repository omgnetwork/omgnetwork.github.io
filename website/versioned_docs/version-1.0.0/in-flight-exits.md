---
id: version-1.0.0-in-flight-exits
title: Start an In-flight Exit
sidebar_label: Start an In-flight Exit
original_id: in-flight-exits
---

Exits allow a user to withdraw funds from the OMG Network back onto the root chain. There are two types of exit: standard exits and in-flight exits (IFEs). This section will cover in-flight-exits.

A transaction is considered to be “in-flight” if it has been broadcasted but has not yet been included in the child chain. It may also be in-flight from the perspective of an individual user if that user does not have access to the block where the said transaction is included.

A user may consider an exit _in-flight_ in the following scenarios:
- The user has signed and broadcast a transaction, but is unable to verify its inclusion in a block.
- The user can see that the transaction has been included in a block, but believes that the block is invalid due to a dishonest operator.

The user can initiate an IFE regardless of whether the above is correct, but one must commit an [`exit bond`](exitbonds). The purpose of the `exit bond` is to deter users from initiating exits dishonestly, as this bond will be awarded to any party who successfully proves that the exit is dishonest.

## Implementation

For starting an in-flight exit, the following steps are needed:

1. Get the in-flight exit data.
2. Start the in-flight exit.
3. Piggyback the selected inputs or outputs.

> The in-flight exit process is the same for both ETH and ERC20 UTXOs. The tutorial shows how to work with ERC20 tokens. For working with ETH, change `0xd74ef52053204c9887df4a0e921b1ae024f6fe31` value (ERC20 contract) into `OmgUtil.transaction.ETH_CURRENCY`.

### Example

<!--DOCUSAURUS_CODE_TABS-->
<!-- JavaScript (ESNext) -->
```js
async function startInflightExit() {
  // check if the exit queue exists for a given token
  const hasToken = await rootChain.hasToken(
    "0xd74ef52053204c9887df4a0e921b1ae024f6fe31"
  );
  if (!hasToken) {
    // add the exit queue for this token if it doesn't exist
    await rootChain.addToken({
      token: "0xd74ef52053204c9887df4a0e921b1ae024f6fe31",
      txOptions: {
        from: "0x0dC8e240d90F3B0d511b6447543b28Ea2471401a",
        privateKey:
          "0xCD5994C7E2BF03202C59B529B76E5582266CEB384F02D32B470AC57112D0C6E7",
      },
    });
  }

  // fetch ETH fee amount from the Watcher
  const allFees = await childChain.getFees();
  const feesForTransactions = allFees["1"];
  const { amount: feeAmount } = feesForTransactions.find(
    (i) => i.currency === OmgUtil.transaction.ETH_CURRENCY
  );

  // construct a transaction body
  const transactionBody = await childChain.createTransaction({
    owner: "0x0dC8e240d90F3B0d511b6447543b28Ea2471401a",
    payments: [
      {
        owner: "0x8b63BB2B829813ECe5C2F378d47b2862bE271c6C",
        currency: OmgUtil.transaction.ETH_CURRENCY,
        amount: "350000000000000",
      },
    ],
    fee: {
      currency: OmgUtil.transaction.ETH_CURRENCY,
    },
  });

  // sanitize transaction into the correct typedData format
  // the second parameter is the address of the RootChain contract
  const typedData = OmgUtil.transaction.getTypedData(
    transactionBody.transactions[0],
    "0x96d5d8bc539694e5fa1ec0dab0e6327ca9e680f9"
  );

  // define private keys to use for transaction signing
  const privateKeys = new Array(
    transactionBody.transactions[0].inputs.length
  ).fill("0xCD5994C7E2BF03202C59B529B76E5582266CEB384F02D32B470AC57112D0C6E7");

  // locally sign typedData with passed private keys, useful for multiple different signatures
  const signatures = childChain.signTransaction(typedData, privateKeys);

  // return encoded and signed transaction
  const signedTxn = childChain.buildSignedTransaction(
    typedData,
    signatures
  );

  // get the in-flight exit data
  const exitData = await childChain.inFlightExitGetData(
    OmgUtil.hexPrefix(signedTxn)
  );

  // start the in-flight exit
  const exitReceipt = await rootChain.startInFlightExit({
    inFlightTx: exitData.in_flight_tx,
    inputTxs: exitData.input_txs,
    inputUtxosPos: exitData.input_utxos_pos,
    inputTxsInclusionProofs: exitData.input_txs_inclusion_proofs,
    inFlightTxSigs: exitData.in_flight_tx_sigs,
    txOptions: {
      privateKey:
        "0xCD5994C7E2BF03202C59B529B76E5582266CEB384F02D32B470AC57112D0C6E7",
      from: "0x0dC8e240d90F3B0d511b6447543b28Ea2471401a",
    },
  });

  // decode the transaction to get the index of Alice's output
  const outputIndex = transactionBody.transactions[0].outputs.findIndex(
    (e) => e.owner === "0x0dC8e240d90F3B0d511b6447543b28Ea2471401a"
  );

  // piggyback onto the in-flight exit
  await rootChain.piggybackInFlightExitOnOutput({
    inFlightTx: exitData.in_flight_tx,
    outputIndex: outputIndex,
    txOptions: {
      privateKey:
        "0xCD5994C7E2BF03202C59B529B76E5582266CEB384F02D32B470AC57112D0C6E7",
      from: "0x0dC8e240d90F3B0d511b6447543b28Ea2471401a",
    },
  });

  return exitReceipt;
}
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Lifecycle

1. A user calls the `hasToken` function on the `PlasmaFramework` contract to check if there's an exit queue for the token in question. If no exit queue is registered, a user needs to register it using the `addToken` function. The corresponding `PlasmaFramework` contract functions used in this step are `hasExitQueue` and `addExitQueue`. This step is optional but it was included because it prevents from any potential issues a user may encounter during an exit.
2. A user calls the `inFlightExitGetData` function on the Watcher to get the necessary exit data to start a standard exit. A transaction is termed exitable if it is correctly formed and properly signed by the owner(s) of the transaction input(s).
3. A user calls the `startInFlightExit` function on the `PaymentExitGame` contract and commits an [exit bond](exitbonds) to the exit.
4. A user calls the `piggybackInFlightExitOnInput` or `piggybackInFlightExitOnOutput` function on the `PaymentExitGame` contract to piggyback on in-flight exit input or output call. Such a process is required for every in-flight exit before proceeding to the processing stage.
5. After a [challenge period](challenge-period) a user can [process](process-exits) this exit.

> You can only exit one UTXO at a time. It is therefore recommended to [merge your UTXOs](managing-utxos) if you would like to exit multiple ones.

### Piggybacking

Once an in-flight exit is initiated, the Watcher emits a `piggyback_available` event. 

```json
{
  "event": "piggyback_available",
  "details": {
    "txbytes": "0xf3170101c0940000...",
    "available_outputs" : [
      {"index": 0, "address": "0xb3256026863eb6ae5b06fa396ab09069784ea8ea"},
      {"index": 1, "address": "0x488f85743ef16cfb1f8d4dd1dfc74c51dc496434"},
    ],
    "available_inputs" : [
      {"index": 0, "address": "0xb3256026863eb6ae5b06fa396ab09069784ea8ea"}
    ],
  }
}
```

This means that a user can `piggyback` onto the in-flight exit. This requires placing a `piggyback bond` on a UTXO from the available set in order to claim ownership and receive it on the root chain once the exit is finalized.

To successfully withdraw an output `out` to a transaction `tx`, a transaction `tx` must prove that transaction is both [exitable](glossary#exitable-transaction) and [canonical](glossary#canonical-transaction).

There are specific scenarios when a user wants to exit the inputs in a **non-canonical** transaction. It must be established that the transaction is indeed non-canonical for this to be successful. Because a transaction is either canonical or non-canonical, you can withdraw either its inputs or outputs, not both.

The owner of an input can `piggyback` with the following call:

<!--DOCUSAURUS_CODE_TABS-->
<!-- JavaScript (ESNext) -->
```js
rootChain.piggybackInFlightExitOnInput({
  inputIndex,
  inFlightTx: exitData.in_flight_tx,
  txOptions: {
    from: "0x0dC8e240d90F3B0d511b6447543b28Ea2471401a",
    privateKey: "0xCD5994C7E2BF03202C59B529B76E5582266CEB384F02D32B470AC57112D0C6E7"
  }
})
```
<!--END_DOCUSAURUS_CODE_TABS-->

## Demo Project

This section provides a demo project that contains a detailed implementation of the tutorial. If you consider integrating with the OMG Network, you can use this sample to significantly reduce the time of development. It also provides step-by-step instructions and sufficient code guidance that is not covered on this page.

### JavaScript

For running a full `omg-js` code sample for the tutorial, please use the following steps:

1. Clone [OMG Samples](https://github.com/omisego/omg-samples) repository:

```
git clone https://github.com/omisego/omg-samples.git
```

2. Create `.env` file and provide the [required configuration values](https://github.com/omisego/omg-samples/tree/master/omg-js#setup).

3. Run these commands:

```
cd omg-js
npm install
npm run start
```

4. Open your browser at [http://localhost:3000](http://localhost:3000). 

5. Select [`Start an In-flight ETH Exit`](https://github.com/omisego/omg-samples/tree/master/omg-js/app/05-exit-inflight-eth) on the left side, observe the logs on the right.

> Code samples for all tutorials use the same repository — `omg-samples`, thus you have to set up the project and install dependencies only one time.
