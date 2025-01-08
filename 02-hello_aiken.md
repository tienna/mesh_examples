# Viết một SC đơn giản

## Phần code SC
Đây là phần code SC được viết bằng ngôn ngữ Aiken
SC này có nhiệm vụ chỉ trả lại ADA đã gửi vào SC với các điều kiện sau:
- Trả về đúng người gửi
- Trả về khi Redeemer có đoạn ký tự "Hello, Aiken language!"

```Aiken

use aiken/collection/list
use aiken/crypto.{VerificationKeyHash}
use cardano/transaction.{OutputReference, Transaction}

pub type Datum {
  owner: VerificationKeyHash,
}

pub type Redeemer {
  msg: ByteArray,
}

validator hello_aiken {
  spend(
    datum_opt: Option<Datum>,
    redeemer: Redeemer,
    _input: OutputReference,
    tx: Transaction,
  ) {
    expect Some(datum) = datum_opt
    let must_say_hello = redeemer.msg == "Hello, Aiken language!"
    let must_be_signed = list.has(tx.extra_signatories, datum.owner)
    must_say_hello && must_be_signed
  }

  else(_) {
    fail
  }
}

```

## Phần code gửi ADA vào SC
```typescript
import { Asset, deserializeAddress, mConStr0 } from "@meshsdk/core";
import { getScript, getTxBuilder, getWalletInfoForTx, wallet } from "./common";
import blueprint from "../aiken-workspace/plutus.json";

export async function lockAsset(assets: Asset[]): Promise<string> {
    const { utxos, walletAddress } = await getWalletInfoForTx();
    const { scriptAddr } = getScript(blueprint.validators[0].compiledCode);
    const signerHash = deserializeAddress(walletAddress).pubKeyHash;

    const txBuilder = getTxBuilder();
    await txBuilder
        .txOut(scriptAddr, assets)
        .txOutDatumHashValue(mConStr0([signerHash])) // Tạo Datum từ signerhash và đính vào utxo
        .changeAddress(walletAddress)
        .selectUtxosFrom(utxos)
        .complete();
    return txBuilder.txHex;
}


test("Lock 1000000 to SC", async function test_sc() {
    const assets: Asset[] = [
        {
            unit: "lovelace",
            quantity: "1000000",
        },
    ];

    const unsignedTx = await lockAsset(assets);

    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    console.log("txHash: https://preview.cexplorer.io/tx/" + txHash);
}
)

```

### Phần chạy lock 1 ADA vào SC

```bash
cardano@did-client:~/mesh/examples/aiken-hello-world$ bun test src/lock-assets.test
bun test v1.1.42 (50eec002)
txHash: https://preview.cexplorer.io/tx/277067b72912177562ad2c4a0e9be2e698e04c98301911dcaa62f5356de2c48a
✓ Lock 1000000 to SC [460.79ms]

 1 pass
 0 fail
Ran 1 tests across 1 files. [1.71s]
cardano@did-client:~/mesh/examples/aiken-hello-world$ 
```


## Code Unlock ADA từ SC
```typescript
import { deserializeAddress, mConStr0, UTxO, stringToHex } from "@meshsdk/core";
import {
    getScript,
    getTxBuilder,
    getUtxoByTxHash,
    getWalletInfoForTx,
    wallet,
} from "./common";
import { prompt } from "../../common/prompt";
import blueprint from "../aiken-workspace/plutus.json";

export async function unlockAsset(
    scriptUtxo: UTxO,
    message: string
): Promise<string> {
    const { utxos, walletAddress, collateral } = await getWalletInfoForTx();
    const { scriptCbor } = getScript(blueprint.validators[0].compiledCode);
    const signerHash = deserializeAddress(walletAddress).pubKeyHash;

    const txBuilder = getTxBuilder();
    await txBuilder
        .spendingPlutusScript("V3")
        .txIn(
            scriptUtxo.input.txHash,
            scriptUtxo.input.outputIndex,
            scriptUtxo.output.amount,
            scriptUtxo.output.address
        )
        .txInScript(scriptCbor)
        .txInRedeemerValue(mConStr0([stringToHex(message)]))
        .txInDatumValue(mConStr0([signerHash]))
        .requiredSignerHash(signerHash)
        .changeAddress(walletAddress)
        .txInCollateral(
            collateral.input.txHash,
            collateral.input.outputIndex,
            collateral.output.amount,
            collateral.output.address
        )
        .selectUtxosFrom(utxos)
        .complete();
    return txBuilder.txHex;
}


test("unLock 50000000 to SC", async function main() {
    const txHashFromDesposit = await prompt("Transaction hash from lock: ");
    //const txHashFromDesposit = "0a7dbe7210f9df9c0cd83b8bc89eda7307fdb476928b666d3d00f6d3864ee8b9";
    const message = "Hello, Aiken language!"
    const utxo = await getUtxoByTxHash(txHashFromDesposit);
    if (utxo === undefined) throw new Error("UTxO not found");
    const unsignedTx = await unlockAsset(utxo, message);

    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    console.log("txHash", txHash);
}
)

```

### Thực thi unlock trên bash shell

```bash
cardano@did-client:~/mesh/examples/aiken-hello-world$ bun test src/unlock-assets.test.ts 
bun test v1.1.42 (50eec002)

src/unlock-assets.test.ts:
277067b72912177562ad2c4a0e9be2e698e04c98301911dcaa62f5356de2c48a
Transaction hash from lock: 277067b72912177562ad2c4a0e9be2e698e04c98301911dcaa62f5356de2c48a
txHash ebe5c688956ba60016e5b1f99b2881e31ff7d425e60bce5d83884b62471e6c13
✓ unLock 50000000 to SC [996.38ms]

 1 pass
 0 fail
Ran 1 tests across 1 files. [3.21s]
cardano@did-client:~/mesh/examples/aiken-hello-world$ 
```
