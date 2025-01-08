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
