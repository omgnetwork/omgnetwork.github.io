---
id: send-your-first-transaction
title: Send your First Transaction
sidebar_label: Send your First Transaction
---

> If you haven't already, open the [browser wallet]() in another tab and follow along with this guide. You will be prompted to enable your web3 wallet if you haven't done so already.

> The browser wallet is deployed against the [Pre-lumphini Network environment](network-connection-details.md).

## Fund Rootchain Wallet
Before we can transact on the OMG Network, we first have to make sure that we have ETH on the Rootchain (Ethereum's Rinkeby test network).
1. If you need some Rinkeby ETH, you can easily send yourself some using [this faucet](https://faucet.rinkeby.io/). Please follow the instructions on their website.
2. Make sure that your web3 wallet is pointing to the Rinkeby network, or else you will not see your balance update.
3. Click **Refresh**. The Rinkeby ETH that you own displays in your account. Make sure this exists before continuing.

## Make a Deposit

The first step in interacting with the OMG Network is to deposit ETH into the network. 

1. Click **Deposit**.
2. Define the amount you wish to deposit, in Wei. Make sure you have more than this amount in your Rootchain wallet (to cover gas costs).
3. Click **OK**. Your web3 wallet should pop up and ask you to confirm the transaction.
4. Click **Confirm**. By confirming the transaction, you are signing the transaction with your private key and sending it to the OMG Network. You may need to wait for around 2-3 minutes for the deposit to complete, depending on network congestion.
5. Click **Refresh**. If the deposit was successful, you should see your OMG Network balance update.
6. Congratulations! 🎉 A deposit UTXO was created and you now have funds on the OMG Network!

> When you perform a deposit, you are sending funds to the Plasma Framework contract and creating a deposit UTXO for your account. With this new UTXO, you will later be able to transfer funds on the OMG Network. For a further discussion on understanding what is a UTXO, you can check out [this documentation]().

## Make a Transaction

Now that you have funds on the OMG Network, you can make your first transaction.

1. Click **Transfer**.
2. Fill out the amount you wish to transfer, and the recipient's address. The recipient address can be another wallet you own.
3. Click **OK**. Your web3 wallet will pop up and ask you to confirm the transaction.
4. Verify the inputs and outputs of your transactions to ensure they're accurate.
5. Click **Confirm**. After a few moments, your OMG Network balance should update.
6. You've sent your first transaction using Plasma! 🎊 

> To view the status of your transaction, retrieve the txhash and search for the hash via the [Block Explorer](https://quest-pre-lumphini.omg.network/) to view the transaction details.

## Start a Standard Exit

You've successfully deposited and made a transfer on the OMG Network. If you want to exit some funds from the OMG Network back to the Rootchain, you would do this with a standard exit.

1. Click **Exit**.
2. Select the UTXO that you would like to exit.
3. Click **OK**. Your web3 wallet will pop up and ask you to confirm the transaction.
4. If the transaction was successful, you have started a standard exit. You will have to wait for the challenge period to pass before being able to process your exit, releasing the funds back to you.

You've performed an end-to-end process of transacting on the OMG Network.
