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
- Ubuntu 18.04

> Note, it might be possible to run a Watcher on other versions of Linux. Above are provided the versions that have been tested.

## Minimum Hardware Requirements

The following hardware is required to run a Watcher on VPS or dedicated server:
- Storage: 16GB SSD
- CPU: 1 CPU Core with at least 2.2 GHz
- RAM: 4GB
- Bandwidth: 20 Mbps

> The requirements are based on the network's load in Q2 2020. It is recommended to use hardware with higher performance to avoid a potential increase in transaction volume.

## Costs

The costs of running a Watcher on VPS include the following components:
- A full Ethereum node (local or ETH provider).
- VPS or dedicated server that matches [the minimum hardware requirements](#minimum-hardware-requirements).
- DevOps setup and maintenance fee.

## Installation Process

### 1. Set Up VPS

It is possible to [run a Watcher locally](run-watcher-locally) for testing purposes but it's recommended to use a remote or dedicated server to increase uptime, reduce latency, and configure advanced security measures for your instance.

The process takes a significant amount of time and may require help from your DevOps team. This step is fully covered in the [Manage VPS](manage-vps) guide.

### 2. Log in to VPS

All of the subsequent operations require an active session with your server. You can log in using the following command from your terminal or command prompt:

```
ssh $USER@$REMOTE_SERVER -p $PORT
```

> - `$USER` - the name of the user with root privileges used to log into the remote server. Default: root.
> - `$REMOTE_SERVER` - an ip address of your remote server.
> - `$PORT` - a port used to connect to the server. Default: 22.

### 3. Install Dependencies

Running a Watcher requires Docker and Docker Compose tooling. If your server doesn't have these dependencies, you need to install them.

#### 3.1 Update Ubuntu Packages

First, make sure your system has the latest packages:

```
sudo apt-get update
```

#### 3.2 Install Docker

```
sudo curl -sSL https://get.docker.com/ | sh && sudo usermod -aG docker $USER && exit
```

> - `$USER` - the name of the user with root privileges used on a remote server.

#### 3.3 Install Docker Compose

Make sure to install the latest version of Docker Compose from the [official repository](https://github.com/docker/compose/releases).

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && sudo chmod +x /usr/local/bin/docker-compose && exit
```

#### 3.4 Verify

To verify the installed dependencies, use the following commands:

```
docker -v && docker-compose -v
```

Example output:
```
Docker version 19.03.9, build 9d988398e7
docker-compose version 1.25.5, build 8a1c60f6
```

### 4. Check TCP Ports

#### 4.1 System Ports

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

#### 4.2 Docker Ports

Additionally, you can check if Docker is already using some services as follows:

```
docker ps
```

Example output:

```
CONTAINER ID        IMAGE                    COMMAND                  CREATED             STATUS                 PORTS                                             NAMES
```

### 5. Create and Enter a New Directory

It's advised to create a local directory to hold the Watcher data.

```
mkdir watcher && cd watcher
```

### 6. Clone elixir-omg

Currently, child chain and Watcher exist in a single repository [`elixir-omg`](https://github.com/omgnetwork/elixir-omg). Thus, you need to clone it to start working with the Watcher.

```
git clone https://github.com/omgnetwork/elixir-omg.git && cd elixir-omg
```

Make sure you're on the [`latest release`](https://github.com/omgnetwork/elixir-omg/releases) tag (e.g. `v0.4.8`). It's not recommended to use pre-releases, they may not be stable.
```
git checkout <LATEST_RELEASE_TAG>
```

### 7. Modify Configurations

The OMG Network provides several environments you can sync your Watcher with. To change the values, use `nano` or `vim` text editor from the root of the `elixir-omg` repository.

#### 7.1 Open `docker-compose-watcher.yml` File

<!--DOCUSAURUS_CODE_TABS-->
<!-- Linux -->
```
nano docker-compose-watcher.yml
```
<!-- macOS -->
```
nano docker-compose-watcher.yml
```
<!--END_DOCUSAURUS_CODE_TABS-->

#### 7.2 Replace Environment Values

In the opened file replace the environments details for `watcher` and `watcher_info` services as follows:

<!--DOCUSAURUS_CODE_TABS-->
<!-- watcher -->
```
  watcher:
    image: ${WATCHER_IMAGE}
    command: "full_local"
    environment:
      - ETHEREUM_RPC_URL=${ETHEREUM_RPC_URL}
      - CHILD_CHAIN_URL=${CHILD_CHAIN_URL}
      - ETHEREUM_NETWORK=${ETHEREUM_NETWORK}
      - AUTHORITY_ADDRESS=${AUTHORITY_ADDRESS}
      - TXHASH_CONTRACT=${TXHASH_CONTRACT}
      - CONTRACT_ADDRESS_PLASMA_FRAMEWORK=${CONTRACT_ADDRESS_PLASMA_FRAMEWORK}
      - CONTRACT_ADDRESS_ETH_VAULT=${CONTRACT_ADDRESS_ETH_VAULT}
      - CONTRACT_ADDRESS_ERC20_VAULT=${CONTRACT_ADDRESS_ERC20_VAULT}
      - CONTRACT_ADDRESS_PAYMENT_EXIT_GAME=${CONTRACT_ADDRESS_PAYMENT_EXIT_GAME}
      - DATABASE_URL=${DATABASE_URL}
      - PORT=7434
      - DD_DISABLED=true
      - DB_PATH=/app/.omg/data
      - ETHEREUM_EVENTS_CHECK_INTERVAL_MS=8000
      - ETHEREUM_STALLED_SYNC_THRESHOLD_MS=300000
      - ETHEREUM_BLOCK_TIME_SECONDS=15
      - EXIT_PROCESSOR_SLA_MARGIN=5520
      - EXIT_PROCESSOR_SLA_MARGIN_FORCED=TRUE
      - LOGGER_BACKEND=console
      - DD_HOSTNAME=datadog
      - APP_ENV=local-development
    restart: always
    ports:
      - "7434:7434"
    healthcheck:
      test: curl watcher:7434
      interval: 5s
      timeout: 3s
      retries: 5
```
<!-- watcher_info -->
```
  watcher_info:
    image: ${WATCHER_INFO_IMAGE}
    command: "full_local"
    environment:
      - ETHEREUM_RPC_URL=${ETHEREUM_RPC_URL}
      - CHILD_CHAIN_URL=${CHILD_CHAIN_URL}
      - ETHEREUM_NETWORK=${ETHEREUM_NETWORK}
      - AUTHORITY_ADDRESS=${AUTHORITY_ADDRESS}
      - TXHASH_CONTRACT=${TXHASH_CONTRACT}
      - CONTRACT_ADDRESS_PLASMA_FRAMEWORK=${CONTRACT_ADDRESS_PLASMA_FRAMEWORK}
      - CONTRACT_ADDRESS_ETH_VAULT=${CONTRACT_ADDRESS_ETH_VAULT}
      - CONTRACT_ADDRESS_ERC20_VAULT=${CONTRACT_ADDRESS_ERC20_VAULT}
      - CONTRACT_ADDRESS_PAYMENT_EXIT_GAME=${CONTRACT_ADDRESS_PAYMENT_EXIT_GAME}
      - DATABASE_URL=${DATABASE_URL}
      - PORT=7534
      - DD_DISABLED=true
      - DB_PATH=/app/.omg/data
      - ETHEREUM_EVENTS_CHECK_INTERVAL_MS=8000
      - ETHEREUM_STALLED_SYNC_THRESHOLD_MS=300000
      - ETHEREUM_BLOCK_TIME_SECONDS=15
      - EXIT_PROCESSOR_SLA_MARGIN=5520
      - EXIT_PROCESSOR_SLA_MARGIN_FORCED=TRUE
      - LOGGER_BACKEND=console
      - DD_HOSTNAME=datadog
      - APP_ENV=local-development
    restart: always
    ports:
      - "7534:7534"
    healthcheck:
      test: curl watcher_info:7534
      interval: 5s
      timeout: 3s
      retries: 5
```
<!--END_DOCUSAURUS_CODE_TABS-->

#### 7.3 Create `.env` file

Modifying `.yml` file directly is not the best approach, and can lead to various human errors. `env` file will contain all of the values used for Watcher's configuration. You can create `env` file with `nano` or `vim` editor as follows:

```
nano .env
```

#### 7.4 Paste and Configure Environment Values

Below are provided the values for `OMG NETWORK MAINNET BETA V1`. If you want to work with another environment, please refer to [`environments`](/environments). Note, you need to provide `ETHEREUM_RPC_URL` that will correspond to your local ETH node or the one used by ETH infrastructure provider.

```
WATCHER_IMAGE=omisego/watcher:v0.4.8
WATCHER_INFO_IMAGE=omisego/watcher_info:v0.4.8
DATABASE_URL=postgres://omisego_dev:omisego_dev@postgres:5432/omisego_dev
ETHEREUM_RPC_URL=$ETHEREUM_RPC_URL
ETHEREUM_NETWORK=MAINNET
CHILD_CHAIN_URL=https://childchain.mainnet.v1.omg.network
AUTHORITY_ADDRESS=0x22405c1782913fb676bc74ef54a60727b0e1026f
TXHASH_CONTRACT=0x1c29b67acc33eba0d26f52a1e4d26625f52b53e6fbb0a4db915aeb052f7ec849
CONTRACT_ADDRESS_PLASMA_FRAMEWORK=0x0d4c1222f5e839a911e2053860e45f18921d72ac
CONTRACT_ADDRESS_ETH_VAULT=0x3eed23ea148d356a72ca695dbce2fceb40a32ce0
CONTRACT_ADDRESS_ERC20_VAULT=0x070cb1270a4b2ba53c81cef89d0fd584ed4f430b
CONTRACT_ADDRESS_PAYMENT_EXIT_GAME=0x48d7a6bbc428bca019a560cf3e8ea5364395aad3
```

> - `$ETHEREUM_RPC_URL` - a full Ethereum node URL.
> - `$ETHEREUM_NETWORK` - an Ethereum network, accepts only all caps values: `ROPSTEN`, `MAINNET`, etc.

After providing the values, save the changes, and exit `.env` file.

#### 7.5 Infrastructure Monitoring (optional)

If you want to monitor the the status of your Docker containers and the overall health of your server, consider setting up a [Sematext](https://sematext.com/) or other alternatives. For Sematext, first create a new app on their website. Then add the corresponding configurations to your `docker-compose-watcher.yml` file using `nano` or `vim` text editor:

```
services:
  sematext-agent:
    image: 'sematext/agent:latest'
    environment:
      - INFRA_TOKEN=$INFRA_TOKEN
      - CONTAINER_TOKEN=$CONTAINER_TOKEN
      - REGION=$REGION
    cap_add:
      - SYS_ADMIN
    restart: always
    volumes:
      - '/:/hostfs:ro'
      - '/etc/passwd:/etc/passwd:ro'
      - '/etc/group:/etc/group:ro'
      - '/var/run/:/var/run/'
      - '/sys/kernel/debug:/sys/kernel/debug'
      - '/sys:/host/sys:ro'
```

> - `$INFRA_TOKEN` - Sematext infrastructure token.
> - `$CONTAINER_TOKEN` - Sematext Docker container token.  
> - `$REGION` - region used in your Sematext account.

If you set everything correctly, you should see the following dashboard:

![sematext](/img/watcher/03.png)

### 8. Run a Watcher Instance

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

If you want to exit the logs without stopping containers, use `Ctrl+C` or `Cmd+C`.

### 9. Verify You're Synced 

To verify that you're fully synced, check the status of Watcher and Watcher Info:

#### 9.1 Watcher

```
curl -X POST "http://$REMOTE_SERVER:7434/status.get"
```

> - `$REMOTE_SERVER` - an ip address of your remote server.

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

#### 9.2 Watcher Info

```
curl -X POST "http://$REMOTE_SERVER:7534/stats.get"
```

> - `$REMOTE_SERVER` - an ip address of your remote server.

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

Notice, the server may not respond until the following line appears in the `watcher_info` logs:

```
watcher_info_1   | 2020-05-30 06:13:36.445 [info] module=Phoenix.Endpoint.CowboyAdapter function=start_link/3 ⋅Running OMG.WatcherRPC.Web.Endpoint with cowboy 1.1.2 at :::7434 (http)⋅
```

### 10. Test Your Watcher

TThere are two ways to test that your Watcher is working properly:
1. Use `http://$REMOTE_SERVER:7534` as a `WATCHER_URL` value in your configs to make a transfer in your own or one of the OMG Network projects, such as [OMG Samples](https://github.com/omgnetwork/omg-samples). 
2. Make a transaction or another operation using [Watcher Info API](https://docs.omg.network/elixir-omg/docs-ui/?url=master%2Foperator_api_specs.yaml&urls.primaryName=master%2Finfo_api_specs).

> - `$REMOTE_SERVER` - an ip address of your remote server.
