---
id: block-explorer-using
title: Using the Block Explorer
sidebar_label: Using the Block Explorer
---

<!-- Links to block explorer
Dev: http://quest-dev.omg.network/
Staging: http://quest-staging.omg.network/ -->


## Search the Block Explorer

This procedure searches the block explorer for specific blocks, transactions, or addresses by their unique identifier, such as a block number, wallet address, or transaction hash.

**Perform these steps**: 
1. Go to the online block explorer at http://quest.samrong.omg.network/.
2. Select the network, either Mainnet or Testnet.
3. In the search field, enter criteria for the data you wish to view; then press **Enter**. 
   You can search by token number, wallet address, block number, or transaction hash: 
   - To view specific transactions for your own wallet or any other address, enter the hash or wallet address. 
   - To view the transaction history of a specific address, enter the wallet address. You'll be able to audit data such as the number of transactions received, and the address balance.
   - To view details for a block, enter the block number. Click the block's hash to view data such as block size, a link to previous blocks, a timestamp for the block's discovery, and individual transactions on the block. You can toggle between a transaction and the one that preceded it (and which gave the current transaction its inputs).

  


## View Transactions
This procedure displays a list of recent transactions on the OmiseGO Network.

**Perform these steps**:

1. Go to the online block explorer at http://quest.samrong.omg.network/.

2. Select the network.

3. On the navigation bar, click **Transactions**. 

4. On the **Transactions** page, view the transaction feed; then, filter search results by date and time range, and status (Success and/or Failed).

 > The transaction feed displays transactions in recently mined blocks.

  ![Filter transactions](assets/transactions-filtered.png)
  
5. Click on any transaction you wish to inspect. View transaction data, including:
  * The wallet address of the sender and recipient
  * The total amount transferred, based on input
  * The metadata field (an encoded hex value)

  
  ![Transaction details](assets/transaction-details.png)
  

## View Blocks
This procedure displays blocks added to the OmiseGO Network.

**Perform these steps**:

1. Go to the online block explorer at http://quest.samrong.omg.network/.

2. Select the network.

3. On the navigation bar, click **Blocks**.

6. On the navigation bar, click **Blocks** to view a list of recent blocks; then, filter search results. 

7. Click on a block you wish to inspect. View block data, including:
   * Block size
   * Hash of the child chain and the root chain
   * Total number of transactions on the block
   * Most recent transaction data on the block
   
   ![Block details](assets/block-details.png)


## View Addresses
This procedure displays all wallet addresses transacting on the OmiseGO Network.

**Perform these steps**:

1. Go to the online block explorer at http://quest.samrong.omg.network/.

2. Select the network.

3. On the navigation bar, click **Addresses** to view a list of wallet addresses; then, filter search results. 

4. Click on an address you wish you inspect. View data for this wallet address, including: 
    * Total number of transactions associated with this wallet address
    * Balance of each currency held in the wallet address
    * A list of transactions associated with this wallet address
    * The value of each transaction
    * Whether the transaction value was received (IN) or sent (OUT)
   
   ![Address Details - Transactions tab](assets/BE_address-details-UTXO-history.png)
   
   


## View UTXO Details
This procedure displays details for a UTXO. 

<!-- MIGHT NEED MORE CONTEXT HERE -->

**Perform these steps**:

1. Go to the online block explorer at http://quest.samrong.omg.network/.

2. Select the network.

3. In the search field, enter one of the following criteria to find the UTXO you wish to inspect: 
   * Block number
   * Transaction number
   * Input index
   * Output index

4. Press ***Enter***.

5. On the **UTXO History** tab of the **Address Details** page, the UTXO matching the criteria you specified displays by default, showing Inputs and Outputs for the transaction associated with the UTXO, and deposit and exit statuses. 

   > ***Note**: A UTXO participates in only one transaction. An Input UTXO goes into a transaction, and then becomes one or more (maximum four) new Output UTXOs. Each Output has an address, and an amount.*

   * For UTXOs with only deposit and an exit, there is no transaction data because no transaction has occurred. 

   * For UTXOs created via a Plasma transaction, there is no deposit data.

   * For UTXOs spent on a transaction, there is no exit data because the Input UTXO becomes one or more new Output UTXOs.
   


## Send a Transaction to the Blockchain
This procedure sends funds. 

<!-- STILL TO COMPLETE THE SEND TRANSACTION STEPS -->

***Note**: The full process for a fund transfer on the blockchain may take around 10-30 minutes.*

**Perform these steps:** 
1. Create a transaction in your wallet with your private key. 

   * Transaction is broadcast to the node (a server containing a full record of transactions on the blockchain)
   * Transaction reaches the node and is automatically added to the mempool (the pool of transactions waiting for confirmation).
   * Other nodes see the transaction. The transaction becomes visible on the block explorer.
   * Transaction status is *Unconfirmed*.
   * Once enough miners approve and confirm the transaction, it is picked up from the mempool, and included in a block. 
   * The block is added to the blockchain.
   * Transaction status changes to *Success*. 
   * Funds are automatically transferred to the recipient address specified for the transaction. 
   * Transaction status changes to *Confirmed*.
   
  

## Transaction Status

The table describes transaction statuses on the blockchain:

| Status     | Description   |
| ---        |  ---          |
| Unconfirmed | Transaction is waiting for miners to approve it and add it to the blockchain |
| Success    | Transaction is approved, and included in a block.  |
| Confirmed  | Funds are transferred to the recipient. | 
| Failed     | Transaction fees are too low for miners to add it to the blockchain. Failed transactions do not appear in the block explorer. You will need to resend the funds and incur regular fees.  |


<!-- Status 'Pending' not yet showing in BE v1. -->
	

<!-- Other things maybe to include?
* Ethereum block height
  See Etherscan block content here: https://rinkeby.etherscan.io/block/4821393
* contract_add
  Address of the smart contract 
* eth_synching
  Defines how the watcher is syncing with the Ethereum node. Either `False`, the watcher has caught up; or `True`, the watcher is trying to sync with Ethereum, and user needs to wait 
* last_seen / last_mined / last_validated
These fields provide details about the root chain block numbers where the child chain. Helpful for debugging Ethereum/Plasma connections
* height 
The child chain is composed of different services/apps, which are all synced to different Ethereum block heights. 
* Child chain block number
One child chain block can have many transactions. 
* Ethereum block number	 -->


