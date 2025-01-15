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
      [Object ...], [Object ...]   // thông tin tài sản và số lượng
    ],
    dataHash: "82005820c20f58c153a23a7f11469db106b0a1296e586dce06ae166db4e46cfe9dede977", //hash của Datum
    plutusData: undefined,
    scriptRef: undefined,
  },
}
```


```typescript
[
  {
    "input": {
      "outputIndex": 1,
      "txHash": "9043bc35a14d5ecb72ee6566e04e153944348e589da6984d27cd9cbbd79eac69"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "1168010"
        },
        {
          "unit": "6a2e50f813c2244d4b3ddd71f70646746614279de4b3ff2466ff0c1b000de14048434d2d435747",
          "quantity": "1"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 0,
      "txHash": "7037ca036066a14001b0a6924d86f0d24006bc679c1ee6a5981b6166deb4be52"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "1305930"
        },
        {
          "unit": "6a2e50f813c2244d4b3ddd71f70646746614279de4b3ff2466ff0c1b000643b04349503638",
          "quantity": "1"
        }
      ],
      "dataHash": "c20f58c153a23a7f11469db106b0a1296e586dce06ae166db4e46cfe9dede977",
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 3,
      "txHash": "430a5d9c37c8c947c6aa333e6895fcb6922bdb488c26e03b07ed9aab5b17ddea"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "3321717"
        },
        {
          "unit": "6942ef97647684c9377b17a2ac0be12ec3779a1c2299828bf44bbbae535045414b4552",
          "quantity": "1"
        },
        {
          "unit": "6a2e50f813c2244d4b3ddd71f70646746614279de4b3ff2466ff0c1b000643b047656e546f6b656e",
          "quantity": "1"
        },
        {
          "unit": "6a2e50f813c2244d4b3ddd71f70646746614279de4b3ff2466ff0c1b000643b048434d2d435747",
          "quantity": "1"
        },
        {
          "unit": "e0d21cb70c454a93e8597ac85eea1653bbcdd07a853e4e97d99e858e4f5247414e495a4552",
          "quantity": "1"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 0,
      "txHash": "a0fe01d4de6a4b90e32797dffcff56e7a1bc8e365bda8dca49b3645e38d931dc"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "1314550"
        },
        {
          "unit": "304c76913e8ef5d94204033ec16d9d81417bddf098fd07af7e89e9494332564e",
          "quantity": "200"
        },
        {
          "unit": "927b7b64eeb53921dd42597b5f8430fb9a8dde6fc594db7312ca73a848434d2d5747",
          "quantity": "100"
        }
      ],
      "scriptHash": null
    }
  },
  ]
```
