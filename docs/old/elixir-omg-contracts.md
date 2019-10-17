---
id: elixir-omg-contracts
title: Contracts
sidebar_label: Contracts
---


# Overview
OmiseGO Network uses contract code from the [contracts repo](http://github.com/omisego/plasma-contracts).

Code from a particular branch in that repo is used, see [one of mix.exs configuration files for details](https://github.com/omisego/elixir-omg/blob/master/apps/omg_eth/mix.exs).

Contract code is downloaded automatically when getting dependencies of the Mix application with mix deps.get.

You can find the downloaded version of that code under deps/plasma_contracts.

# Installing dependencies and compiling contracts

## Install dependencies
sudo apt-get install libssl-dev solc
Contracts will compile automatically as a regular mix dependency.

## Compile contracts
To compile contracts manually
mix deps.compile plasma_contracts
