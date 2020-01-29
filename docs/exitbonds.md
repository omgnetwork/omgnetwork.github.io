---
id: exitbonds
title: Exit Bonds
sidebar_label: Exit Bonds
---

Bonds form a core element of the Plasma "exit game". 

The various bond(s) committed by an exiting user can be awarded to another user who proves that the given exit is non-canonical. They act  as an incentive mechanism for users of the OMG Network to exit honestly and challenge dishonest exits. 

There are three types of bonds: 

* The Standard Exit Bond (committed to start a Standard Exit)
* The In-Flight Exit Bond (committed to start an In-Flight Exit)
* The Piggyback Bond (committed to piggyback on an In-Flight Exit and claim an associated UTXO)

** How is the size of a bond calculated? **

The bond is currently fixed at an amount estimated to cover the gas cost of submitting a challenge. 

This amount can be updated by the operator to stay aligned with changes in gas price and gas cost. To protect against a malicious operator setting an unreasonably high or low bond size, the following restrictions are placed on these updates: 

- The current bond size can only be modified by +/- 50%.
- A *vacatio legis* period of 2 days until the new bond size takes effect.

Modeling the "correct" size of the exit bond remains an ongoing area of research. 

** Why do we have separate exit and piggyback bonds? ** 


** Can an honest user lose his or her bond? ** 


### Standard Exit Bond
- Bond for starting a Standard Exit.
```
  PlasmaFramework.startStandardExitBondSize()
```

### In-flight Exit Bonds
- Bond for starting an In-flight Exit.
```
  PlasmaFramework.startIFEBondSize()
```
- Bond for piggybacking on an In-flight Exit's input or output.
```
  PlasmaFramework.piggybackBondSize()
```