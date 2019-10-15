---
id: elixir-omg-testing
title: Testing the Application
sidebar_label: Test the Application
---


# Setting up Docker for testing and development

To set up the Docker environment to run testing and development tasks:

`docker-compose -f docker-compose.yml -f docker-compose.dev.yml run --rm --entrypoint bash elixir-omg`


# Running additional tasks

Once the shell has loaded, you can continue running additional tasks.


## Quick test (no integration tests)
`mix test`


## Longer running tests

To run longer-running integration tests (requires compiling contracts):

`mix test --only integration`


# Notes

* To run these tests with parity as a backend, set it via ETH_NODE environmental variable (default is geth):
`ETH_NODE=parity mix test --only integration`
* For other kinds of checks, refer to the CI/CD pipeline (https://circleci.com/gh/omisego/workflows/elixir-omg)
* To run a development iexREPL with all code loaded: `iex -S mix run --no-start`
 
