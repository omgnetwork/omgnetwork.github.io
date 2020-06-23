---
id: version-V1-bug-bounty
title: Bug Bounty Program
sidebar_label: Bug Bounty Program
original_id: bug-bounty
---

## Introduction
The OMG network leverages Layer 2 Plasma architecture to provide high throughput and strong safety guarantees for third parties who wish to build scalable, decentralized payment apps. No technology is perfect, but we believe that working with skilled security researchers and hackers across the globe plays a crucial role in identifying weaknesses in our network and improving our security posture.

We have created a bug bounty program to allow participants to identify and submit vulnerabilities that could negatively impact OMG Network users. Successful submissions have a chance of being eligible for a bounty reward. The scope of our program and the bounty levels are provided in more detail below.

## Submission Guidelines

A vulnerability submission may qualify for a bounty under the following conditions:

### General

- Issues must be submitted through the [bounty submission form](https://omg.network/bounty). 
- The vulnerability is not disclosed publicly or to 3rd parties. A bug report can only be made public with explicit permission (We generally support public disclosure but only once it is assured that all production systems are fixed and no user funds are at risk).
- You have not used the vulnerability to receive any reward or monetary gain outside of the bug bounty program, or allowed anyone else to profit outside the bug bounty program.
- The vulnerability is not exploited on production systems. (We provide test environments that can be used to demonstrate an issue and to produce a proof of concept. If you face any limitations while testing in the audit environment, please let us know.)
- Submissions need to be made for components that are in-scope of the program. Out-of-scope submissions are not eligible for a bounty.
- Make good faith efforts to avoid privacy violations, destruction of data, and interruption or degradation of our services.
- Submissions are made without any conditions, demands, or threats.
- Bounty amount rewarded for a successful submission is at our discretion. 
- Participation is subject to our [general terms and conditions](./pdf/OMG-Network-Bug-Bounty-Program-June-2020-v2.pdf). 

### Multiples or duplicates

- Submit one vulnerability per submission, unless you need to chain vulnerabilities to demonstrate the impact.
- When duplicates occur, we will only consider awarding a bounty to the first submission that was received (provided that it can be fully reproduced).
- Known issues that have been discovered internally or through the bug bounty program by others are not eligible for any bounty rewards.
- Multiple vulnerabilities caused by one underlying issue will be rewarded with one bounty only.

Let us know as soon as possible upon discovery of a potential vulnerability, and we'll make every effort to quickly resolve the issue.

## Scope

We have set up a dedicated environment for the bug bounty program that should give participants access to all services without the need to spend any time on installation, setup and configuration. There is also no need to worry about accidentally breaking something as this environment is completely isolated from the production services. The bug bounty environment has a shorter finalization time than the production environment to be able to better test the exit flows. 

With the launch of the bug bounty program we put the following components in scope:


* Root chain contracts: [source code](https://github.com/omgnetwork/plasma-contracts)
  - ETHVault: [Tenderly](https://dashboard.tenderly.co/public/omg-network/audit-a69c763-rinkeby-lr/contract/rinkeby/0x5e791c59ca80ddd0c6e5f821050abcf1ca20fa69), [Etherscan](https://rinkeby.etherscan.io/address/0x5e791c59ca80ddd0c6e5f821050abcf1ca20fa69) 
  - ERC20Vault: [Tenderly](https://dashboard.tenderly.co/public/omg-network/audit-a69c763-rinkeby-lr/contract/rinkeby/0xfcc554663893f618d832893b875c6d3172715f4b), [Etherscan](https://rinkeby.etherscan.io/address/0xfcc554663893f618d832893b875c6d3172715f4b) 
  - PaymentExitGame: [Tenderly](https://dashboard.tenderly.co/public/omg-network/audit-a69c763-rinkeby-lr/contract/rinkeby/0xeab79468190bad7d013a3a27e2d6d01906711d13), [Etherscan](https://rinkeby.etherscan.io/address/0xeab79468190bad7d013a3a27e2d6d01906711d13) 
  - PlasmaFramework: [Tenderly](https://dashboard.tenderly.co/public/omg-network/audit-a69c763-rinkeby-lr/contract/rinkeby/0xd74c1c7a85680bb1b1661e335ec1ddb16178e01a), [Etherscan](https://rinkeby.etherscan.io/address/0xd74c1c7a85680bb1b1661e335ec1ddb16178e01a) 

* Child Chain: [URL](https://audit-childchain-rinkeby-lr.omg.network/), [source code](https://github.com/omgnetwork/elixir-omg), [Swagger](https://docs.omg.network/elixir-omg/docs-ui/?urls.primaryName=master%2Foperator_api_specs)
* Watcher Security: [URL](https://audit-watcher-rinkeby-lr.omg.network/), [source code](https://github.com/omgnetwork/elixir-omg), [Swagger](https://docs.omg.network/elixir-omg/docs-ui/?urls.primaryName=master%2Fsecurity_critical_api_specs)
* Watcher Info [URL](https://audit-watcher-info-rinkeby-lr.omg.network/), [source code](https://github.com/omgnetwork/elixir-omg), [Swagger](https://docs.omg.network/elixir-omg/docs-ui/?urls.primaryName=master%2Finfo_api_specs)
* Blockexplorer: [URL](https://audit-blockexplorer-rinkeby-lr.omg.network/), source code will be published soon 
* Web wallet: [URL](https://audit-webwallet-rinkeby-lr.omg.network/), [source code](https://github.com/omgnetwork/web-wallet)

If you are brave enough and want to set up a local test environment, you can set up contracts, child chain, and watcher with this [guide](https://github.com/omgnetwork/elixir-omg#getting-started).

The scope will be increased to other systems, so stay tuned for updates.

### Testing

To interact with the OMG Network, you can leverage [omg-js](https://github.com/omgnetwork/omg-js) the official client reference implementation. You can also check out [omg-cli](https://github.com/omgnetwork/omg-cli) a command line tool that was specifically created to make security testing more straight forward by isolating end points and by providing callable interfaces for both the contracts as well as the watcher component.

For debugging the root chain contracts in the audit environment check out our public [Tenderly project](https://dashboard.tenderly.co/public/omg-network/audit-a69c763-rinkeby-lr). 


## Issues we are interested in

We do appreciate that participants of our bug bounty program spend their time and creativity on finding issues in our systems. We are determined to review issues asap and reward successful submissions fairly and according to the risk that the vulnerability poses to the OMG network. The following list should give you some ideas for issues that we regard as high value submissions.

- Compromise funds from users who have deposited or received funds on the OMG network 
- Prevent users from depositing, withdrawing or transacting funds on the OMG network
- Double spend a UTXO on the plasma network and exit it to the root chain (Ethereum) without raising a byzantine event 
- Include invalid transactions in a block and the watcher does not raise byzantine events 
- Brick the exit priority queue of a token so that no funds can be exited anymore. Token must be ERC20 conform. 
- Gain access to a system and run OS commands aka getting shell

The list is not meant to limit or discourage other types of submissions but it should give some idea on what issues we really care about and increase the chances of a successful submission (and bounty award).

## Bounty Rewards

- The bounty amount will be determined in USD but will only be paid out in crypto. (USD-to-crypto exchange rate will be determined based on the date of notification of award)
- Participants may choose to receive their bounty in OMG or ETH
- Local laws may require us to ask for proof of your identity and other supporting documents. In addition, we will also need your ETH address
- Successful submissions are rewarded based on the severity of the issue
- We generally use CVSSv3 scoring system to understand the risk of an issue. This might not always make sense to determine the bounty reward though especially for the smart contracts
- The following table gives an overview of the reward structure:

| Component Category  | Low | Medium  | High  |  Critical |
|---|---|---|---|---|
| Primary* |  up to 500 USD |  up to 2,500 USD | up to 10,000 USD  |  up to 25,000 USD  |
| Secondary**  |  up to 100 USD | up to 500 USD  |  up to 2,000 USD | up to 5,000 USD   |

_*The plasma-contracts, the child chain and the watcher_ <br>
_**Any other components in scope that are not primary components_

## Ineligible methods

We would like to ask bug bounty participants to refrain from:

- Denial of service attacks
- Spamming
- Social engineering (including phishing) of OMG network's staff or contractors
- Any physical attempts against OMG network's property, data centers or employees

## Ineligible vulnerability categories

The following vulnerability categories are not eligible for a bounty reward:

- Outdated third-party software
- Any HTTP security header related issues
- Content Spoofing
- Issues affecting users of outdated or un-patched browsers and platforms.
- Weak TLS and SSL ciphers
- Private keys that are not used in production or public test networks 
- Credentials or API keys that are expired 

--- 

Thank you for helping keep OMG network safe and we wish you happy bug hunting! Let us know if you have questions at bounty@omg.network.