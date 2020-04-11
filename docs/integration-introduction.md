---
id: integration-introduction
title: Introduction
sidebar_label: Introduction
---

The intergration section aims to give a deeper technical explanation around the transaction lifecycle. It serves as a guide for integrators using the OMG Network.

### Code Examples
You will find numerous code examples in this section. These code examples are using the [omg-js](https://github.com/omisego/omg-js) integration library, as it abstracts a lot of the processes away from the user. 

> Best effort is given to generally explain what is going on under the hood but if you want to dive deeper into the implementation, you can check out the relevant code in their respective repositories.
>
> [Plasma Framework contracts](https://github.com/omisego/plasma-contracts)  
> [Child chain and Watcher](https://github.com/omisego/elixir-omg)  

For the sake of brevity, library imports are not included in the examples, but you will see references to the `rootChain`, `childChain` and `OmgUtil` objects from `omg-js`. For your understanding on where these objects come from, the way these objects are instantiated are shown below.

```js
import Web3 from "web3"
import { ChildChain, RootChain, OmgUtil } from "@omisego/omg-js"

const web3 = new Web3(new Web3.providers.HttpProvider(web3_provider_url))
const rootChain = new RootChain({ web3, plasmaContractAddress })
const childChain = new ChildChain({ watcherUrl })
```

> Some details have been omitted from the `omg-js` code examples for the sake of brevity (type information, optional arguments, etc.) For more information regarding the library please check out the [API documentation](https://docs.omg.network/omg-js/).

You will also see references to characters throughout the documentation. These are fictional characters used to represent the interaction between different parties on the OMG Network. Example values for what they reference in the documentation are shown below.

```text
Alice = Alices root chain address ie. '0xA013DEBD703B28AF58C2gfA0264ef70F978C5465'
AlicePrivateKey = Alices private key ie. '0x3C1FEC09834B23FFBC9A773D2GC3F03E259F5163E1FEDC0EDFE3FED325B47A62'
```
