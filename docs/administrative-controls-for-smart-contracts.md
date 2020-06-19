---
id: administrative-controls-for-smart-contracts
title: Administrative controls for smart contracts
sidebar_label: Administrative controls for smart contracts
---

There are 3 roles of special significance in the plasma contracts:

### DEPLOYER
This is the account that deploys all of the contracts. Beyond deployment the account has no special privileges to any of the functions in the contracts.

### AUTHORITY
- [BlockController:submitBlock()](https://github.com/omisego/plasma-contracts/blob/master/plasma_framework/docs/contracts/BlockController.md#submitblock) The operator has the ability to create blocks through the child chain and publish the Merkle root of the block to the root chain contracts. Only the authority account can call this function.

### MAINTAINER

This maintainer account can be used by the operator to change the settings of the plasma contracts post deployment. The following functions are available:

- [ExitGameRegistry.registerExitGame()](https://github.com/omisego/plasma-contracts/blob/master/plasma_framework/docs/contracts/ExitGameRegistry.md#registerexitgame): This function registers a new ExitGame. New ExitGames are quarantined for the period of two times the maximum time it takes to exit funds (4 weeks). The quarantine period is so extensive because the operator could deploy a malicious exit game that could instantly transfer all exiting funds to itself. In this case users will have 2 weeks to discover that the operator is compromised and another 2 weeks to exit the funds safely to the root chain.
- [VaultRegistry.registerVault()](https://github.com/omisego/plasma-contracts/blob/master/plasma_framework/docs/contracts/VaultRegistry.md#registervault): This function registers a new Vault. New Vaults are quarantined for the period of the maximum time it takes to exit funds (2 weeks). This should give users enough time to exit their funds from the childchain to the root chain in case the operator is compromised and deploys a malicious Vault. At deployment Vaults are not quarantined and the OMG network is deployed with an ERC20 Vault and an ETH Vault.
- [Vault.setDepositVerifier()](https://github.com/omisego/plasma-contracts/blob/master/plasma_framework/docs/contracts/Vault.md#setdepositverifier): This function sets a new DepositVerifier for a Vault. If the new Deposit Verifier replaces an existing Deposit Verifier then it will be quarantined for maximum period it takes to exit funds (2 weeks). This should give users enough time to exit their funds from the childchain to the root chain in case the operator is compromised and deploys a malicious DepositVerifier.
- [PaymentInFlightExitRouter.updateStartIFEBondSize()](https://github.com/omisego/plasma-contracts/blob/master/plasma_framework/docs/contracts/PaymentInFlightExitRouter.md#updatestartifebondsize): Updates the in-flight exit bond size, taking two days to become effective. The bond size upgrade can increase to a maximum of 200% or decrease to 50% of the current bond amount.
- [PaymentInFlightExitRouter.updatePiggybackBondSize()](https://github.com/omisego/plasma-contracts/blob/master/plasma_framework/docs/contracts/PaymentInFlightExitRouter.md#updatepiggybackbondsize): Updates the piggyback bond size, taking two days to become effective. The bond size upgrade can increase to a maximum of 200% or decrease to 50% of the current bond amount.
- [PaymentStandardExitRouter.updateStartStandardExitBondSize()](https://github.com/omisego/plasma-contracts/blob/master/plasma_framework/docs/contracts/PaymentStandardExitRouter.md#updatestartstandardexitbondsize): Updates the standard exit bond size, taking two days to become effective. The bond size upgrade can increase to a maximum of 200% or decrease to 50% of the current bond amount.
- [PlasmaFramework.setVersion()](https://github.com/omisego/plasma-contracts/blob/master/plasma_framework/docs/contracts/PlasmaFramework.md#setversion): Set semantic version of the root chain contracts.
