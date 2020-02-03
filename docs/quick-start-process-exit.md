---
id: quick-start-process-exits
title: Process Exits
sidebar_label: Process Exits
---

> If you haven't already, open the [browser wallet](https://omgnetwork-browser-wallet.netlify.com) in another tab and follow along with this guide. You will be prompted to enable your web3 wallet if you haven't done so already.

> The browser wallet is deployed against the [Lumphini Network environment](network-connection-details.md).

You've started a standard exit and the challenge period has passed. Your exit is honest and so nobody had to challenge your exit. You can now process your exit to release your funds back to you.

1. Next to the UTXO you want to process, click **Process Exit**.

<img src="./assets/process-exits-start.png" width="500">

2. Fill out the number of exits you want to process based on the information provided in the modal. In this example, our exit was placed 7th in the ETH exit queue. We will need to process the 6 exits in front of ours, plus our exit to release our funds immediately. If you process a number less than your position in the queue, your exit will not be processed.

<img src="./assets/process-exits-create.png" width="500">

3. Click **Process**. Your web3 wallet will pop up and ask you to confirm the transaction.

![exit-sign](./assets/process-exits-confirm.png)

4. If the transaction was successful, your exit was processed, along with the other 6 exits, and you should have received your funds back.

<img src="./assets/process-exits-confirmed.png" width="500">

Congratulations! You've performed an end-to-end process of transacting on the OMG Network. If you would like to learn more, continue on to the `Integration` section.
