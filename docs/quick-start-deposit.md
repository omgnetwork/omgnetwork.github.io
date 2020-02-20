---
id: quick-start-deposit
title: Make a Deposit
sidebar_label: Make a Deposit
---

> If you haven't already, open the [browser wallet](https://omgnetwork-browser-wallet.netlify.com) in another tab and follow along with this guide. You will be prompted to enable your web3 wallet if you haven't done so already.

> The browser wallet is deployed against the [Lumphini Network environment](/network-connection-details).

## Fund Root Chain Wallet

Before we can transact on the OMG Network, we first have to make sure that we have ETH on the root chain (Ethereum's Ropsten test network).

1. If you need some Ropsten ETH, send yourself some using a [Ropsten faucet](https://faucet.metamask.io/).
2. Make sure that your web3 wallet is pointing to the Ropsten network, or else you will not see your balance.
3. The Ropsten ETH that you own is displayed in your account. Make sure this is the case before continuing.

![account-balance](/img/quick-start-account-balance.png)

## Make an ETH Deposit

1. Click **Deposit**.
2. Define the amount you wish to deposit in wei. Make sure you have more than this amount in your Rootchain wallet to cover gas costs.
3. Click **Deposit**. Your web3 wallet should pop up and ask you to confirm the transaction. Note that this example application defaults the gas limit to `6000000` wei.

![sign-deposit](/img/quick-start-sign-deposit.png)

4. Click **Confirm**. By confirming the transaction, you are signing the transaction with your private key and sending it to the OMG Network. You may have to wait a little bit for your transaction to be confirmed.
5. Once your deposit transaction is confirmed, click the `Deposits` tab to see the progress of your deposit. Before your funds are accepted into the OMG Network, you have to wait for the [deposit finality period](glossary#deposit-finality-period), which is set to 10 blocks. You can click on the transaction to see further details on etherscan.

<img src="/img/quick-start-deposit-pending.png" width="500">

6. If the deposit was successful, you should see your child chain balance update.

<img src="/img/quick-start-deposit-confirmed.png" width="500">

7. A deposit UTXO was created and you now have ETH on the OMG Network.

## Make an ERC20 Deposit

The process for depositing ERC20 into the OMG Network is very similar to an ETH deposit. For these examples, we will be depositing the ERC20 token `WETH`.

1. Click **Deposit**.
2. Click on the ERC20 tab and define the address of the token you are depositing (in this case the address for `WETH`), as well as the amount.

<img src="/img/quick-start-deposit-erc20.png" width="500">

3. Click **Deposit**. This step will differ from the ETH deposit as your web3 wallet will pop up twice. The first popup will ask you to approve the deposit.

![approve-erc20-deposit](/img/quick-start-deposit-erc20-approve.png)

The second popup will ask you to confirm the actual deposit transaction.

![approve-erc20-deposit](/img/quick-start-deposit-erc20-confirm.png)

4. Click **Confirm** for both popups. You may have to wait a little bit for your transaction to be confirmed.
5. Once your deposit transaction is confirmed, click the `Deposits` tab to see the progress of your ERC20 deposit. Before your funds are accepted into the OMG Network, you have to wait for the [deposit finality period](glossary#deposit-finality-period), which is set to 10 blocks. You can click on the transaction to see further details on etherscan.

<img src="/img/quick-start-deposit-erc20-pending.png" width="500">

6. If the deposit was successful, you should see your child chain balance update.

<img src="/img/quick-start-deposit-erc20-confirmed.png" width="500">

7. An ERC20 deposit UTXO was created and you now have some ERC20 on the OMG Network.

> When you perform a deposit, you are sending funds to the `Plasma Framework` contract and creating a deposit UTXO for your account. With this new UTXO, you will later be able to transfer funds on the OMG Network. For a further discussion on understanding what is a UTXO, you can check out [this documentation](glossary#utxo).

> To learn more about deposits, check out the documentation [here](deposits).