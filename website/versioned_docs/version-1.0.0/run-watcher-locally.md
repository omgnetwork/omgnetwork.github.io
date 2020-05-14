---
id: version-1.0.0-run-watcher-locally
title: Run Watcher Locally
sidebar_label: Run Watcher Locally
original_id: run-watcher-locally
---

*By the end of this guide you should know how to run a Watcher locally.*

## Prerequisites

1. [Docker Compose](https://docs.docker.com/compose/install). It's recommended to run a Watcher with Docker. We continuously build and deploy the code from our [Github repository](https://github.com/omisego/elixir-omg) to allow developers running the latest code on different environments.

To check if you have Docker Compose installed, run the following command in your terminal:
```
docker-compose --version
```
Example output:
```
docker-compose version 1.25.5, build 8a1c60f6
```

2. A fully synced Ethereum client. You can choose one of the following options:
- Run [Geth](https://geth.ethereum.org/docs), [Parity](https://openethereum.github.io/wiki/Parity-Ethereum) or other [officially supported clients](https://ethereum.org/developers/#clients) by Ethereum.
- Use one of Ethereum infrastructure providers: [Infura](https://infura.io), [Alchemy](https://alchemyapi.io/), [QuickNode](https://www.quiknode.io/), [Rivet](https://rivet.cloud/), etc.

The number of calls required to maintain synchronization with the Ethereum RPC node is expected as follows:
- 200,000 - initial sync.
- ? - daily sync.

> The results are provided based on the OMG Network load in May 2020.

## Supported Platforms

Watcher currently supports the following operating systems:
- Ubuntu 16.04
- Ubuntu 18.04
- MacOS ?

## Minimum Hardware Requirements

The following hardware is required to run a Watcher:
- Storage: 320GB SSD
- CPU: Intel i7
- RAM: 16 GB
- 400 Mbps / 20 Mbps cable internet

## Estimated Costs

The estimated monthly costs for running a Watcher locally can be calculated as follows:
- Ethereum infrastructure provider: $50-$100
- Cable internet: $10-$70

## Installation Process

### Step 1 - Create a Directory

It's advised to create a local directory to hold the Watcher data.

<!--DOCUSAURUS_CODE_TABS-->
<!-- Linux -->
```
mkdir ~/.omg-watcher
```
<!-- MacOS -->
```
mkdir ~/.omg-watcher
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Step 2 - Clone elixir-omg

Currently, child chain and Watcher exist in a single repository [`elixir-omg`](https://github.com/omisego/elixir-omg). Thus, you need to clone it to start working with the Watcher.

```
git clone https://github.com/omisego/elixir-omg.git
```

### Step 3 - Check TCP ports

Before attempting the start up, please ensure that you are not running any services that are listening on the following TCP ports: 9656, 7434, 7534, 5000, 8545, 5432, 5433. You can use one of the following commands to accomplish that:

<!--DOCUSAURUS_CODE_TABS-->
<!-- Linux -->
```
sudo lsof -i -n -P | grep LISTEN
sudo ss -tulpn
sudo netstat -tulpn
```
<!-- MacOS -->
```
sudo lsof -i -n -P | grep TCP
sudo netstat -anp tcp | grep LISTEN
```
<!--END_DOCUSAURUS_CODE_TABS-->

If you found one of the ports is already in use, consider closing them with the following commands:

<!--DOCUSAURUS_CODE_TABS-->
<!-- Linux -->
```
sudo lsof -t -i:<PORT>
sudo kill -9 <PID>
```
<!-- MacOS -->
```
sudo lsof -i :<PORT>
sudo kill <PID>
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Step 4 - Mofidy configurations

Most of the configurations required to run a Watcher are filled with default values. You do need to set up `ETHEREUM_RPC_URL` that corresponds with a full Ethereum node you will be using. To change the values, use the following command from the root of repository:

<!--DOCUSAURUS_CODE_TABS-->
<!-- Linux -->
```
nano docker-compose-watcher.yml
```
<!-- MacOS -->
```
nano docker-compose-watcher.yml
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Step 5 - Run a Watcher instance

To run a Watcher instance, you need to start the required Docker containers. The parameter `-d` allows running containers in the background.

```
docker-compose -f docker-compose-watcher.yml up -d
```

Example output:
```
Starting elixir-omg_watcher_1 ... 
elixir-omg_postgres_1 is up-to-date
Starting elixir-omg_watcher_1 ... done
```

To see logs, use the following command:
```
docker-compose -f docker-compose-watcher.yml logs -f
```
Example output:
```
watcher_1       | 2020-05-14 07:59:40.641 [info] module=OMG.State.Core function=deposit/2 ⋅Recognized deposits [%{amount: 5000000000000, blknum: 333003, currency: <<0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0>>, eth_height: 7464574, event_signature: "DepositCreated(address,uint256,address,uint256)", log_index: 7, owner: <<98, 115, 6, 9, 10, 186, 179, 166, 225, 64, 14, 147, 69, 188, 96, 199, 138, 139, 239, 87>>, root_chain_txhash: <<128, 120, 21, 126, 118, 101, 96, 193, 170, 204, 177, 112, 194, 16, 248, 28, 158, 146, 251, 122, 39, 28, 155, 124, 226, 159, 242, 254, 175, 44, 240, 100>>}]⋅
watcher_1       | 2020-05-14 07:59:40.649 [info] module=OMG.Watcher.BlockGetter.Core function=log_downloading_blocks/2 ⋅Child chain seen at block #359000. Downloading blocks [1000]⋅
watcher_1       | 2020-05-14 07:59:40.693 [info] module=OMG.Watcher.BlockGetter.Core function=validate_download_response/5 ⋅Potential block withholding {:error, {:client_error, %{"code" => "get_block:not_found", "description" => nil, "object" => "error"}}}, number: #2000⋅
watcher_1       | 2020-05-14 07:59:41.199 [info] module=OMG.Watcher.BlockGetter.Core function=log_downloading_blocks/2 ⋅Child chain seen at block #359000. Downloading blocks [4000]⋅
watcher_1       | 2020-05-14 07:59:41.525 [info] module=OMG.Watcher.BlockGetter.Core function=log_downloading_blocks/2 ⋅Child chain seen at block #359000. Downloading blocks [3000]⋅
```

After the Watcher is fully synced up with the Ethereum network, you can see the following output:
```
...
```
