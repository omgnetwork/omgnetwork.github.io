---
id: multibaas
title: MultiBaas by Curvegrid
sidebar_label: MultiBaas
---

*By the end of the guide you should know how to interact with Ethereum smart contracts using MultiBaas tool provided by [Curvegrid](https://curvegrid.com/).*

### Goals

You should use this guide if you need to accomplish one of the following goals:
- Mint (issue / generate) ERC20 tokens.
- Burn (destroy) ERC20 tokens.
- Deposit ERC20 tokens to the OMG Network.

### Prerequisites

1. Chrome or Brave browser.
2. [MetaMask](https://MetaMask.io/download.html) wallet extension with $5-$10 worth of ETH.
3. Basic understanding of Ethereum blockchain.

### Overview

Traditionally, minting and managing ERC20 tokens involves help from a blockchain engineer that understands smart contracts. However, the goal of the OMG Network is to eliminate this barrier and deliver a product that can be used by any enterprise client. 

That's why we partnered with [Curvegrid](https://www.curvegrid.com/) to provide an easy solution for software companies that plan on working with the Ethereum blockchain and the OMG Network. Curvegrid platform offers a rich REST API for developers, as well as an intuitive administrative panel to manage various smart contracts for regular users.

This guide demonstrates how users/admins can use the latter option to manage ERC20 tokens.

### Issue ERC20 Tokens

To issue ERC20 tokens using MultiBaas use the following steps:

1. Create a [Curvegrid account](https://console.curvegrid.com/signup).
2. Select `CONTRACTS -> Contracts` menu and choose `Mlti Token` contract:

![](/img/multibaas/01.png)

3. Select `DEPLOY / LINK CONTRACT`:

![](/img/multibaas/02.png)

4. Fill the parameters for your new token.

The values of the Parameters have the following descriptions:
- Label - an internal label inside of the MultiBaas panel of the current contract. You may leave a default option or change it to the name of your token.
- Owner - a public address (public key) of the owner of the Ethereum wallet that will issue and manage the tokens later.
- Name - the name of your token (e.g. Morty).
- Symbol - a short symbol of your token, usually it's 3-5 capitalized characters (e.g. MRTY or MRT).
- Decimals - token's precision after a comma. You can put up to 18 decimal points (used by default). We do recommend to use this option only if you're planning to send smaller amounts of tokens (e.g if you put 2 decimals, you will have a chance to send 4.25 tokens).

![](/img/multibaas/03.png)

5. Select an address to sign your transaction.

When you're using MultiBaas the first time, you need to add a public key of the MetaMask wallet you will use to sign all of the transactions for your token. If you haven't set up a MetaMask wallet yet, feel free to use [this guide](/3rd-party/metamask#install-metamask).

To sign a transaction, click `select an address` on the right side of the `DEPLOY` button. This will automatically offer a public key of the currently used MetaMask wallet. If the address is correct, press the `+` button as follows:

![](/img/multibaas/04.png)

Then, add a label for your wallet (e.g. admin, moderator, core, test, etc):

![](/img/multibaas/05.png)

6. Deploy the contract.

Finally, select the address that you've just added, and click the `DEPLOY`. This will prompt a MetaMask popup. Press `Confirm` and wait for a few seconds:

![](/img/multibaas/07.png)

If a transaction is successful, you will see the following confirmation message:

![](/img/multibaas/08.png)

7. Verify the result.

Congratulations, you've just created your first ERC20 token. To verify that the token was created, copy the contract address and paste it into [Etherescan](https://etherscan.io). 

8. Change the total supply of your token.

The last step is to change the total supply of your token. First, select Mlti Token contract on the left sidebar and choose your token as follows:

![](/img/multibaas/09.png)

Then, scroll to the `Mint` method, enter the number of tokens you want to issue, and click `SEND METHOD`. This will prompt a MetaMask pop up that you need to confirm:

![](/img/multibaas/10.png)

After confirming a transaction, you will see the following confirmation message:

![](/img/multibaas/11.png)

To verify that the total supply was changed, copy a transaction hash to the [Etherscan](https://etherscan.io/), and select the token name to view its details as follows:

![](/img/multibaas/12.png)

> Note, you need to choose the correct network when working with the blockchain explorer. This guide demonstrates the token issuance on the Ropsten network. 

You can also check the total supply in the MultiBaas account of the Mlti Token page:

![](/img/multibaas/13.png)

### Burn ERC20 Tokens

Burning tokens event takes a defined number of tokens out of circulation. The procedure is similar to tokens' issuing. 

First, open the `Mltitoken` page and select your token. Then, enter the number of tokens to burn, and press `SEND METHOD`. This will prompt a MetaMask popup that you need to confirm:

![](/img/multibaas/14.png)

After confirming a transaction, you will see the following confirmation message:

![](/img/multibaas/15.png)

You can verify the result by checking token's details on [Etherscan](https://etherscan.io/) or your MultiBaas page:

![](/img/multibaas/16.png)