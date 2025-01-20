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
 
test("unLock Asset from SC", async function main() {
    //    const txHashFromDesposit = await prompt("Transaction hash from lock: ");
    const txHashFromDesposit = "b6bc9ef3e3dc3c628739d61db3951a6791abada9109a89f0bff5ea94dc2d92d3";
    const utxo = await getUtxoByTxHash(txHashFromDesposit);
    if (utxo === undefined) throw new Error("UTxO not found");
    const unsignedTx = await unlockAsset(utxo, "Unlock_2");

    const signedTx = await wallet.signTx(unsignedTx);
    console.log("CBOR la: " + unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    console.log("Mã txHash: https://preview.cexplorer.io/tx/" + txHash);
}
)


