---
id: version-1.0.0-quick-start-webwallet
title: Web Wallet Quick Start
sidebar_label: Web Wallet Quick Start
original_id: quick-start-webwallet
---

This guide shows how to perform OMG transactions using a Web Wallet in your browser. 

## Goals
By the end of the guide, you will achieve the following:
- Learn about the OMG Network interface.
- Interact with the OMG Network from end to end.
- Make a deposit, the first transaction, and exit with ETH and ERC20 token via the OMG network.
- Understand and apply the concepts behind Plasma and MoreVP.

## Who is this guide for?
* OMG clients and integration partners.
* Exchanges, wallets, and blockchain services.
* Ethereum Dapps that want cheaper fees and more transactions.
* Cryptocurrency enthusiasts or white hackers who enjoy testing new blockchain products.

## Pre-requisites
* Chrome browser. Other browsers, such as Brave, may have compatibility issues with Web3 wallets.
* Web3 wallet, preferably [MetaMask](https://metamask.io).
* Basic knowledge of blockchain, [Ethereum](https://ethereum.org) and [Plasma](https://docs.omg.network/faq#what-is-plasma).

> Keep your tokens safe. Please ensure you understand how to store and send tokens without compromising security, always double-check the recipient`s address, never send private keys to anyone unless you want to lose your funds.

> The quick start guide uses a hosted application via [react-starter-kit](https://github.com/omgnetwork/react-starter-kit). To run it yourself, check the installation instructions in the repository.

## Wallet Configuration
There are two options to work with the OMG network:
- *Ropsen Testnet* (testnet) - the latest Ethereum test network. The purpose of such an environment is to demonstrate all of the features without using or losing real funds and to find critical bugs before the main launch of the software.
- *Main Ethereum Network* (mainnet) - the latest Ethereum live network. It is recommended to use this option after you've already tried the testnet and are confident in working with a particular wallet.

You can set the preferred configuration in your Web3 wallet. Below you can see an example of Metamask:

<img src="/img/webwallet/metamask-example.png" width="300">

## 1. Make a Deposit
> The current Web Wallet is deployed against the OMG Network v1 Testnet.

### 1.1 Fund Root Chain Wallet

Before transacting on the OMG Network, you need to have ETH tokens on the root chain.

> In Plasma implementation root chain refers to the Ethereum Network. Child chain refers to OMG Network.
 
* For working with testnet, you can get free tokens using [Ropsen faucet](https://faucet.metamask.io).
* If you don't see your balance, make sure that your wallet points to the right network. Use [Wallet Configuration](#wallet-configuration) if you have any problems.
* If everything is correct, your ETH root chain balance should be the same, as your balance in Metamask or another Web3 wallet you are using.

![account-balance](/img/webwallet/quick-start-account-balance.png)

### 1.2 Make an ETH Deposit

1. Click **Deposit**.
2. Define the amount to deposit in ETH. It is recommended to have more funds in your root chain wallet to cover gas costs.
3. Click **Deposit**. You will see a confirmation popup in your Web3 wallet. Notice, this example defaults the gas limit to `6000000` wei.

![sign-deposit](/img/webwallet/quick-start-sign-deposit.png)

4. Click **Confirm**. By doing that, you are signing the transaction with your private key and sending it to the OMG Network. The confirmation process may take a few seconds.
5. After deposit confirmation, click the `Deposits` tab to see the progress of your deposit. You have to wait for the [deposit finality period](https://docs.omg.network/glossary#deposit-finality-period) (currently 10 blocks) before your funds are accepted into the OMG Network. You can click on the transaction to see further details on [Etherscan](https://etherscan.io).

<img src="/img/webwallet/quick-start-deposit-pending.png" width="500">

6. Your child chain balance should be updated in case of a successful deposit. This will also create a deposit UTXO validating that you have ETH on the OMG Network.

<img src="/img/webwallet/quick-start-deposit-confirmed.png" width="500">

### 1.3 Make an ERC20 Deposit

The process for depositing ERC20 into the OMG Network is very similar to an ETH deposit. For this example, we will use `WETH` token.

1. Click **Deposit**.
2. Click on the `ERC20` tab and define the amount and the address of the token you are depositing (in our case the address for `WETH`).

<img src="/img/webwallet/quick-start-deposit-erc20.png" width="500">

3. Click **Deposit**. This step will differ from the ETH deposit, as your Web3 wallet will pop up twice. The first popup will ask you to approve the deposit, the second — to confirm the actual deposit transaction.

![approve-erc20-deposit](/img/webwallet/quick-start-deposit-erc20-confirm.png)

4. Click **Confirm** for both popups. The confirmation process may take a few seconds.
5. After deposit confirmation, click the `Deposits` tab to see the progress of your deposit. You have to wait for the [deposit finality period](https://docs.omg.network/glossary#deposit-finality-period) (currently 10 blocks) before your funds are accepted into the OMG Network. You can click on the transaction to see further details on [Etherscan](https://etherscan.io).

<img src="/img/webwallet/quick-start-deposit-erc20-pending.png" width="500">

6. Your child chain balance should be updated in case of a successful deposit. This will also create a deposit UTXO validating that you have ERC20 tokens on the OMG Network.

<img src="/img/webwallet/quick-start-deposit-erc20-confirmed.png" width="500">

> When you perform a deposit, you are sending funds to the `Plasma Framework` contract and creating a deposit UTXO for your account. The new UTXO allows transferring funds to the OMG Network. To understand UTXO better, please check [UTXO glossary](https://docs.omg.network/glossary#utxo).

> To learn more about deposits, please check [`Deposits`](https://docs.omg.network/deposits) section. 

## 2. Send a Transaction

Now that you have funds on the OMG Network, you can make your first transaction. To accomplish that, use the following steps:
1. Click **Transfer**.
2. Fill out the recipient's address, the amount and name of token you wish to transfer, the fee details, and optionally a message.

<img src="/img/webwallet/quick-start-transfer-create.png" width="500">

3. Click **Transfer**. You will see a confirmation popup in your Web3 wallet.
4. Verify the inputs and outputs of your transactions to ensure they're correct.

![transfer-sign](/img/webwallet/quick-start-transfer-sign.png)

5. Click **Sign**.
6. Click on the `Transactions` tab to view the state of your transaction.

<img src="/img/webwallet/quick-start-transfer-pending.png" width="500">

7. Once the transaction is confirmed, you can click on it to view its details in the block explorer. Your child chain balance should be updated in case of a successful transaction.

<img src="/img/webwallet/quick-start-transfer-success.png" width="500">

8. Congratulate yourself. You've just sent your first transaction on the OMG Network!

>To learn more about transactions, please check [`Transfers`](https://docs.omg.network/transfers) section.

## 3. Exit Funds

### 3.1 Submitting an Exit

You've successfully deposited and made a transfer to the OMG Network. If you want to move your funds from the OMG Network back to Ethereum network, you can do this with a standard exit using the following steps:
1. Click **Exit**.
2. Select the UTXO that you want to exit. The example below shows an exit worth `890 wei`.

<img src="/img/webwallet/exit-create.png" width="500">

3. Click **Submit Exit**. You will see a confirmation popup in your Web3 wallet.

![exit-sign](/img/webwallet/exit-sign.png)

4. Click **Confirm**. The confirmation process may take a few seconds.
5. If the transaction is successful, you will see the status of your exit under the `Exits` section. You will be temporarily blocked from making other transactions and exits while this transaction is pending.

<img src="/img/webwallet/exit-status.png" width="500">

6. To prevent any malicious activity on the network, each exit goes through the [`Challenge Period`](https://docs.omg.network/challenge-period). This allows other users to challenge your exit on validity and trust. You will find the date of your exit approval below the transaction id. You will have to wait until this time passes, before being able to [process your exit](https://docs.omg.network/process-exits).

<img src="/img/webwallet/exit-challenge.png" width="500">

>To learn more about standard exits, please check [`Standard Exits`](https://docs.omg.network/standard-exits) section.

### 3.2 Processing an Exit

After the challenge period has passed, you can process your exit to release your funds back to the root chain. Such a stage means that your exit is honest and nobody has challenged it. To process your exit properly, please follow these steps:

1. Click **Process Exit** next to the UTXO you want to process.

<img src="/img/webwallet/process-exits-start.png" width="500">

2. Fill out the number of exits you want to process based on the information provided in the modal. In the example, our exit was placed 7th in the ETH exit queue. We will need to process the 6 exits before ours, as well as our exit to release funds immediately. If you process a number less than your position in the queue, your exit will not be processed.

<img src="/img/webwallet/process-exits-create.png" width="500">

3. Click **Process**. You will see a confirmation popup in your Web3 wallet.

![exit-sign](/img/webwallet/process-exits-confirm.png)

4. A successful transaction means that your exit along with the other 6 exits was processed. You can now check your balance on Metamask to ensure you received the funds back. 

<img src="/img/webwallet/process-exits-confirmed.png" width="500">

Congratulations! You've performed an end-to-end process of transacting on the OMG Network. If you would like to learn more, continue to the [`Tutorials`](https://docs.omg.network/tutorials-intro) section.

To learn more about process exits, please check [`Process Exits`](https://docs.omg.network/process-exits) section.