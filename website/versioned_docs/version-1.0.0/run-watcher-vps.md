---
id: version-1.0.0-run-watcher-vps
title: Run a Watcher on VPS
sidebar_label: Run a Watcher on VPS
original_id: run-watcher-vps
---

*By the end of this guide you should know how to run a Watcher on VPS or dedicated server. The guide is useful for enterprise clients who want to integrate with the OMG Network.*

## Goals

You should use this guide if you need to accomplish one of the following goals:
- Increase uptime and availability of Watcher's instance.
- Rely on personal Watcher to verify transactions.
- Host a redundant Watcher node to secure the network.
- Have an ability to challenge UTXOs.

## Prerequisites

1. Basic knowledge of Linux and blockchain technology.
2. A Linux server, preferably a Virtual Private Server (VPS).
3. A fully synced Ethereum client. 

Ethereum client is required to synchronize transactions on the OMG Network with the Ethereum Network. The easiest way to have a full ETH client is to use one of the Ethereum infrastructure providers: [Infura](https://infura.io), [QuickNode](https://www.quiknode.io/), [Fiews](https://fiews.io/), [Rivet](https://rivet.cloud/), etc.

## Supported Platforms

You can install Watcher on the following Linux OS:
- Ubuntu 16.04

> Note, it might be possible to run a Watcher on other versions of Linux. Above are provided the versions that have been tested.

## Minimum Hardware Requirements

The following hardware is required to run a Watcher on VPS or dedicated server:
- Storage: 16GB SSD
- CPU: Intel i5
- RAM: 6GB
- Bandwidth: 20 Mbps

> The requirements are based on the network's load in Q2 2020. It is recommended to use hardware with higher performance to avoid a potential increase in the volume of transactions.

## Installation Process

### 1. Set Up VPS

It is possible to [run a Watcher locally](run-watcher-locally) for testing purposes but it's recommended to use a remote or dedicated server to increase uptime, reduce latency, and configure advanced security measures for your instance.

The process takes a significant amount of time and may require help from your DevOps team. This step is fully covered in [Manage VPS](manage-vps) guide.

### 2. Log in to VPS

All of the subsequent operations require an active session with your server. You can log in using the following command from your terminal or command prompt:

```
ssh $USER@REMOTE_IP -p PORT
```

### 3. Install Dependencies

Running a Watcher requires Docker and Docker Compose tooling. If your server doesn't have these dependencies, you need to install them.

#### Update Ubuntu Packages

First, make sure your system has the latest packages:

```
sudo apt-get update
sudo apt-get upgrade
```

#### Install Docker

```
curl -sSL https://get.docker.com/ | sh
sudo usermod -aG docker $USER
exit
```

#### Install Docker Compose

Make sure to install the latest version of Docker Compose from the [official repository](https://github.com/docker/compose/releases).

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
exit
```

To verify the installed dependencies, use the following commands:

```
docker -v
docker-compose -v
```

### 3. Check TCP Ports

Before attempting the start up, please ensure that you are not running any services that are listening on the following TCP ports: 7434, 7534, 5432. You can use one of the following commands to accomplish that:

```
sudo lsof -i -n -P | grep LISTEN
sudo ss -tulpn
sudo netstat -tulpn
```

If you found one of the ports is already in use, consider closing them with the following commands:

```
sudo lsof -t -i:<PORT>
sudo kill -9 <PID>
```

Additionally, you can check if Docker is already using some services as follows:

```
docker ps
```

Example output:

```
CONTAINER ID        IMAGE                    COMMAND                  CREATED             STATUS                 PORTS                                             NAMES
```

Each of the ports are used for running one of the following containers:
- 7434: `elixir-omg_watcher_1`, a light-weight Watcher to ensure security of funds deposited into the child chain.
- 7534: `elixir-omg_watcher_info_1`, a convenient and performant API to the child chain data.
- 5432: `elixir-omg_postgres_1`, a PostgreSQL database that stores transactions and contains data needed for challenges and exits.

### 4. Create and Enter a New Directory

It's advised to create a local directory to hold the Watcher data.

```
mkdir watcher
cd mkdir
```

### 5. Clone elixir-omg

Currently, child chain and Watcher exist in a single repository [`elixir-omg`](https://github.com/omisego/elixir-omg). Thus, you need to clone it to start working with the Watcher.

```
git clone https://github.com/omisego/elixir-omg.git
```

Make sure you're on the [`latest release`](https://github.com/omisego/elixir-omg/releases) branch (e.g. `v0.4.8`). It's not recommended to use pre-releases, they may not be stable.
```
git checkout <LATEST_RELEASE_BRANCH>
```

### 6. Modify Configurations

Most of the configurations required to run a Watcher are filled with default values. If you encounter any issues (e.g. `get_block:not_found`), check the latest [network connections](environments) for chosen environment (testnet or mainnet). Also, you need to set up `ETHEREUM_RPC_URL` that corresponds with a full Ethereum node URL. To change the values, use `nano` or `vi` text editor from the root of the `elixir-omg` repository:

```
nano docker-compose-watcher.yml
```

### 7. Run a Watcher Instance

To run a Watcher instance, you need to start the required Docker containers. The parameter `-d` allows running containers in the background.

```
docker-compose -f docker-compose-watcher.yml up -d
```

Example output:
```
Starting elixir-omg_watcher_1  ... done
Starting elixir-omg_postgres_1 ... done
Starting elixir-omg_watcher_info_1 ... done
```

To see logs, use the following command:
```
docker-compose -f docker-compose-watcher.yml logs -ft
```

Example output:
```
watcher_info_1  | 2020-05-15 06:53:30.434 [info] module=OMG.Watcher.BlockGetter.Core function=log_downloading_blocks/2 ⋅Child chain seen at block #216000. Downloading blocks [195000]⋅
watcher_info_1  | 2020-05-15 06:53:41.959 [info] module=OMG.State.Core function=deposit/2 ⋅Recognized deposits [%{amount: 10000000000000000, blknum: 145003, currency: <<0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0>>, eth_height: 7764861, event_signature: "DepositCreated(address,uint256,address,uint256)", log_index: 12, owner: <<13, 200, 226, 64, 217, 15, 59, 13, 81, 27, 100, 71, 84, 59, 40, 234, 36, 113, 64, 26>>, root_chain_txhash: <<147, 29, 206, 246, 243, 3, 240, 87, 225, 47, 101, 89, 171, 173, 123, 55, 34, 14, 12, 79, 224, 233, 75, 247, 50, 245, 218, 29, 250, 116, 222, 116>>}, %{amount: 1, blknum: 145002, currency: <<0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0>>, eth_height: 7764856, event_signature: "DepositCreated(address,uint256,address,uint256)", log_index: 52, owner: <<186, 193, 205, 64, 81, 195, 120, 191, 144, 0, 135, 204, 196, 69, 215, 231, 208, 42, 215, 69>>, root_chain_txhash: <<49, 33, 4, 79, 147, 239, 174, 12, 22, 112, 84, 38, 41, 10, 51, 142, 50, 212, 239, 179, 158, 160, 49, 147, 115, 17, 53, 146, 171, 104, 86, 125>>}, %{amount: 10000000000000000, blknum: 145001, currency: <<0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0>>, eth_height: 7764842, event_signature: "DepositCreated(address,uint256,address,uint256)", log_index: 5, owner: <<13, 200, 226, 64, 217, 15, 59, 13, 81, 27, 100, 71, 84, 59, 40, 234, 36, 113, 64, 26>>, root_chain_txhash: <<232, 140, 248, 249, 218, 149, 111, 141, 157, 74, 252, 71, 121, 176, 107, 217, 187, 78, 120, 154, 150, 98, 168, 214, 104, 217, 78, 253, 122, 54, 129, 166>>}]⋅
watcher_info_1  | 2020-05-15 06:53:43.059 [info] module=OMG.Watcher.BlockGetter.Core function=log_downloading_blocks/2 ⋅Child chain seen at block #216000. Downloading blocks [196000, 197000]⋅
watcher_info_1  | 2020-05-15 06:53:43.062 [info] module=OMG.Watcher.BlockGetter function=handle_continue/2 ⋅Applied block: #146000, from eth height: 7765960 with 2 txs⋅
watcher_info_1  | 2020-05-15 06:53:43.230 [info] module=OMG.Watcher.BlockGetter function=handle_continue/2 ⋅Applied block: #147000, from eth height: 7765973 with 2 txs⋅
```

> Depending on the server's hardware and internet connection, the entire process can take up to an hour.

If you want to exit the logs without stopping containers use `Ctrl+C` or `Cmd+C`.

### 8. Verify You're Synced 

To verify that you're fully synced, check the status of Watcher and Watcher Info:

#### Watcher

```
curl -X POST "http://REMOTE_IP:7434/status.get"
```

Example output:
```
{
   "data":{
      "byzantine_events":[
         ...
      ],
      "contract_addr":{
         "erc20_vault":"0x18e15c2cdc003b845b056f8d6b6a91ab33d3f182",
         "eth_vault":"0x895cc6f20d386f5c0deae08b08ccfec9f821e7d9",
         "payment_exit_game":"0x08c569c5774110eb84a80b292e6d6f039e18915a",
         "plasma_framework":"0x96d5d8bc539694e5fa1ec0dab0e6327ca9e680f9"
      },
      "eth_syncing":false,
      "in_flight_exits":[
         ...
      ],
      "last_mined_child_block_number":232000,
      "last_mined_child_block_timestamp":1589538254,
      "last_seen_eth_block_number":7908163,
      "last_seen_eth_block_timestamp":1589549882,
      "last_validated_child_block_number":232000,
      "last_validated_child_block_timestamp":1589538254,
      "services_synced_heights":[
         ...
      ]
   },
   "service_name":"watcher",
   "success":true,
   "version":"0.4.8+c6a25a0"
}
```

#### Watcher Info

```
curl -X POST "http://REMOTE_IP:7434/stats.get"
```

Example output:
```
{
   "data":{
      "average_block_interval_seconds":{
         "all_time":4768.440056417489,
         "last_24_hours":1550.673076923077
      },
      "block_count":{
         "all_time":1419,
         "last_24_hours":53
      },
      "transaction_count":{
         "all_time":39299,
         "last_24_hours":100
      }
   },
   "service_name":"watcher_info",
   "success":true,
   "version":"0.4.8+c6a25a0"
}
```

### 9. Test Your Watcher

The last step is to test that your Watcher is working properly. There are two ways to do that:
1. Use `http://REMOTE_IP:7434` as a `WATCHER_URL` value in your configs to make a transfer in your own or one of the OMG Network projects, such as [OMG Samples](https://github.com/omisego/omg-samples). 
2. Make a transaction or other operation using [Watcher Info API](https://docs.omg.network/elixir-omg/docs-ui/?url=master%2Foperator_api_specs.yaml&urls.primaryName=master%2Finfo_api_specs).
