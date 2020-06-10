---
id: version-V1-environments
title: Environments
sidebar_label: Environments
original_id: environments
---

These are configuration values and tools you can use to deploy various components of the OMG Network, such as Child Chain, Watcher, Watcher Info.

## OMG Network V1

<!--DOCUSAURUS_CODE_TABS-->
<!-- Ropsten -->

### Tools

- Block Explorer: [https://blockexplorer.ropsten.v1.omg.network](https://blockexplorer.ropsten.v1.omg.network)
- Web Wallet: [https://webwallet.ropsten.v1.omg.network](https://webwallet.ropsten.v1.omg.network)

### Configurations
```
PLASMA_CONTRACTS=a69c763
EXIT_PERIOD=86400 seconds (1 day)
ETHEREUM_NETWORK=ROPSTEN
WATCHER_URL=https://watcher.ropsten.v1.omg.network
WATCHER_INFO_URL=https://watcher-info.ropsten.v1.omg.network
CHILD_CHAIN_URL=https://childchain.ropsten.v1.omg.network
AUTHORITY_ADDRESS=0xecec123f5cdbc0046a3e4d94223bb120dd3cb7b9
TXHASH_CONTRACT=0x16eaebcf186bda5a662998475ea333d1c063fa27c051d0d0e4e33194f145b543
CONTRACT_ADDRESS_PLASMA_FRAMEWORK=0x96d5d8bc539694e5fa1ec0dab0e6327ca9e680f9
CONTRACT_ADDRESS_ETH_VAULT=0x895cc6f20d386f5c0deae08b08ccfec9f821e7d9
CONTRACT_ADDRESS_ERC20_VAULT=0x18e15c2cdc003b845b056f8d6b6a91ab33d3f182
CONTRACT_ADDRESS_PAYMENT_EXIT_GAME=0x08c569c5774110eb84a80b292e6d6f039e18915a
```

<!-- Mainnet -->

### Tools

- Block Explorer: [https://blockexplorer.mainnet.v1.omg.network](https://blockexplorer.mainnet.v1.omg.network)
- Web Wallet: [https://webwallet.mainnet.v1.omg.network](https://webwallet.mainnet.v1.omg.network)

### Configurations

```
PLASMA_CONTRACTS=a69c763
EXIT_PERIOD=604800 seconds (1 week)
ETHEREUM_NETWORK=MAINNET
WATCHER_URL=https://watcher.mainnet.v1.omg.network
WATCHER_INFO_URL=https://watcher-info.mainnet.v1.omg.network
CHILD_CHAIN_URL=https://childchain.mainnet.v1.omg.network
AUTHORITY_ADDRESS=0x22405c1782913fb676bc74ef54a60727b0e1026f
TXHASH_CONTRACT=0x1c29b67acc33eba0d26f52a1e4d26625f52b53e6fbb0a4db915aeb052f7ec849
CONTRACT_ADDRESS_PLASMA_FRAMEWORK=0x0d4c1222f5e839a911e2053860e45f18921d72ac
CONTRACT_ADDRESS_ETH_VAULT=0x3eed23ea148d356a72ca695dbce2fceb40a32ce0
CONTRACT_ADDRESS_ERC20_VAULT=0x070cb1270a4b2ba53c81cef89d0fd584ed4f430b
CONTRACT_ADDRESS_PAYMENT_EXIT_GAME=0x48d7a6bbc428bca019a560cf3e8ea5364395aad3
```

<!--END_DOCUSAURUS_CODE_TABS-->