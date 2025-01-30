#  Giao dịch với SC đầu ra kèm tài sản kháckhác
Lab lần này chỉ cho phép unlock fund trên hợp đồng thông minh và giao dịch có chưa một tài sản định trước 
## code Smart Contract
```aiken
validator utxo_spend() {
  spend(datum_opt: Option<Datum>,redeemer: Redeemer, own_ref: OutputReference, transaction: Transaction) {
    let token_name = to_bytearray(@"asset1mp5gwl95hknuy3pzmvfyj9ethhh3cxy44al66d")
    let Transaction { mint, inputs, .. } = transaction
    expect Some(own_input) =
      list.find(inputs, fn(input) { input.output_reference == own_ref })
      expect [Pair(asset_name, amount)] =
      mint
        |> assets.tokens(#"304c76913e8ef5d94204033ec16d9d81417bddf098fd07af7e89e9494332564e")
        |> dict.to_pairs()

    // amount == -1 && 
    expect Some(datum) = datum_opt
    let say_same = redeemer.msg == datum.msg
    asset_name == token_name && say_same
  }

  else(_) {
    fail
  }
}
```
## Giao dịch khóa tài sản
### code khóa tài sản offchain
```typescript
import { Asset, stringToHex , mConStr0 } from "@meshsdk/core";
import { getScript, getTxBuilder, getWalletInfoForTx, wallet } from "./common";
import blueprint from "../aiken-workspace/plutus.json";

export async function lockAsset(assets: Asset[], message: string): Promise<string> {
    const { utxos, walletAddress } = await getWalletInfoForTx();
    const { scriptAddr } = getScript(blueprint.validators[0].compiledCode);

    const txBuilder = getTxBuilder();
    await txBuilder
        .txOut(scriptAddr, assets)
        .txOutDatumHashValue(mConStr0([stringToHex(message)]))  //Tạo datum băng mContr0 và đính vào utxo
        .changeAddress(walletAddress)
        .selectUtxosFrom(utxos)
        .complete();
    return txBuilder.txHex;
}


test("Lock asset from SC", async function main() {
    const assets: Asset[] = [ {unit: "lovelace", quantity: "3000000", },];
    const unsignedTx = await lockAsset(assets,"Unlock");
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    console.log("txHash: https://cexplorer.io/tx/"+txHash);
 
}
)
```


### Giao dịch khóa
```bash
cardano@did-client:~/mesh/examples/aiken-hello-world$ bun test src/lock-assets.test.ts 
bun test v1.1.42 (50eec002)

src/lock-assets.test.ts:
txHash: https://cexplorer.io/tx/0520b945c972edceac1b6df5db1a09bdefa1108867ce73ee188ce8d3dfb8a084
✓ Lock asset from SC [2410.27ms]

 1 pass
 0 fail
Ran 1 tests across 1 files. [16.49s]
```

### Xem tài sản trên SC và trên ví
```bash
cardano@did-client:~/mesh/examples/aiken-hello-world$ bun test src/show_asset.test.ts 
bun test v1.1.42 (50eec002)

src/show_asset.test.ts:
Unit: lovelace, Quantity: 3000000
✓ Show asset from hash [183.85ms]
Unit: lovelace, Quantity: 1168010
9043bc35a14d5ecb72ee6566e04e153944348e589da6984d27cd9cbbd79eac69 1
Unit: 6a2e50f813c2244d4b3ddd71f70646746614279de4b3ff2466ff0c1b000de14048434d2d435747, Quantity: 1
9043bc35a14d5ecb72ee6566e04e153944348e589da6984d27cd9cbbd79eac69 1
Unit: lovelace, Quantity: 1305930
7037ca036066a14001b0a6924d86f0d24006bc679c1ee6a5981b6166deb4be52 0
Unit: 6a2e50f813c2244d4b3ddd71f70646746614279de4b3ff2466ff0c1b000643b04349503638, Quantity: 1
7037ca036066a14001b0a6924d86f0d24006bc679c1ee6a5981b6166deb4be52 0
Unit: lovelace, Quantity: 3321717
430a5d9c37c8c947c6aa333e6895fcb6922bdb488c26e03b07ed9aab5b17ddea 3
Unit: 6942ef97647684c9377b17a2ac0be12ec3779a1c2299828bf44bbbae535045414b4552, Quantity: 1
430a5d9c37c8c947c6aa333e6895fcb6922bdb488c26e03b07ed9aab5b17ddea 3
Unit: 6a2e50f813c2244d4b3ddd71f70646746614279de4b3ff2466ff0c1b000643b048434d2d435747, Quantity: 1
430a5d9c37c8c947c6aa333e6895fcb6922bdb488c26e03b07ed9aab5b17ddea 3
Unit: 6a2e50f813c2244d4b3ddd71f70646746614279de4b3ff2466ff0c1b000643b047656e546f6b656e, Quantity: 1
430a5d9c37c8c947c6aa333e6895fcb6922bdb488c26e03b07ed9aab5b17ddea 3
Unit: e0d21cb70c454a93e8597ac85eea1653bbcdd07a853e4e97d99e858e4f5247414e495a4552, Quantity: 1
430a5d9c37c8c947c6aa333e6895fcb6922bdb488c26e03b07ed9aab5b17ddea 3
Unit: lovelace, Quantity: 1146460
4300d150fe935351961fc82e4c1a13f6521424442fb22196c33b844545601b02 0
Unit: 87cbea9e19cf6a01a934b1eac7f97d0ae11b93bd5ef4e52acd8adb3b4332564e, Quantity: 500
```

