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