---
id: version-V1-run-watcher-locally
title: How to Run a Watcher Locally
sidebar_label: Run a Watcher Locally
original_id: run-watcher-locally
---

*By the end of this guide you should know how to run a Watcher locally. The guide is useful for individual developers and clients who want to integrate with the OMG Network.*

## Goals

You should use this guide if you need to accomplish one of the following goals:
- Test the Watcher locally under certain conditions
- Run a local Watcher during Dapp development or software integration  
- Host a redundant Watcher node to secure the network
- Have an ability to challenge UTXOs

## Prerequisites

1. [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/) > `1.17`, [Postgres](https://www.postgresql.org/). The docker-compose tooling allows users to run their own instance of the Watcher to connect to the OMG Network and validate transactions.

To check if you have Docker and Docker Compose installed, run the following commands in your terminal:
```
docker -v && docker-compose --version
```
Example output:
```
Docker version 19.03.9, build 9d988398e7
docker-compose version 1.25.5, build 8a1c60f6
```

2. A fully synced Ethereum client. 

Ethereum client is required to synchronize transactions on the OMG Network with the Ethereum Network. The easiest way to have a full ETH client is to use one of the Ethereum infrastructure providers: [Infura](https://infura.io), [QuickNode](https://www.quiknode.io/), [Fiews](https://fiews.io/), [Rivet](https://rivet.cloud/), etc.

## Supported Platforms

Watcher currently supports the following operating systems:
- Ubuntu 16.04
- Ubuntu 18.04
- macOS 11.0.0

> Note, it might be possible to run a Watcher on other OS that supports the Docker daemon and tooling. 

## Minimum Hardware Requirements

The following hardware is required to run a Watcher:
- Storage: 16GB SSD
- CPU: 1 CPU Core with at least 2.2 GHz
- RAM: 4GB
- Bandwidth: 20 Mbps

> The requirements are based on the network's load in Q2 2020. It is recommended to use hardware with higher performance to avoid a potential increase in the volume of transactions.

## Installation Process

### 1. Create a Directory

It's advised to create a local directory to hold the Watcher data.

<!--DOCUSAURUS_CODE_TABS-->
<!-- Linux/macOS -->
```
mkdir watcher && cd watcher
```
<!--END_DOCUSAURUS_CODE_TABS-->

### 2. Check TCP Ports

#### 2.1 System Ports

Each of the ports is used for running one of the following containers:
- 7434: `elixir-omg_watcher_1`, a light-weight Watcher to ensure the security of funds deposited into the child chain.
- 7534: `elixir-omg_watcher_info_1`, a convenient and performant API to the child chain data.
- 5432: `elixir-omg_postgres_1`, a PostgreSQL database that stores transactions and contains data needed for challenges and exits.

Ensure you are not running any processes that are listening to the corresponding ports: 7434, 7534, 5432. You can use `lsof`, `netstat` or other alternatives to accomplish that:

<!--DOCUSAURUS_CODE_TABS-->
<!-- Linux -->
```
sudo lsof -i -n -P | grep LISTEN
```
<!-- macOS -->
```
sudo lsof -i -n -P | grep TCP
```
<!--END_DOCUSAURUS_CODE_TABS-->

If you found one of the ports is already in use, kill the process the port is occupied with as follows:

<!--DOCUSAURUS_CODE_TABS-->
<!-- Linux -->

View the process that occupies the port:
```
sudo lsof -t -i:$PORT
```

Kill the process with its ID:
```
sudo kill -9 $PID
```

<!-- macOS -->

View the process that occupies the port:
```
sudo lsof -i :$PORT
```

Kill the process with its ID:
```
sudo kill $PID
```
<!--END_DOCUSAURUS_CODE_TABS-->

> - `$PORT` - a port to clear from other processes.
> - `$PID` - process ID listening on a defined port.

#### 2.2 Docker Ports

Additionally, you can check services that Docker is already using with the following command:

```
docker ps
```

Example output:

```
CONTAINER ID        IMAGE                    COMMAND                  CREATED             STATUS                 PORTS                                             NAMES
29641165a1be        omisego/ewallet:stable   "/init /entrypoint f…"   4 months ago        Up 7 hours             4369/tcp, 0.0.0.0:4000->4000/tcp, 6900-6909/tcp   omisego_ewallet_1
```

### 3. Create and Enter a New Directory

```
mkdir watcher && cd watcher
```

### 4. Set Up Configuration Files

The Wather relies on several services: Watcher, Watcher Info and Postgres database. You can build them yourself from official [`elixir-omg releases`](https://github.com/omgnetwork/elixir-omg/releases) or use Docker containers as follows:

<!--DOCUSAURUS_CODE_TABS-->

<!-- Docker Compose -->

#### 4.1 Configure docker-compose-watcher.yml File

Docker Compose allows defining and running multi-container Docker applications. To launch a Watcher with Compose, first, create YAML file that will contain configurations for our services with `nano` or `vim` text editor:

```
nano docker-compose-watcher.yml
```

Then, copy and paste the [required configs](https://gist.github.com/dmitrydao/c69a886e30f29d49f853975bf7237cd6), save the changes with `ctrl+o` (Linux/Windows) or `control+o` (macOS) and `Enter` to confirm the changes respectively. Then exit the file with `ctrl+x` or `control+x`.

#### 4.2 Configure Environment File

The YAML file has several values that have to be configured in `.env` file. To edit them, open `.env` with `nano` or `vim` text editor and paste the following values:

```
WATCHER_IMAGE=${WATCHER_IMAGE}
WATCHER_INFO_IMAGE=${WATCHER_INFO_IMAGE}
ETHEREUM_RPC_URL=${ETHEREUM_RPC_URL}
ETHEREUM_NETWORK=${ETHEREUM_NETWORK}
CHILD_CHAIN_URL=https://childchain.mainnet.v1.omg.network
AUTHORITY_ADDRESS=0x22405c1782913fb676bc74ef54a60727b0e1026f
TXHASH_CONTRACT=0x1c29b67acc33eba0d26f52a1e4d26625f52b53e6fbb0a4db915aeb052f7ec849
CONTRACT_ADDRESS_PLASMA_FRAMEWORK=0x0d4c1222f5e839a911e2053860e45f18921d72ac
CONTRACT_ADDRESS_ETH_VAULT=0x3eed23ea148d356a72ca695dbce2fceb40a32ce0
CONTRACT_ADDRESS_ERC20_VAULT=0x070cb1270a4b2ba53c81cef89d0fd584ed4f430b
CONTRACT_ADDRESS_PAYMENT_EXIT_GAME=0x48d7a6bbc428bca019a560cf3e8ea5364395aad3
```

> - `$ETHEREUM_RPC_URL` - a full Ethereum node URL.
> - `$ETHEREUM_NETWORK` - an Ethereum network, all caps values: `RINKEBY`,`ROPSTEN`, `MAINNET`, etc.
> - `${WATCHER_IMAGE}` - the latest stable [`watcher`](https://hub.docker.com/r/omisego/watcher/tags) image (e.g. `omisego/watcher:1.0.0`).
> - `${WATCHER_INFO_IMAGE}` - the latest stable [`watcher_info`](https://hub.docker.com/r/omisego/watcher_info/tags) image (e.g. `omisego/watcher_info:1.0.0`).

Above are provided the values for `OMG NETWORK MAINNET BETA V1`. If you want to work with another environment, please refer to [`environments`](/environments).

<!--END_DOCUSAURUS_CODE_TABS-->

If you're using one of the Ethereum infrastructure providers, the connection setting `ETHEREUM_RPC_URL` may have the following format:

#### Ropsten:
<!--DOCUSAURUS_CODE_TABS-->
<!-- Infura -->
```
https://ropsten.infura.io/v3/${KEY}
```
<!-- QuickNode -->
```
https://falling-delicate-sunset.ropsten.quiknode.pro/${KEY}
```
<!-- Rivet -->
```
https://${KEY}.eth.ropsten.rpc.rivet.cloud
```
<!-- Fiews -->
```
https://cl-ropsten.fiews.io/v1/${KEY}
```
<!--END_DOCUSAURUS_CODE_TABS-->

#### Mainnet:
<!--DOCUSAURUS_CODE_TABS-->
<!-- Infura -->
```
https://mainnet.infura.io/v3/${KEY}
```
<!-- QuickNode -->
```
https://falling-delicate-sunset.mainnet.quiknode.pro/${KEY}
```
<!-- Rivet -->
```
https://${KEY}.eth.rpc.rivet.cloud
```
<!-- Fiews -->
```
https://cl-main.fiews.io/v1/{$KEY}
```
<!--END_DOCUSAURUS_CODE_TABS-->

> ${KEY} - the environment/project/account key from your infrastructure provider.
> 
> Note, the URL paths may change by providers in the future.

### 5. Run a Watcher Instance

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

If you want to exit the logs without stopping containers, use `ctrl+c` or `control+c`.

> Depending on your hardware and internet connection, the entire process can take up to an hour.

### 6. Verify You're Synced 

To verify that you're fully synced, check the status of Watcher and Watcher Info:

#### 6.1 Watcher

```
curl -X POST "http://localhost:7434/status.get"
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
   },ß
   "service_name":"watcher",
   "success":true,
   "version":"1.0.0+6234ec5"
}
```

#### 6.2 Watcher Info

```
curl -X POST "http://localhost:7534/stats.get"
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
   "version":"1.0.0+6234ec5"
}
```

Notice, the server may not respond until the following line appears in the `watcher_info` logs:

```
watcher_info_1   | 2020-05-30 06:13:36.445 [info] module=Phoenix.Endpoint.CowboyAdapter function=start_link/3 ⋅Running OMG.WatcherRPC.Web.Endpoint with cowboy 1.1.2 at :::7434 (http)⋅
```

### 7. Test Your Watcher

The last step is to test that your Watcher is working properly. There are two ways to do that:
1. Use `http://localhost:7534` as a `WATCHER_URL` value in your configs to make a transfer in your own or one of the OMG Network projects, such as [OMG Samples](https://github.com/omgnetwork/omg-samples). 
2. Make a transaction or other operation using [Watcher Info API](https://docs.omg.network/elixir-omg/docs-ui/?url=master%2Foperator_api_specs.yaml&urls.primaryName=master%2Finfo_api_specs).
