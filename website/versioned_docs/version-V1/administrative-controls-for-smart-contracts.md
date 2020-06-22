---
id: version-V1-administrative-controls-for-smart-contracts
title: Administrative controls for smart contracts
sidebar_label: Administrative controls for smart contracts
original_id: administrative-controls-for-smart-contracts
---

It is tempting to build administrative controls such as upgrade or update mechanisms into smart contracts to allow for greater flexibility. If there are valid reasons to have them is a heated topic and actively discussed in the community. Our own perspective is that administrative accounts in smart contracts are a security anti-pattern and one of the design goals of the root chain contracts is to reduce administrative abilities as much as possible. 
So where do we draw the line and what are the guiding principals around administrative controls? User funds on the plasma chain need to be as secure as if they were on the root chain and even if the operator is compromised users can still exit their funds within the defined exit period. This property must always hold under all circumstances  and any administrative controls in the root chain contracts must not violate this characteristic of Plasma.

The below list of accounts with special significance in the root chain contracts:

### DEPLOYER

The DEPLOYER account deploys all of the contracts on the root chain. Beyond deployment the account has no special privileges to any of the functions in the contracts.

### AUTHORITY

The AUTHORITY account has the ability to bundle transactions into a block and charge users a fee.

- [BlockController:activateChildChain()](https://github.com/omisego/plasma-contracts/blob/master/plasma_framework/docs/contracts/BlockController.md#activateChildChain): The operator needs to call this function before submitting the first block. 

- [BlockController:submitBlock()](https://github.com/omisego/plasma-contracts/blob/master/plasma_framework/docs/contracts/BlockController.md#submitblock): The operator uses the child chain to aggregate transactions into blocks. The Merkle root hash of each block is submitted to this function and the block itself is published off chain. A watcher who observes the block submission event can verify the validity of a block with its respective hash.

### MAINTAINER

The MAINTAINER account can be used by the operator to perform administrative actions post deployment. The following functions are available:

- [ExitGameRegistry.registerExitGame()](https://github.com/omisego/plasma-contracts/blob/master/plasma_framework/docs/contracts/ExitGameRegistry.md#registerexitgame):  Registers a new ExitGame in the ExitGameRegistry. New ExitGames are quarantined for the period of two times the maximum time it takes to exit funds (4 weeks). The quarantine period is so extensive because the operator could deploy a malicious exit game that could instantly transfer all exiting funds to itself. In this case users will have 2 weeks to discover that the operator is compromised and another 2 weeks to exit the funds safely to the root chain.
- [VaultRegistry.registerVault()](https://github.com/omisego/plasma-contracts/blob/master/plasma_framework/docs/contracts/VaultRegistry.md#registervault): Registers a new Vault in the VaultRegistry. New Vaults are quarantined for the period of the maximum time it takes to exit funds (2 weeks). This should give users enough time to exit their funds from the child chain to the root chain in case the operator is compromised and deploys a malicious Vault. At deployment Vaults are not quarantined and the OMG network by default is deployed with an ERC20 Vault and an ETH Vault.
- [Vault.setDepositVerifier()](https://github.com/omisego/plasma-contracts/blob/master/plasma_framework/docs/contracts/Vault.md#setdepositverifier): Sets a new DepositVerifier for a Vault. If the new Deposit Verifier replaces an existing Deposit Verifier then it will be quarantined for maximum period it takes to exit funds (2 weeks). This should give users enough time to exit their funds from the child chain to the root chain in case the operator is compromised and deploys a malicious DepositVerifier.
- [PaymentInFlightExitRouter.updateStartIFEBondSize()](https://github.com/omisego/plasma-contracts/blob/master/plasma_framework/docs/contracts/PaymentInFlightExitRouter.md#updatestartifebondsize): Updates the in-flight exit bond size, taking two days to become effective. The bond size upgrade can increase to a maximum of 200% or decrease to 50% of the current bond amount.
- [PaymentInFlightExitRouter.updatePiggybackBondSize()](https://github.com/omisego/plasma-contracts/blob/master/plasma_framework/docs/contracts/PaymentInFlightExitRouter.md#updatepiggybackbondsize): Updates the piggyback bond size, taking two days to become effective. The bond size upgrade can increase to a maximum of 200% or decrease to 50% of the current bond amount.
- [PaymentStandardExitRouter.updateStartStandardExitBondSize()](https://github.com/omisego/plasma-contracts/blob/master/plasma_framework/docs/contracts/PaymentStandardExitRouter.md#updatestartstandardexitbondsize): Updates the standard exit bond size, taking two days to become effective. The bond size upgrade can increase to a maximum of 200% or decrease to 50% of the current bond amount.
- [PlasmaFramework.setVersion()](https://github.com/omisego/plasma-contracts/blob/master/plasma_framework/docs/contracts/PlasmaFramework.md#setversion): Set semantic version of the root chain contracts.
