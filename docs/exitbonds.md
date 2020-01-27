---
id: exitbonds
title: Exit Bonds
sidebar_label: Exit Bonds
---

## Exit Game Bonds
There are various bonds involved with Exit Games. These bonds provide an economic incentive for users of the OMG Network to act honestly.

These values of these bonds may change over time, the current value of a bond can be retrieved from the PlasmaFramework contract.

### Standard Exit Bond
- Bond for starting a Standard Exit.
```
  PlasmaFramework.startStandardExitBondSize()
```

### In-flight Exit Bonds
- Bond for starting an In-flight Exit.
```
  PlasmaFramework.startIFEBondSize()()
```
- Bond for piggybacking on an In-flight Exit's input or output.
```
  PlasmaFramework.piggybackBondSize()()
```