## Unlock tai san va ada tu SC
### Mã nguồn unlock ofchain
```typescript
import { deserializeAddress, mConStr0, UTxO, stringToHex } from "@meshsdk/core";
import {
    getScript,
    getTxBuilder,
    getUtxoByTxHash,
    getWalletInfoForTx,
    wallet,
} from "./common";

import blueprint from "../aiken-workspace/plutus.json";

export async function unlockAsset(
    scriptUtxo: UTxO,
    message: string
): Promise<string> {
    const { utxos, walletAddress, collateral } = await getWalletInfoForTx();
    const { scriptCbor } = getScript(blueprint.validators[0].compiledCode);
    const signerHash = deserializeAddress(walletAddress).pubKeyHash;
    const assets: Asset[] = [ {unit: "lovelace", quantity: "3000000", },{ unit: "87cbea9e19cf6a01a934b1eac7f97d0ae11b93bd5ef4e52acd8adb3b4332564e", quantity: "500", },];
    //
    const Alice_Addr = "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj";
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
        .requiredSignerHash(signerHash)
        .txInRedeemerValue(mConStr0([stringToHex(message)]))
        .txInDatumValue(mConStr0([stringToHex(message)]))
        .changeAddress(walletAddress)
        .txInCollateral(
            collateral.input.txHash,
            collateral.input.outputIndex,
            collateral.output.amount,
            collateral.output.address
        )
        .selectUtxosFrom(utxos)
        .txOut(Alice_Addr, assets)  
        .complete();
    return txBuilder.txHex;
}
 
test("unLock Asset from SC", async function main() {
    //    const txHashFromDesposit = await prompt("Transaction hash from lock: ");
    const txHashFromDesposit = "0520b945c972edceac1b6df5db1a09bdefa1108867ce73ee188ce8d3dfb8a084";
    const utxo = await getUtxoByTxHash(txHashFromDesposit);
    if (utxo === undefined) throw new Error("UTxO not found");
    const unsignedTx = await unlockAsset(utxo, "Unlock");

    const signedTx = await wallet.signTx(unsignedTx);
    console.log("CBOR la: " + unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    console.log("Mã txHash: https://preview.cexplorer.io/tx/" + txHash);
}
)



```
### Chạy unlockunlock 
```bash
cardano@did-client:~/mesh/examples/aiken-hello-world$ bun test src/unlock-assets.test.ts 
bun test v1.1.42 (50eec002)

src/unlock-assets.test.ts:
CBOR la: 84a600d90102838258200520b945c972edceac1b6df5db1a09bdefa1108867ce73ee188ce8d3dfb8a084008258204300d150fe935351961fc82e4c1a13f6521424442fb22196c33b844545601b0200825820787a0792b8fe7d7707baca9b8359f941b25cf0890046812f8207ffe6e89f694d02018282583900469bd25fa0936ff6d7c6f3915a0c199e4f8757ef5550da9b5d56d729353cfe3f376102111625fa568158e13dfe42581ed3fbe2e19a7ffe9b821a002dc6c0a1581c87cbea9e19cf6a01a934b1eac7f97d0ae11b93bd5ef4e52acd8adb3ba1444332564e1901f482583900469bd25fa0936ff6d7c6f3915a0c199e4f8757ef5550da9b5d56d729353cfe3f376102111625fa568158e13dfe42581ed3fbe2e19a7ffe9b1a1361d653021a000c557d0b582097677c17d826b270e83b40df020f202dde15e20e754b7d3fb6f63621bc18c98d0dd9010281825820c1f8bd2f7ab0f98889947c7a4b1015d293c6df4e8f16784fbc268b02ef3832dd000ed9010281581c469bd25fa0936ff6d7c6f3915a0c199e4f8757ef5550da9b5d56d729a307d901028158ae58ac01010032323232323225333002323232323253330073370e900118041baa0011323322533300a3370e900018059baa00513232533300f30110021533300c3370e900018069baa0031323371e6eb8c004c03cdd50041bae3001300f37546022601e6ea80108c0440045858dd7180780098061baa00516300c001300c300d001300937540022c6014601600660120046010004601000260086ea8004526136565734aae7555cf2ab9f5742ae8904d901029fd8799f46556e6c6f636bffff05a182000082d8799f46556e6c6f636bff821a006acfc01ab2d05e00f5f6
Mã txHash: https://preview.cexplorer.io/tx/90cfb08fb50be066b91b9c310be58ab4319a94b7801a8ef83f2bcbf7c25da4cf
✓ unLock Asset from SC [3014.63ms]

 1 pass
 0 fail
Ran 1 tests across 1 files. [8.72s]
```


