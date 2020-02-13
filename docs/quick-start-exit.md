---
id: quick-start-exit
title: Exit Funds
sidebar_label: Exit Funds
---

> If you haven't already, open the [browser wallet](https://omgnetwork-browser-wallet.netlify.com) in another tab and follow along with this guide. You will be prompted to enable your web3 wallet if you haven't done so already.

> The browser wallet is deployed against the [Lumphini Network environment](/network-connection-details).

You've successfully deposited and made a transfer on the OMG Network. If you want to exit your funds from the OMG Network, you would do this with a standard exit.

1. Click **Exit**.
2. Select the UTXO that you would like to exit. In this example we will exit the UTXO worth `890 wei`.

<img src="/img/exit-create.png" width="500">

3. Click **Submit Exit**. Your web3 wallet will pop up and ask you to confirm the transaction.

![exit-sign](/img/exit-sign.png)

4. Click **Confirm**. You may have to wait a little bit for your transaction to be confirmed.
5. If the transaction was successful, you will see the status of your exit transaction under the `Exits` section. You will be temporarily blocked from making other transactions and exits while this transaction is pending.

<img src="/img/exit-status.png" width="500">

6. You will also find the time posted for when you can process this exit. Before this time, your exit is going through the [`Challenge Period`](challenge-period). This is the period of time where other users on the network have the opportunity to challenge your exit if it is dishonest. You will have to wait until this time passes, before being able to [process your exit](process-exits).

<img src="/img/exit-challenge.png" width="500">

> The challenge period for this browser wallet is approximately 10 minutes (will vary depending on various factors as explained [here](challenge-period)).

> To learn more about standard exits, check out the documentation [here](standard-exits).