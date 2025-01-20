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