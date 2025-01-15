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


```json
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
  {
    "input": {
      "outputIndex": 0,
      "txHash": "4300d150fe935351961fc82e4c1a13f6521424442fb22196c33b844545601b02"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "1146460"
        },
        {
          "unit": "87cbea9e19cf6a01a934b1eac7f97d0ae11b93bd5ef4e52acd8adb3b4332564e",
          "quantity": "500"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 0,
      "txHash": "773702f212270605df1797d6fda512ef32c010100e5147279081080fc89fae73"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "1150770"
        },
        {
          "unit": "4742f3620f606e3ab0fa34a8184c72f25b0676124ef65cc80487808d564945544e414d",
          "quantity": "1"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 0,
      "txHash": "c1f8bd2f7ab0f98889947c7a4b1015d293c6df4e8f16784fbc268b02ef3832dd"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "5000000"
        }
      ],
      "dataHash": "f14bd9b8836c18443f5cd80bf36f25108fdef6fde1bbfced0595e64d36d9c8ea",
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 0,
      "txHash": "928410641512ec3cb2de9a041b2914b8f92361212cbd5a554998468ba0b3e7dd"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "10000000"
        }
      ],
      "dataHash": "caa63a08fb975f2a812bc626535c67b0f14601bf361bbb6dd61a05cc6ab1d135",
      "plutusData": "d8799f454c75636964009f44426c756546507572706c65ff58194dc3b42074e1baa32076e1bb812044617461204f626a656374ff",
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 0,
      "txHash": "b72b53d2365fd0c72b00d373461c3b195854e4d109540542dba8ae909e23c362"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "5000000"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 0,
      "txHash": "1524410c99b45d732c971447ff8db8acd8ea741ac22b9a5e0207def2e509a8c6"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "5000000"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 0,
      "txHash": "511cb460e0ec578857b0d6c9de1ecb7513a677ab079e1b8699162c3f327aebf1"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "5000000"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 0,
      "txHash": "4fabe6d0360670f7d76b0133264cf2c09ed8bd41bdaa34e96ba8a915e4e70c1b"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "1155080"
        },
        {
          "unit": "a135bc7a77ea7237ca1fe534f8f0f55773a5e0214038f331e4ac6b7b4332564e2d303033",
          "quantity": "1"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 0,
      "txHash": "9a4389090dca4ceafd1c9297cec15877bc2854e5363a4adaf7fda712501d0d71"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "5000000"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 2,
      "txHash": "85b32b00141200feeaa140e7a93d1684b553c37dcf5022035f09fbbab84286f7"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "2796759"
        },
        {
          "unit": "2f764399eaea44bac92a1b3c63dc91367948051a7972813cb3fcca884841434b4154484f4e",
          "quantity": "900"
        },
        {
          "unit": "a8c484b7b84f34a89e911663ec50b534ccf874945923586fd98aba184c55434944",
          "quantity": "2"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 0,
      "txHash": "2a3f5b8f293996007b57a60f6a04bae8279f54944be0308282b400d9127485ed"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "5000000"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 2,
      "txHash": "2a3f5b8f293996007b57a60f6a04bae8279f54944be0308282b400d9127485ed"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "1875113"
        },
        {
          "unit": "07b6a58082eb90d056b494e041bfccdf63f8fb449e3a00d2ebc6b37548434d",
          "quantity": "100"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 1,
      "txHash": "6015678825a8f384ab2495fb818fce4d3736ee0c41efa476bb3af27700494f16"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "17918827"
        },
        {
          "unit": "a1e52cef575a2969269e9d7370eab3be0dd4d397dd9267fb3e8f66db000de14048414e4f49303033",
          "quantity": "1"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 0,
      "txHash": "8d5b41276abf701d1a0a27fd9a6fc37a7dc75a0174181d6cf66bff0d5410a7a5"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "1198180"
        },
        {
          "unit": "504f4925b43543963fc0689130eccfbda08e368b754408292e8e220f000de14043495036382d4e46542d54303031",
          "quantity": "1"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 0,
      "txHash": "0a93cdd6f9d40005879a08ac1a68fd0bc503b05c94b7167203bf12d4c7c5da42"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "1198180"
        },
        {
          "unit": "504f4925b43543963fc0689130eccfbda08e368b754408292e8e220f000de14043495036382d4e46542d54303032",
          "quantity": "2"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 0,
      "txHash": "711761f16aa0dd9be0cf0e909c5537047df4a6ff6e6248f8344433052ab93003"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "1198180"
        },
        {
          "unit": "504f4925b43543963fc0689130eccfbda08e368b754408292e8e220f000de14043495036382d4e46542d54303033",
          "quantity": "3"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 0,
      "txHash": "6ce6349a8ea343ac742c16a38d799c0347708c739dbeb56adab4908c4bf24533"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "1198180"
        },
        {
          "unit": "504f4925b43543963fc0689130eccfbda08e368b754408292e8e220f000de14043495036382d4e46542d54303035",
          "quantity": "1"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 0,
      "txHash": "09b6d36ef3b43e0781d5e05d65e60ae453a2d732ee0efd19509143e12230bc45"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "1180940"
        },
        {
          "unit": "504f4925b43543963fc0689130eccfbda08e368b754408292e8e220f000de140546f5f35303074616461",
          "quantity": "1"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 0,
      "txHash": "10180e0964a0b25fb2dab78f01ba4cb5de558ba3d85a507cf3216706c24aaa74"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "1400000"
        },
        {
          "unit": "25480178d21dbac327b70234b7806ab04a9fb9527039bbd9a7ddaf594332564e",
          "quantity": "38000000000000"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 1,
      "txHash": "76fd153d97857feb61ed3623ee837cfaeba7857efc968dd84e845a0e0c9ebe2a"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "328725830"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 1,
      "txHash": "43fa9f57de73ccb4a53782b40b0f05d3c88180fc2c43aa7b475cb5e63c36c5d0"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "114354073"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 1,
      "txHash": "d8e875a1605ea40071dc30e08d1a9cdc04e25effc5f7f8dd4d37fe107c8ada7b"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "154258113"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 1,
      "txHash": "c945cec875b411765db1f5e5d507a27aa1101a9d0bf7aa78725c16e1635449eb"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "137189118"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 0,
      "txHash": "e2ea65e096e405682c3058156f15b9024319ed53dbdf8ca1669e912eb236114b"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "49194059"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 0,
      "txHash": "1717fbb35de659f4802f6a8db45c5992c785bb9fc065c71b2b18f6154cd18fd1"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "2292077921"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 1,
      "txHash": "374e7c978de8ed67d46ed23d5d214408ea46ec835d03bae8b265c4f13d0c365b"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "27831826"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 1,
      "txHash": "bc94118cf4dc9c708866cff638d9cff81562e6f33c74cf276f14e3afb452512d"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "8501060"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 1,
      "txHash": "0a7dbe7210f9df9c0cd83b8bc89eda7307fdb476928b666d3d00f6d3864ee8b9"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "279872406"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 1,
      "txHash": "277067b72912177562ad2c4a0e9be2e698e04c98301911dcaa62f5356de2c48a"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "22931385"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 0,
      "txHash": "2363c4efca410bd19302a3f3abee4a17025492f5c6efd47a2ec48024680c242f"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "49193135"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 0,
      "txHash": "ebe5c688956ba60016e5b1f99b2881e31ff7d425e60bce5d83884b62471e6c13"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "29982263"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 1,
      "txHash": "882f76bae79923196426f4c4a9de5fe309136959dd5d246dfa5ad7e19a278abb"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "8663102"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 2,
      "txHash": "787a0792b8fe7d7707baca9b8359f941b25cf0890046812f8207ffe6e89f694d"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "324840820"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 1,
      "txHash": "7d2dea1f7752a779eebcf1913c4850c428b4a6269b72c645d9bc1e2502949ef4"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "31714425"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 1,
      "txHash": "d013a598a5f17a11bad14f746e6f0a1d08d060d84454cdce119c871e737113e6"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "186509622"
        }
      ],
      "scriptHash": null
    }
  },
  {
    "input": {
      "outputIndex": 1,
      "txHash": "c85913b36c2b0b9edff0cb28b89f13a050b85c0e8d114c6f88f9e05ff4b339af"
    },
    "output": {
      "address": "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
      "amount": [
        {
          "unit": "lovelace",
          "quantity": "33199112"
        }
      ],
      "scriptHash": null
    }
  }
]
```
