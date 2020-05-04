---
id: deposits
title: Deposit Funds
sidebar_label: Deposit Funds
---

A deposit involves sending ETH or ERC-20 tokens to the `Vault` smart contract on the root chain for subsequent use on the OMG network.

## Implementation

Funds can be deposited using the `deposit()` call in the `omg-js` rootChain module.

#### Example:

```js
async function makeDeposit () {
  // Only in the case of an ERC-20 token deposit, the ERC-20 `Vault` must be pre-authorized to effect a transfer from the sender. 
  await rootChain.approveToken({
    erc20Address,
    amount,
    txOptions: {
      from: Alice,
      privateKey: AlicePrivateKey
    }
  })
  
  return rootChain.deposit({
    amount,
    currency,
    txOptions: {
      from: Alice,
      privateKey: AlicePrivateKey
    }
  })
}
```

## Lifecycle

The `deposit()` call creates an RLP-encoded transaction string, which it will use to deposit into the ETH or ERC-20 `Vault` smart contracts.

The `Vault` in question will then:

- Create a Deposit Block and submit it to the `PlasmaFramework` contract
- Emit a deposit creation event to the child chain server, which generates a single UTXO corresponding to the deposited amount.

After a defined finality period, the UTXO is ready for transacting on the network. Read more about the logic of this finality period in the [Glossary](glossary#deposit-finality-period)
