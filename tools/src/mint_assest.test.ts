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