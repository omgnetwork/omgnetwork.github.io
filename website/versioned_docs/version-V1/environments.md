---
id: version-V1-environments
title: Environments
sidebar_label: Environments
original_id: environments
---

These are configuration values and tools you can use to deploy various components of the OMG Network, such as Child Chain, Watcher, Watcher Info.

## OMG Network V1

> NOTE: Ropsten environment is deprecated! Use Rinkeby for development purposes.

<!--DOCUSAURUS_CODE_TABS-->
<!-- Rinkeby -->

### Tools

- Block Explorer: [https://blockexplorer.rinkeby.v1.omg.network](https://blockexplorer.rinkeby.v1.omg.network)
- Web Wallet: [https://webwallet.rinkeby.v1.omg.network](https://webwallet.rinkeby.v1.omg.network)

### Network Configurations

```
PLASMA_CONTRACTS=a69c763f
EXIT_PERIOD=86400 seconds (1 day)
WATCHER_URL=https://watcher.rinkeby.v1.omg.network
WATCHER_INFO_URL=https://watcher-info.rinkeby.v1.omg.network
```

### Watcher Configurations

```
ETHEREUM_NETWORK=RINKEBY
CHILD_CHAIN_URL=https://childchain.rinkeby.v1.omg.network
AUTHORITY_ADDRESS=0x843a9fc4481c93f40b20b7c2cefe2f072ee6116b
TXHASH_CONTRACT=0x819a52b6afcac012ba9a87129ad0d2c7664903de436da888051674b237d63996
CONTRACT_ADDRESS_PLASMA_FRAMEWORK=0xb43f53394d86deab35bc2d8356d6522ced6429b5
CONTRACT_ADDRESS_ETH_VAULT=0x4b81b5dd1da408b31acec7a4053cfd04e860685b
CONTRACT_ADDRESS_ERC20_VAULT=0x34528e2e4c8c95f092a5b554b782d9a8111319b6
CONTRACT_ADDRESS_PAYMENT_EXIT_GAME=0x6994a89b554ba3cc653111358b483a17959fa9d7
```

<!-- Mainnet -->

### Tools

- Block Explorer: [https://blockexplorer.mainnet.v1.omg.network](https://blockexplorer.mainnet.v1.omg.network)
- Web Wallet: [https://webwallet.mainnet.v1.omg.network](https://webwallet.mainnet.v1.omg.network)

### Network Configurations

```
PLASMA_CONTRACTS=a69c763
EXIT_PERIOD=604800 seconds (1 week)
WATCHER_URL=https://watcher.mainnet.v1.omg.network
WATCHER_INFO_URL=https://watcher-info.mainnet.v1.omg.network
```

### Watcher Configurations

```
ETHEREUM_NETWORK=MAINNET
CHILD_CHAIN_URL=https://childchain.mainnet.v1.omg.network
AUTHORITY_ADDRESS=0x22405c1782913fb676bc74ef54a60727b0e1026f
TXHASH_CONTRACT=0x1c29b67acc33eba0d26f52a1e4d26625f52b53e6fbb0a4db915aeb052f7ec849
CONTRACT_ADDRESS_PLASMA_FRAMEWORK=0x0d4c1222f5e839a911e2053860e45f18921d72ac
CONTRACT_ADDRESS_ETH_VAULT=0x3eed23ea148d356a72ca695dbce2fceb40a32ce0
CONTRACT_ADDRESS_ERC20_VAULT=0x070cb1270a4b2ba53c81cef89d0fd584ed4f430b
CONTRACT_ADDRESS_PAYMENT_EXIT_GAME=0x48d7a6bbc428bca019a560cf3e8ea5364395aad3
```

<!--END_DOCUSAURUS_CODE_TABS-->