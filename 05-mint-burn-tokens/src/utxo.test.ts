import { Asset, deserializeAddress, mConStr0 } from "@meshsdk/core";
import { getScript, getTxBuilder, getWalletInfoForTx, getSmartContractInfoForTx } from "./common";
import blueprint from "../aiken-workspace/plutus.json";

export async function lockAsset(assets: Asset[]): Promise<string> {
    const { utxos, walletAddress } = await getWalletInfoForTx();

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

test("Show how utxo, input, ref look likes", async function test_sc() {
    const { utxos, walletAddress } = await getWalletInfoForTx();
    console.log(walletAddress);
    const { scriptAddr } = getScript(blueprint.validators[0].compiledCode);
    console.log(scriptAddr)
    console.log(utxos[0])
    const { sc_utxos } = await getSmartContractInfoForTx()
    console.log(sc_utxos)
}
)
