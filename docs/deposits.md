---
id: deposits
title: Deposits
sidebar_label: Deposits
---

A deposit involves sending ETH or ERC-20 tokens to the `Vault` smart contract on the root chain for subsequent use on the OMG network.

## Implementation

Funds can be deposited using the `deposit()` call in the `omg-js` rootchain module.

#### Example:

```js
rootChain.deposit({
  amount: 1000,
  currency: "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07"
  txOptions: {
    from: Alice,
    privateKey: AlicePrivateKey
  }
  callbacks: {
    onConfirmation: () => sendConfirmation()
  }
})
```

## Lifecycle

The `deposit()` call creates an RLP-encoded transaction string, which it will use to deposit into the ETH or ERC-20 `Vault` smart contracts.

The `Vault` in question will then:

- Create a Deposit Block and submit it to the `PlasmaFramework` contract
- Emit a deposit creation event to the child chain server, which generates a single UTXO corresponding to the deposited amount.

After a defined finality period, the UTXO is ready for transacting on the network. Read more about the logic of this finality period in the [Glossary](glossary.md#deposit-finality-period)

> Note that in the case of an ERC-20 token deposit, the ERC-20 `Vault` must be pre-authorized to effect a transfer from the sender. To do this, call the `approveToken()` method with the corresponding token address and authorized amount.

> For detailed function specifications, please refer to the [API documentation](https://developer.omisego.co/omg-js/#deposit).

> For further information on how a deposit transaction is signed, please see the [Appendix]().

> F