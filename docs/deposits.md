---
id: deposits
title: Deposits
sidebar_label: Deposits
---

## Definition

A deposit involves sending tokens to the Plasma smart contract on Ethereum for subsequent use on the Plasma chain.

## Implementation

Funds can be deposited using the `deposit()` call in the `omg-js` rootchain module.

#### Example:

```
const transactionReceipt = await rootChain.deposit({
  amount: 1000,
  owner: "0xAliceAddress",
  currency: "0xd26114cd6EE289AccF82350c8d8487fedB8A0C07"
  txOptions: {
    privateKey: "0xAlicePrivateKey",
    gas: 10000000000,
    gasPrice: "1000000000"
  }
  callbacks: {
      onConfirmation: () => sendConfirmation()
  }
})
```

## Lifecycle

The `deposit()` call creates an RLP-encoded transaction string, which it will use to deposit into the ETH or ERC-20 `Vault` smart contracts.

The `Vault` in question will then emit a deposit creation event to the Plasma Chain, which generates a single UTXO corresponding the deposited amount.

After a defined finality period, this UTXO is ready for transacting on the network.

Note that in the case of an ERC-20 token deposit, the `approveToken()` method must have been called beforehand.

> For detailed function specifications, please refer to the [API documentation](https://developer.omisego.co/omg-js/#deposit).

> For further information on how a deposit transaction is signed, please see the [Appendix]().
