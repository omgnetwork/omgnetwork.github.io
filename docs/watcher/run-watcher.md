---
id: run-watcher
title: How to Run a Watcher
sidebar_label: Run a Watcher
---

*By the end of this guide you should know how to run a Watcher on your local machine, on VPS or a bare-metal server. The guide is useful for enterprise clients who want to integrate with the OMG Network.*

## Goals

You should use this guide if you need to accomplish one of the following goals:
- Rely on a personal Watcher to verify transactions and receive network's events
- Host a redundant Watcher node to secure the network
- Have an ability to challenge UTXOs

## Prerequisites

1. Basic knowledge of Linux and blockchain technology
2. A laptop/PC, a Linux-based VPS, or a bare-metal server
3. A fully synced Ethereum client

Ethereum client is required to synchronize transactions on the OMG Network with the Ethereum Network. The easiest way to have a full ETH client is to use one of the Ethereum infrastructure providers: [Infura](https://infura.io), [QuickNode](https://www.quiknode.io/), [Fiews](https://fiews.io/), [Rivet](https://rivet.cloud/), etc.

## Supported Platforms

The Watcher has been tested on the following environments:
- Ubuntu 16.04
- Ubuntu 18.04
- macOS 11.0.0 (local usage only)

> Note, it might be possible to run a Watcher on other environments. Above are provided the systems that have been tested.

## Minimum Hardware Requirements

The following hardware is required to run a Watcher:
- Storage: 8GB SSD
- CPU: 1 CPU Core with at least 2.2 GHz
- RAM: 4GB
- Bandwidth: 20 Mbps

> The requirements are based on the network's load in Q3 2020. It is recommended to use hardware with higher performance to avoid a potential increase in transaction volume.

## Costs

The costs of running a Watcher include the following components:
- A full Ethereum node (local or ETH provider)
- VPS, bare-metal server, or local machine that matches [the minimum hardware requirements](#minimum-hardware-requirements)
- DevOps setup and maintenance fee

## Setup

Before installing Watcher service on a server or your local machine, you should have a few things setup:

### 1. Log in to Your Server

If you're planning to install a Watcher on remote server (VPS or bare-metal), make sure to have an active session open before before proceeding with the guide.

Configuration process takes a significant amount of time and may require help from your DevOps team. This step is fully covered in the [Manage VPS](/watcher/manage-vps) guide.

You can log in using the following command from your terminal or command prompt:

```
ssh $USER@$REMOTE_SERVER -p $PORT
```

> - `$USER` - the name of the user with root privileges used to log into the remote server. Default: root.
> - `$REMOTE_SERVER` - an IP address of your remote server.
> - `$PORT` - a port used to connect to the server. Default: 22.

### 2. Check TCP ports

Make sure you have don't have any of the services running on one of the following ports: 7434, 7534, 5432. The ports are used as follows:
- 7434: `elixir-omg_watcher_1`, a light-weight Watcher to ensure the security of funds deposited into the childchain
- 7534: `elixir-omg_watcher_info_1`, a convenient and performant API to the child chain data
- 5432: `elixir-omg_postgres_1`, a PostgreSQL database that stores transactions and contains data needed for challenges and exits

You can use `lsof`, `netstat` or other alternatives to check occupied ports:

```
sudo lsof -i -n -P | grep LISTEN
```

If you found one of the ports is already in use, kill the process the port is occupied with as follows:

```
sudo lsof -t -i:$PORT
sudo kill -9 $PID
```

> - `$PORT` - a port to clear from other processes
> - `$PID` - process ID listening on a defined port

If you're already using Docker, verify these ports are free too:

```
docker ps
```

### 3. Update Ubuntu Packages

If you're using Ubuntu-based system, make sure to update your packages:

```
sudo apt-get update
```

### 4. Create a Directory to Store Data

This step is optional but you may want to create a separate directory to store your data:

```
mkdir watcher 
cd watcher
```

## Install

Running a Watcher locally is recommended for testing purposes only. For production you should use VPS or bare-metal server. This allows to increase uptime, reduce latency, and configure advanced security measures for your instance.

<!--DOCUSAURUS_CODE_TABS-->

<!-- Bare-metal Release -->

### 1. Install Dependencies

#### 1.1 Install Erlang and Elixir

```
apt-get update
git clone https://github.com/asdf-vm/asdf.git ~/.asdf --branch v0.7.4
echo -e '\n. $HOME/.asdf/asdf.sh' >> ~/.bash_profile
echo -e '\n. $HOME/.asdf/completions/asdf.bash' >> ~/.bash_profile
source ~/.bash_profile
asdf plugin-add elixir https://github.com/asdf-vm/asdf-elixir.git
asdf plugin-add erlang https://github.com/asdf-vm/asdf-erlang.git

asdf install erlang 22.3
asdf install elixir 1.10.2
asdf global erlang 22.3
asdf global elixir 1.10.2

mix do local.hex --force, local.rebar --force
```

### 1.2 Install PostgreSQL

```
apt-get install postgresql postgresql-contrib

sudo -u postgres psql <<EOF
  CREATE USER omisego_dev WITH CREATEDB ENCRYPTED PASSWORD 'omisego_dev';
  CREATE DATABASE omisego_dev OWNER 'omisego_dev';
EOF
```

### 2. Compile the Watcher

```
git clone git@github.com:omgnetwork/elixir-omg.git
cd elixir-omg
sh bin/setup # This step will take a long time, i.e. 30 mins on $5 digital ocean instance

make install-hex-rebar
make build-watcher_info-prod
```

### 3. Configure the Watcher

Save the content below to a file called `env`:

```
export ETHEREUM_NETWORK=MAINNET
export ETH_NODE=geth
export ETHEREUM_RPC_URL=https://mainnet.infura.io/v3/485372a7dd5f4be4a92f0ce2d227f376
export CHILD_CHAIN_URL=https://childchain.mainnet.v1.omg.network
export AUTHORITY_ADDRESS=0x22405c1782913fb676bc74ef54a60727b0e1026f
export TXHASH_CONTRACT=0x1c29b67acc33eba0d26f52a1e4d26625f52b53e6fbb0a4db915aeb052f7ec849
export CONTRACT_ADDRESS_PLASMA_FRAMEWORK=0x0d4c1222f5e839a911e2053860e45f18921d72ac
export DATABASE_URL=postgres://omisego_dev:omisego_dev@localhost:5432/omisego_dev
export ETHEREUM_EVENTS_CHECK_INTERVAL_MS=8000
export ETHEREUM_STALLED_SYNC_THRESHOLD_MS=300000
export ETHEREUM_BLOCK_TIME_SECONDS=15
export EXIT_PROCESSOR_SLA_MARGIN=5520
export EXIT_PROCESSOR_SLA_MARGIN_FORCED=TRUE
export NODE_HOST=127.0.0.1
export HOSTNAME=localhost
export PORT=7534
export DB_PATH=./data
export APP_ENV=local-development
export DD_DISABLED=true
export LOGGER_BACKEND=console
```

Then run `source ./env` for the environment variables to take effect. Note that these values live within your current shell's context. So you need to run `source ./env` again on system restart, exiting the shell, etc. To permanently set these values, see: https://unix.stackexchange.com/questions/117467/how-to-permanently-set-environmental-variables

Review all the configurations at https://github.com/omgnetwork/elixir-omg/blob/master/docs/deployment_configuration.md


### 4. Install the Watcher

```
_build/prod/rel/watcher_info/bin/watcher_info eval "OMG.DB.ReleaseTasks.InitKeyValueDB.run()"
```

You should see the message: `The database at "/app/.omg/data/watcher_info" has been created`


```
_build/prod/rel/watcher_info/bin/watcher_info eval "OMG.WatcherInfo.ReleaseTasks.InitPostgresqlDB.migrate()"
```

You should see a stream of logs with tables and columns inserted.

```
_build/prod/rel/watcher_info/bin/watcher_info eval "OMG.WatcherInfo.ReleaseTasks.EthereumTasks.run()"
```

You should see the message: `Running Ethereum tasks`


### 5. Run the Watcher

```
# Starts the watcher_info
_build/prod/rel/watcher_info/bin/watcher_info start

# Or to start in the background, run the command below instead
_build/prod/rel/watcher_info/bin/watcher_info start
```

You should see a stream block downloads: `Child chain seen at block #1227000. Downloading blocks [1000]`

<!-- Docker Compose -->

This method shows how to install and run Watcher and auxiliary services via Docker tooling.

### 1. Install Dependencies

#### 1.1 Install Docker

```
sudo curl -sSL https://get.docker.com/ | sh && sudo usermod -aG docker $USER && exit
```

> - `$USER` - the name of the user with root privileges used on a remote server.

#### 1.2 Install Docker Compose

Make sure to install the latest version of Docker Compose from the [official repository](https://github.com/docker/compose/releases).

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && sudo chmod +x /usr/local/bin/docker-compose && exit
```

#### 1.3 Install PostgreSQL

Some Linux servers don't have pre-installed PostgreSQL. You might need to install it manually as follows:

```
sudo apt update && sudo apt install postgresql postgresql-contrib
```

#### 1.5 Verify

To verify the installed dependencies, use the following commands:

```
docker -v && docker-compose -v
```

Example output:
```
Docker version 19.03.9, build 9d988398e7
docker-compose version 1.25.5, build 8a1c60f6
```

### 2. Set Up Configuration Files

The Watcher consists from `watcher` and `watcher_info` services. You can run `watcher` separately, however `watcher_info` relies on PostgreSQL database where it stores the network's data. All releases and corresponding Docker images (starting from `1.0.1`) can be found in our [`official repository`](https://github.com/omgnetwork/elixir-omg/releases).

#### 2.1 Configure docker-compose-watcher.yml File

Docker Compose allows defining and running multi-container Docker applications. To launch a Watcher with Compose, first, create YAML file that will contain configurations for our services with `nano` or `vim` text editor:

```
nano docker-compose-watcher.yml
```

Then, copy and paste the [required configs](/files/docker-compose-watcher.yml), save the changes with `ctrl+o` (Linux/Windows) or `control+o` (macOS) and `Enter` to confirm the changes respectively. Then exit the file with `ctrl+x` or `control+x`.

#### 2.2 Configure Environment File

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
> - `${WATCHER_IMAGE}` - the latest stable [`watcher`](https://hub.docker.com/r/omisego/watcher/tags) image (e.g. `omisego/watcher:1.0.1`).
> - `${WATCHER_INFO_IMAGE}` - the latest stable [`watcher_info`](https://hub.docker.com/r/omisego/watcher_info/tags) image (e.g. `omisego/watcher_info:1.0.1`).

Above are provided the values for `OMG NETWORK MAINNET BETA V1`. If you want to work with another environment, please refer to [`environments`](/environments).

### 3. Run a Watcher Instance

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

If you want to exit the logs without stopping containers, use `ctrl+c` or `control+c`.

<!--END_DOCUSAURUS_CODE_TABS-->

## Verify

To verify that you're fully synced, check the status of Watcher and Watcher Info:

### Watcher Info

```
curl -X POST "http://$REMOTE_SERVER:7534/status.get"
```

> - `$REMOTE_SERVER` - an IP address of your remote server. If you run the Watcher on you local machine, replace the value with `localhost`.

Example output:
```
{
  "data": {
    "byzantine_events": [],
    "contract_addr": {
      "erc20_vault": "0x070cb1270a4b2ba53c81cef89d0fd584ed4f430b",
      "eth_vault": "0x3eed23ea148d356a72ca695dbce2fceb40a32ce0",
      "payment_exit_game": "0x48d7a6bbc428bca019a560cf3e8ea5364395aad3",
      "plasma_framework": "0x0d4c1222f5e839a911e2053860e45f18921d72ac"
    },
    "eth_syncing": false,
    "in_flight_exits": [],
    "last_mined_child_block_number": 2656000,
    "last_mined_child_block_timestamp": 1598017412,
    "last_seen_eth_block_number": 10704012,
    "last_seen_eth_block_timestamp": 1598018818,
    "last_validated_child_block_number": 2656000,
    "last_validated_child_block_timestamp": 1598017412,
    "services_synced_heights": [
      {
        "height": 10704012,
        "service": "block_getter"
      },
      {
        "height": 10703999,
        "service": "challenges_responds_processor"
      },
      {
        "height": 10704000,
        "service": "competitor_processor"
      },
      {
        "height": 10704002,
        "service": "depositor"
      },
      {
        "height": 10704000,
        "service": "exit_challenger"
      },
      {
        "height": 10704000,
        "service": "exit_finalizer"
      },
      {
        "height": 10704000,
        "service": "exit_processor"
      },
      {
        "height": 10703999,
        "service": "ife_exit_finalizer"
      },
      {
        "height": 10704000,
        "service": "in_flight_exit_processor"
      },
      {
        "height": 10703999,
        "service": "piggyback_challenges_processor"
      },
      {
        "height": 10704000,
        "service": "piggyback_processor"
      },
      {
        "height": 10704012,
        "service": "root_chain_height"
      }
    ]
  },
  "service_name": "watcher_info",
  "success": true,
  "version": "1.0.3+cbbc2dc"
}
```

Notice, the server may not respond until the following line appears in the `watcher_info` logs:

```
watcher_info_1   | 2020-05-30 06:13:36.445 [info] module=Phoenix.Endpoint.CowboyAdapter function=start_link/3 ⋅Running OMG.WatcherRPC.Web.Endpoint with cowboy 1.1.2 at :::7434 (http)⋅
```

### Watcher

```
curl -X POST "http://$REMOTE_SERVER:7434/status.get"
```

> - `$REMOTE_SERVER` - an IP address of your remote server. If you run the Watcher on you local machine, replace the value with `localhost`.

Example output:
```
{
  "data": {
    "byzantine_events": [],
    "contract_addr": {
      "erc20_vault": "0x070cb1270a4b2ba53c81cef89d0fd584ed4f430b",
      "eth_vault": "0x3eed23ea148d356a72ca695dbce2fceb40a32ce0",
      "payment_exit_game": "0x48d7a6bbc428bca019a560cf3e8ea5364395aad3",
      "plasma_framework": "0x0d4c1222f5e839a911e2053860e45f18921d72ac"
    },
    "eth_syncing": false,
    "in_flight_exits": [],
    "last_mined_child_block_number": 2656000,
    "last_mined_child_block_timestamp": 1598017412,
    "last_seen_eth_block_number": 10703998,
    "last_seen_eth_block_timestamp": 1598018636,
    "last_validated_child_block_number": 2656000,
    "last_validated_child_block_timestamp": 1598017412,
    "services_synced_heights": [
      {
        "height": 10703996,
        "service": "block_getter"
      },
      {
        "height": 10703984,
        "service": "challenges_responds_processor"
      },
      {
        "height": 10703986,
        "service": "competitor_processor"
      },
      {
        "height": 10703988,
        "service": "depositor"
      },
      {
        "height": 10703984,
        "service": "exit_challenger"
      },
      {
        "height": 10703984,
        "service": "exit_finalizer"
      },
      {
        "height": 10703984,
        "service": "exit_processor"
      },
      {
        "height": 10703984,
        "service": "ife_exit_finalizer"
      },
      {
        "height": 10703986,
        "service": "in_flight_exit_processor"
      },
      {
        "height": 10703984,
        "service": "piggyback_challenges_processor"
      },
      {
        "height": 10703986,
        "service": "piggyback_processor"
      },
      {
        "height": 10703998,
        "service": "root_chain_height"
      }
    ]
  },
  "service_name": "watcher",
  "success": true,
  "version": "1.0.3+cb41972"
}
```

## Test

There are two ways to test that your Watcher is working properly:
1. Use `http://$REMOTE_SERVER:7534` as a `WATCHER_URL` value in your configs to make a transfer in your own or one of the OMG Network projects, such as [omg-js samples](https://github.com/omgnetwork/omg-js-samples). 
2. Make a transaction or another operation using [Watcher Info API](https://docs.omg.network/elixir-omg/docs-ui/?url=master%2Foperator_api_specs.yaml&urls.primaryName=master%2Finfo_api_specs).

> - `$REMOTE_SERVER` - an IP address of your remote server. If you run the Watcher on you local machine, replace the value with `localhost`.
