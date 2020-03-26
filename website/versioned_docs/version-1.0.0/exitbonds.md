---
id: version-1.0.0-exitbonds
title: Exit Bonds
sidebar_label: Exit Bonds
original_id: exitbonds
---

Bonds form a core element of the Plasma "exit game". 
 
The various bond(s) committed by an exiting user can be awarded to another user who proves that the given exit is non-canonical. They act as an incentive mechanism for users of the OMG Network to exit honestly and challenge dishonest exits. 
 
There are three types of bonds: 
 
* The Standard Exit Bond (committed to starting a Standard Exit)
* The In-Flight Exit Bond (committed to starting an In-Flight Exit)
* The Piggyback Bond (committed to piggyback on an In-Flight Exit and claim an associated UTXO)
 
**How is the size of a bond calculated?**
 
The bond is currently fixed at an amount estimated to cover the gas cost of submitting a challenge. 
 
This amount can be updated by the operator to stay aligned with changes in gas price and gas cost. To protect against a malicious operator setting an unreasonably high or low bond size, the following restrictions are placed on these updates: 
 
- The current bond size can only be modified by +/- 50%.
- A *vacatio legis* period of 2 days until the new bond size takes effect.
 
Modeling the "correct" size of the exit bond remains an ongoing area of research. 
 
**Why do we have a separate exit and piggyback bonds in an in-flight exit?** 
 
Starting an in-flight exit on a transaction and claiming its associated inputs or outputs with a `piggyback` are separate concerns. 
 
Consider a transaction `TX1` where Alice sends 0.5 ETH to Bob using an input `UTXO1` worth 1 ETH. The transaction will have two outputs: 
 
* `UTXO2` owned by Bob (0.5 ETH)
* `UTXO3` owned by Alice (0.5 ETH)
 
Either party can initiate an in-flight exit on `TX1` but *both* Alice and Bob must piggyback with a reference to their respective outputs in order to exit their funds.
 
There are also cases where a piggyback can be invalid in the context of a canonical in-flight exit.
 
Given that the concerns are separate, the bond mechanism is applied separately.