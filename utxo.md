# UTXO trông như thế nào
Bạn có thể dùng một đoạn script sau để gọi

```typescript
test("Show how utxo, input, ref look likes", async function test_sc() {
    const { utxos, walletAddress } = await getWalletInfoForTx();
    console.log(walletAddress);
    const { scriptAddr } = getScript(blueprint.validators[0].compiledCode);
    console.log(scriptAddr)
    console.log(utxos[0])
    const { sc_utxos } = await getSmartContractInfoForTx()
    console.log(sc_utxos[0])
}
```
Và kết quả
```typescript
{
  input: {
    outputIndex: 0,
    txHash: "7037ca036066a14001b0a6924d86f0d24006bc679c1ee6a5981b6166deb4be52",
  },
  output: {
    address: "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
    amount: [
      [Object ...], [Object ...]
    ],
    dataHash: "82005820c20f58c153a23a7f11469db106b0a1296e586dce06ae166db4e46cfe9dede977",
    plutusData: undefined,
    scriptRef: undefined,
  },
}
```
