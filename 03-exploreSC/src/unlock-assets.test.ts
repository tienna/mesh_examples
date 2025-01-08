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
    const assets_1: Asset[] = [{ unit: "lovelace", quantity: "2220000", },];
    const assets_2: Asset[] = [{ unit: "lovelace", quantity: "1110000", },];
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
        .txOut(Bob_Addr, assets_1)
        .txOut(Bob_Addr, assets_2)
        .complete();
    return txBuilder.txHex;
}

test("Show CBOR of tx", async function show_cbor() {
    return
    const txHashFromDesposit = "0a7dbe7210f9df9c0cd83b8bc89eda7307fdb476928b666d3d00f6d3864ee8b9";
    const message = "Hello, Aiken language!"
    const utxo = await getUtxoByTxHash(txHashFromDesposit);
    if (utxo === undefined) throw new Error("UTxO not found");
    const unsignedTx = await unlockAsset(utxo, message);

    console.log("CBOR la: " + unsignedTx);
})
test("unLock 50000000 to SC", async function main() {
    //    const txHashFromDesposit = await prompt("Transaction hash from lock: ");
    const txHashFromDesposit = "882f76bae79923196426f4c4a9de5fe309136959dd5d246dfa5ad7e19a278abb";
    const message = "Hello, Aiken language!"
    const utxo = await getUtxoByTxHash(txHashFromDesposit);
    if (utxo === undefined) throw new Error("UTxO not found");
    const unsignedTx = await unlockAsset(utxo, message);

    const signedTx = await wallet.signTx(unsignedTx);
    console.log("CBOR la: " + unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    console.log("Mã txHash: https://preview.cexplorer.io/tx/" + txHash);
}
)


