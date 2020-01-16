---
id: in-flight-exits
title: In Flight Exits
sidebar_label: In Flight Exits
---

Exits provide the ability to exit funds from the OmiseGO Network back onto the Rootchain. There are 2 types of exits, standard exits and in-flight exits. This section will only discuss in-flight exits.

A transaction is considered in-flight in these scenarios:

* Transaction has been broadcast but has not yet been included in the child chain, or the user does not have access to the block in which the transaction is included; or,
* User has access to the block, but the block is invalid (due to a dishonest operator).

> The exit protocol forms the crux of the Plasma design. This guide aims to only discuss implementation of these concepts with respect to the OmiseGO Network. If you want a deeper dive of these concepts, further discussion can be found on the [MoreVP Technical Overview](morevp-technical-overview).

### Example: Alice attempts to steal tokens from the child chain

**Scenario**

User attempts to steal tokens they sent to another user on the child chain.

* Alice sends Bob tokens on the child chain.
* Alice attempts to exit those same tokens.

**Solution**

To prevent the theft of tokens on the child chain, Alice's invalid exit can be challenged:

* When Alice starts an exit she must put up an exit bond and wait for the challenge period for the exit to be finalized.

* Meanwhile, the Watchers report that Alice is attempting to exit tokens that she has already spent.

* Anyone can now challenge Alice’s exit by proving that Alice has already spent the UTXO in a transaction.

* If the challenge is successful, Alice does not exit the tokens and the challenger is awarded the exit bond that Alice put up.
