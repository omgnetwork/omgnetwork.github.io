---
id: block-explorer-status-get
title: Developing Apps on the OmiseGO Network
sidebar_label: Developing Apps on the OmiseGO Network
---

## Introduction
This page provides sample data derived from calling the `Status.get` endpoint. You'll need this information to build useful applications on the OmiseGO Network.  

## Calling `Status.get` Endpoint
The table highlights the relevant fields (including sample values) required for building applications on the OmiseGO Network:

| Field | Data |
| ---  | ---         |
| `byzantine_events`  | Byzantine events, if any. Switches network status and availability from Green to Amber |
| `contract_addr`  | Address of the smart contract  | 
| `last_seen_eth_block_number`, `last_seen_eth_block_timestamp`  | These fields provide information about the root chain block numbers that the child chain is syncing to. Values for these fields provide information to allow you to troubleshoot Ethereum/Plasma connections |
| `height:` | The child chain is composed of a number of different services/apps, and all are synced to different Ethereum block heights. |



    "data": {

        "byzantine_events": [],

        "contract_addr": "0x740ecec4c0ee99c285945de8b44e9f5bfb71eea7",

        "eth_syncing": false,

        "in_flight_exits": [],

        "last_mined_child_block_number": 1825000,

        "last_mined_child_block_timestamp": 1564450824,

        "last_seen_eth_block_number": 4823992,

        "last_seen_eth_block_timestamp": 1564489809,

        "last_validated_child_block_number": 1825000,

        "last_validated_child_block_timestamp": 1564450824,

        "services_synced_heights": [

            {

                "height": 4823992,

                "service": "block_getter"

            },

            {

                "height": 4823980,

                "service": "challenges_responds_processor"

            },

            {

                "height": 4823980,

                "service": "competitor_processor"

            },

            {

                "height": 4823982,

                "service": "convenience_deposit_processor"

            },

            {

                "height": 4823980,

                "service": "convenience_exit_processor"

            },

            {

                "height": 4823982,

                "service": "depositor"

            },

            {

                "height": 4823980,

                "service": "exit_challenger"

            },

            {

                "height": 4823980,

                "service": "exit_finalizer"

            },

            {

                "height": 4823980,

                "service": "exit_processor"

            },

            {

                "height": 4823980,

                "service": "ife_exit_finalizer"

            },

            {

                "height": 4823980,

                "service": "in_flight_exit_processor"

            },

            {

                "height": 4823980,

                "service": "piggyback_challenges_processor"

            },

            {

                "height": 4823980,

                "service": "piggyback_processor"

            },

            {

                "height": 4823992,

                "service": "root_chain_height"

            }

        ]

    },

    "success": true,

    "version": "1.0"


