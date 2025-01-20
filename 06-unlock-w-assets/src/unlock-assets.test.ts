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


