# Baì này hướng dẫn bạn cách mint & burn token

```typescript
import { Transaction, ForgeScript, AssetMetadata } from "@meshsdk/core";
import { getWalletInfoForTx, wallet } from "./common";  //Đã load wallet ở đâyđây


test("Mint C2VN tokens", async function test_sc() {

    const { utxos, walletAddress } = await getWalletInfoForTx();

    // create forgingScript
    const forgingScript = ForgeScript.withOneSignature(walletAddress);
    const assetMetadata: AssetMetadata = {
        "name": "C2VN",
        "image": "ipfs://QmboHKkw1jokVGRAQvWKonSmDdjwGV7ZiGTmdvfkwWdCWk",
        "mediaType": "image/jpg",
        "description": "This NFT was minted by cardano2vn.io"
    };
    const asset: Mint = {
        assetName: 'C2VN',
        assetQuantity: '10',
        metadata: assetMetadata,
        label: '721',
        recipient: 'addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj'
    };

    const tx = new Transaction({ initiator: wallet });
    tx.mintAsset(
        forgingScript,
        asset,
    );

    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    console.log("Truy vấn giao dịch tại: https://preview.cexplorer.io/tx/" + txHash)
}
)

```

Sau đây là mã một số giao dịch đã thực hiện

```bash
Truy vấn giao dịch tại: https://preview.cexplorer.io/tx/ddb950fc160d3a858687bdbdcc669cd70e21e9bd0b7d63dab516672f30fe8729

Truy vấn giao dịch tại: https://preview.cexplorer.io/tx/f3811a808a52cb93facb05894e68a20f32f348f116d6bb10b6a24abf0f90f073

```

# giao dich burn

```typescript
import { Transaction, ForgeScript, AssetMetadata } from "@meshsdk/core";
import { getWalletInfoForTx, wallet } from "./common";  //Đã load wallet ở đâyđây


test("Mint C2VN tokens", async function test_sc() {

    const { walletAddress } = await getWalletInfoForTx();
    // create forgingScript
    const forgingScript = ForgeScript.withOneSignature(walletAddress);
    const asset: Asset = {
        unit: '914ffbd517188847646d1d71e8620a962bc45dc1ebb20b3adcd5e2cc4d657368546f6b656e',
        quantity: '1',
    };

    const tx = new Transaction({ initiator: wallet });
    tx.burnAsset(forgingScript, asset);
    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    console.log("Truy vấn giao dịch burn tại: https://preview.cexplorer.io/tx/" + txHash)
}
)
```

Mã giao dịch là
```bash
cardano@did-client:~/mesh/examples/aiken-hello-world$ bun test src/burn_assest.test.ts 
bun test v1.1.42 (50eec002)

src/burn_assest.test.ts:
Truy vấn giao dịch burn tại: https://preview.cexplorer.io/tx/bd9399a32bc516c83186e72a60376823986355fb62c2bb64fd9a67deb8dd46ee
✓ Mint C2VN tokens [3213.69ms]

 1 pass
 0 fail
Ran 1 tests across 1 files. [7.19s]
```