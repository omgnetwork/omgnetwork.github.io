---
id: run-watcher-locally
title: How to Run Watcher Locally
sidebar_label: Run Watcher Locally
---

*By the end of this guide you should know how to run a Watcher locally. The guide is useful for individual developers and clients who want to integrate with the OMG Network.*

## Goals

You should use this guide if you need to accomplish one of the following goals:
- Test the Watcher locally under certain conditions
- Run a local Watcher during Dapp development or software integration  
- Host a redundant Watcher node to secure the network
- Have an ability to challenge UTXOs

## Prerequisites

1. [Docker Compose](https://docs.docker.com/compose/install) > `1.17`. The docker-compose tooling allows users to run their own instance of the Watcher to connect to the OMG Network and validate transactions.

To check if you have Docker Compose installed, run the following command in your terminal:
```
docker-compose --version
```
Example output:
```
docker-compose version 1.25.5, build 8a1c60f6
```

2. A fully synced Ethereum client. 

Ethereum client is required to synchronise transactions on the OMG Network with the Ethereum Network. The easiest way to have a full ETH client is to use one of the Ethereum infrastructure providers: [Infura](https://infura.io), [QuickNode](https://www.quiknode.io/), [Fiews](https://fiews.io/), [Rivet](https://rivet.cloud/), etc.

## Supported Platforms

Watcher currently supports the following operating systems:
- Ubuntu 16.04
- Ubuntu 18.04
- macOS 11.0.0

> Note, it might be possible to run a Watcher on other OS that supports the Docker daemon and tooling. 

## Minimum Hardware Requirements

The following hardware is required to run a Watcher:
- Storage: 16GB SSD
- CPU: Intel i5
- RAM: 6GB
- Bandwidth: 20 Mbps

> The requirements are based on the network's load in Q2 2020. It is recommended to use hardware with higher performance to avoid a potential increase in the volume of transactions.

## Installation Process

### STEP 1 - Create a Directory

It's advised to create a local directory to hold the Watcher data.

<!--DOCUSAURUS_CODE_TABS-->
<!-- Linux -->
```
mkdir omg-watcher
```
<!-- macOS -->
```
mkdir omg-watcher
```
<!--END_DOCUSAURUS_CODE_TABS-->

### STEP 2 - Check TCP ports

Before attempting the start up, please ensure that you are not running any services that are listening on the following TCP ports: 7434, 7534, 5432. You can use one of the following commands to accomplish that:

<!--DOCUSAURUS_CODE_TABS-->
<!-- Linux -->
```
sudo lsof -i -n -P | grep LISTEN
sudo ss -tulpn
sudo netstat -tulpn
```
<!-- macOS -->
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
<!-- macOS -->
```
sudo lsof -i :<PORT>
sudo kill <PID>
```
<!--END_DOCUSAURUS_CODE_TABS-->

Additionally, you can check services that Docker is already using with the following command:

```
docker ps
```

Example output:

```
CONTAINER ID        IMAGE                    COMMAND                  CREATED             STATUS                 PORTS                                             NAMES
29641165a1be        omisego/ewallet:stable   "/init /entrypoint f…"   4 months ago        Up 7 hours             4369/tcp, 0.0.0.0:4000->4000/tcp, 6900-6909/tcp   omisego_ewallet_1
```

Each of the ports are used for running one of the following containers:
- 7434: `elixir-omg_watcher_1`, a light-weight Watcher to ensure security of funds deposited into the child chain.
- 7534: `elixir-omg_watcher_info_1`, a convenient and performant API to the child chain data.
- 5432: `elixir-omg_postgres_1`, a PostgreSQL database that stores transactions and contains data needed for challenges and exits.

### STEP 3 - Clone elixir-omg

Currently, child chain and Watcher exist in a single repository [`elixir-omg`](https://github.com/omgnetwork/elixir-omg). Thus, you need to clone it to start working with the Watcher.

```
git clone https://github.com/omgnetwork/elixir-omg.git
```

Make sure you're on the [`latest release`](https://github.com/omgnetwork/elixir-omg/releases) branch (e.g. `v0.4.7`). It's not recommended to use pre-releases, they may not be stable.
```
git checkout <LATEST_RELEASE_BRANCH>
```

### STEP 4 - Modify Configurations

Most of the configurations required to run a Watcher are filled with default values. If you encounter any issues (e.g. `get_block:not_found`), check the latest [network connections](environments) for chosen environment (testnet or mainnet). Also, you need to set up `ETHEREUM_RPC_URL` that corresponds with a full Ethereum node URL. To change the values, use the following command from the root of `elixir-omg` repository:

<!--DOCUSAURUS_CODE_TABS-->
<!-- Linux -->
```
vi docker-compose-watcher.yml
```
<!-- macOS -->
```
vim docker-compose-watcher.yml
```
<!--END_DOCUSAURUS_CODE_TABS-->

Alternatively, you can open `elixir-omg` repository in your preferred IDE (e.g. [VS Code](https://code.visualstudio.com/), [Atom](https://atom.io/), [IntelliJ IDEA](https://www.jetbrains.com/idea/), etc.) and change the configs there.

If you're using one of the Ethereum infrastructure providers, the connection setting `ETHEREUM_RPC_URL` should have the following format:

#### Ropsten:
<!--DOCUSAURUS_CODE_TABS-->
<!-- Infura -->
```
https://ropsten.infura.io/v3/{KEY}
```
<!-- QuickNode -->
```
https://falling-delicate-sunset.ropsten.quiknode.pro/{KEY}
```
<!-- Rivet -->
```
https://{KEY}.eth.ropsten.rpc.rivet.cloud
```
<!-- Fiews -->
```
https://cl-ropsten.fiews.io/v1/{KEY}
```
<!--END_DOCUSAURUS_CODE_TABS-->

#### Mainnet:
<!--DOCUSAURUS_CODE_TABS-->
<!-- Infura -->
```
https://mainnet.infura.io/v3/{KEY}
```
<!-- QuickNode -->
```
https://falling-delicate-sunset.mainnet.quiknode.pro/{KEY}
```
<!-- Rivet -->
```
https://{KEY}.eth.rpc.rivet.cloud
```
<!-- Fiews -->
```
https://cl-main.fiews.io/v1/{KEY}
```
<!--END_DOCUSAURUS_CODE_TABS-->

> Note, the URL paths may change by providers in the future.

### STEP 5 - Run a Watcher Instance

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

> Depending on your hardware and internet connection, the entire process can take up to an hour.

### STEP 6 - Verify You're Synced 

To verify that you're fully synced, call the following function in your terminal:

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
   },
   "service_name":"watcher",
   "success":true,
   "version":"0.4.3+4445aee"
}
```

The `last_validated_child_block_number` value should correspond with the latest validated block on the network.

### STEP 7 - Test Your Watcher

The last step is to test that your Watcher is working properly. There are two ways to do that:
1. Use `http://localtost:7353` as a `WATCHER_URL` value in your configs to make a transfer in your own or one of the OMG Network projects, such as [OMG Samples](https://github.com/omgnetwork/omg-samples). 
2. Make a transaction or other operation using [Watcher Info API](https://docs.omg.network/elixir-omg/docs-ui/?url=master%2Foperator_api_specs.yaml&urls.primaryName=master%2Finfo_api_specs).

## Useful Commands

### Check Watcher Status

When you run a Watcher locally, it's recommended to check its status daily to make sure it's synced and working properly. You can call `status.get` for more detailed output or `stats.get` for a more compact version of network statistics that also returns a status of `watcher_info` service:

```
curl -X POST "http://localhost:7534/stats.get"
```

Example output:
```
{
   "data":{
      "average_block_interval_seconds":{
         "all_time":23916.056277056276,
         "last_24_hours":750.5294117647059
      },
      "block_count":{
         "all_time":232,
         "last_24_hours":18
      },
      "transaction_count":{
         "all_time":36965,
         "last_24_hours":7873
      }
   },
   "service_name":"watcher_info",
   "success":true,
   "version":"0.4.3+4445aee"
}
```

### Leave Watcher Logs

If you're running Watcher logs, you can exit them without stopping containers with the following command:

<!--DOCUSAURUS_CODE_TABS-->
<!-- Linux -->
```
Ctrl+C
```
<!-- macOS -->
```
Cmd+C
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Start/Stop/Restart/Update Docker Containers
> All of the functions should be called from the root of the `elixir-omg` repository.

<!--DOCUSAURUS_CODE_TABS-->
<!-- Start -->

```
docker-compose -f docker-compose-watcher.yml start
```
<!-- Stop -->

```
docker-compose -f docker-compose-watcher.yml stop
```
<!-- Restart -->

If `status.get` function returns an error (e.g. `The server is not ready to handle the request`), you may want to restart Docker containers.

```
docker-compose -f docker-compose-watcher.yml restart
```
<!-- Update -->

To update docker containers, pull the latest updates from the [`latest release`](https://github.com/omgnetwork/elixir-omg/releases) branch of the `elixir-omg` repository:

```
git checkout <LATEST_RELEASE_BRANCH>
git pull
```
<!--END_DOCUSAURUS_CODE_TABS-->

### Retrieve Alarms

Alarms can be useful if you encounter issues with system memory, CPU, or storage of your Watcher. You can check your alarms with `alarm.get` function:

```
curl -X GET "http://localhost:7534/alarm.get"
```

Example output:
```
{
   "data":[
      {
         "system_memory_high_watermark":[

         ]
      }
   ],
   "service_name":"watcher_info",
   "success":true,
   "version":"0.4.3+4445aee"
}
```