# Multi input va Multi Ouput làm việc với SC
Đây là giao dịch có 02 mục đích:
- Unlock tài sản từ SC trả về cho Alice
- Gửi 5 ADA từ Alice cho Bob trên cùng giao dịch

>> có thể mở ra các bài toán khách nhau với SCSC

## Code offline
```typescript
export async function unlockAsset(
    scriptUtxo: UTxO,
    message: string
): Promise<string> {
    const { utxos, walletAddress, collateral } = await getWalletInfoForTx();
    const { scriptCbor } = getScript(blueprint.validators[0].compiledCode);
    const signerHash = deserializeAddress(walletAddress).pubKeyHash;
    const assets: Asset[] = [ {unit: "lovelace", quantity: "2000000", },];
    const assets1: Asset[] = [ {unit: "lovelace", quantity: "5000000", },{ unit: "87cbea9e19cf6a01a934b1eac7f97d0ae11b93bd5ef4e52acd8adb3b4332564e", quantity: "500", },];

    const Alice_Addr = "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj";
    const Bob_Addr = "addr_test1qqew6jaz63u389gwnp8w92qntetzxs6j9222pn4cnej672vazs7a6wnrseqggj4d4ur43yq9e23r4q0m879t7efyhzjq8mvzua";
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
        .requiredSignerHash(signerHash)
        .txInRedeemerValue(mConStr0([stringToHex(message)]))
        .txInDatumValue(mConStr0([stringToHex(message)]))
        .changeAddress(walletAddress)
        .txInCollateral(
            collateral.input.txHash,
            collateral.input.outputIndex,
            collateral.output.amount,
            collateral.output.address
        )
        .selectUtxosFrom(utxos)
        .txOut(Alice_Addr, assets)  
        .txOut(Bob_Addr, assets1) 
        .complete();
    return txBuilder.txHex;
}
```
### Thực hiện Unlock

```bash
cardano@did-client:~/mesh/examples/aiken-hello-world$ bun test src/unlock-assets-bob.test.ts
bun test v1.1.42 (50eec002)

src/unlock-assets.test.ts:
CBOR la: 84a600d901028382582090cfb08fb50be066b91b9c310be58ab4319a94b7801a8ef83f2bcbf7c25da4cf00825820b6bc9ef3e3dc3c628739d61db3951a6791abada9109a89f0bff5ea94dc2d92d300825820d013a598a5f17a11bad14f746e6f0a1d08d060d84454cdce119c871e737113e601018382583900469bd25fa0936ff6d7c6f3915a0c199e4f8757ef5550da9b5d56d729353cfe3f376102111625fa568158e13dfe42581ed3fbe2e19a7ffe9b1a001e84808258390032ed4ba2d47913950e984ee2a8135e562343522a94a0ceb89e65af299d143ddd3a638640844aadaf07589005caa23a81fb3f8abf6524b8a4821a004c4b40a1581c87cbea9e19cf6a01a934b1eac7f97d0ae11b93bd5ef4e52acd8adb3ba1444332564e1901f482583900469bd25fa0936ff6d7c6f3915a0c199e4f8757ef5550da9b5d56d729353cfe3f376102111625fa568158e13dfe42581ed3fbe2e19a7ffe9b1a0af3035d021a000c61590b5820f667909219c22c812c92a8eb8faef82dbfdb8dcd3ac66f31effd2931cb472c740dd9010281825820c1f8bd2f7ab0f98889947c7a4b1015d293c6df4e8f16784fbc268b02ef3832dd000ed9010281581c469bd25fa0936ff6d7c6f3915a0c199e4f8757ef5550da9b5d56d729a307d901028158ae58ac01010032323232323225333002323232323253330073370e900118041baa0011323322533300a3370e900018059baa00513232533300f30110021533300c3370e900018069baa0031323371e6eb8c004c03cdd50041bae3001300f37546022601e6ea80108c0440045858dd7180780098061baa00516300c001300c300d001300937540022c6014601600660120046010004601000260086ea8004526136565734aae7555cf2ab9f5742ae8904d901029fd8799f48556e6c6f636b5f32ffff05a182000182d8799f48556e6c6f636b5f32ff821a006acfc01ab2d05e00f5f6
Mã txHash: https://preview.cexplorer.io/tx/cccfd8642e237ea1d7465a42d3851d1a7902ba9abb9fab46b1b12b69df02ef4b
✓ unLock Asset from SC [2612.03ms]

 1 pass
 0 fail
Ran 1 tests across 1 files. [6.98s]
```
