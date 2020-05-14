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
- macOS ?

## Minimum Hardware Requirements

The following hardware is required to run a Watcher:
- Storage: 320GB SSD
- CPU: Intel i7
- RAM: 16 GB
- 400 Mbps / 20 Mbps cable internet

## Estimated Costs

...

## Installation Process

### Step 1 - Create a Directory

It's advised to create a local directory to hold the Watcher data.

```
mkdir ~/.omg-watcher
```

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

...

### Step 5 - Run a Watcher instance

To run a Watcher instance, you need to start the required Docker containers. The parameter `-d` allows running containers in the background.

```
docker-compose -f docker-compose-watcher.yml up -d
```

To see logs, use the following command:

```
docker-compose -f docker-compose-watcher.yml logs -f
```

Example output:
```
Creating network "elixir-omg_default" with the default driver
Pulling postgres (postgres:9.6.13-alpine)...
9.6.13-alpine: Pulling from library/postgres
e7c96db7181b: Pulling fs layer
e7c96db7181b: Downloading [>                                                  ]   27.8kB/2.757MB60ba9: Download complete
e7c96db7181b: Downloading [==================>                                ]  997.8kB/e7c96db7181b: Downloading [=========================================>         ]  2.309MB/e7c96db7181b: Extracting [>                                                  ]  32.77kB/2e7c96db7181b: Extracting [=>                                                 ]   98.3kB/2e7c96db7181b: Extracting [====================================>              ]  2.032MB/2e7c96db7181b: Extracting [==================================================>]  2.757MB/2e7c96db7181b: Pull complete
ddab92d60ba9: Extracting [==================================================>]     147B/1ddab92d60ba9: Extracting [==================================================>]     147B/1ddab92d60ba9: Pull complete
8c4b0e7b82b8: Extracting [==================================================>]     115B/18c4b0e7b82b8: Extracting [==================================================>]     115B/18c4b0e7b82b8: Pull complete

```

After the Watcher is fully synced up with the Ethereum network, you can see the following output:
```
...
```
