import { deserializeAddress, mConStr0, UTxO, stringToHex } from "@meshsdk/core";
import {
    getScript,
    getTxBuilder,
    getUtxoByTxHash,
    getWalletInfoForTx,
    wallet,
} from "./common";

interface Asset {
    unit: string;
    quantity: string;
  }

// export async function unlockAsset(scriptUtxo: UTxO,message: string): Promise<string> {
    
//     const { scriptCbor } = getScript(blueprint.validators[0].compiledCode);
//     const signerHash = deserializeAddress(walletAddress).pubKeyHash;
//     const assets: Asset[] = [ {unit: "lovelace", quantity: "3000000", },];
//     const assets_1: Asset[] = [ {unit: "lovelace", quantity: "2000000", },];
//     //
//     const Alice_Addr = "addr_test1qqew6jaz63u389gwnp8w92qntetzxs6j9222pn4cnej672vazs7a6wnrseqggj4d4ur43yq9e23r4q0m879t7efyhzjq8mvzua";
//     const Bob_Addr = "addr_test1qqew6jaz63u389gwnp8w92qntetzxs6j9222pn4cnej672vazs7a6wnrseqggj4d4ur43yq9e23r4q0m879t7efyhzjq8mvzua";
// }


test("Show asset from hash", async function main() {
     
    //    const txHashFromDesposit = await prompt("Transaction hash from lock: ");
    const txHash_sc = "0520b945c972edceac1b6df5db1a09bdefa1108867ce73ee188ce8d3dfb8a084";
    const utxo_sc = await getUtxoByTxHash(txHash_sc);
    if (utxo_sc === undefined) throw new Error("UTxO not found");
    utxo_sc.output.amount.forEach((asset) => {
        console.log(`Unit: ${asset.unit}, Quantity: ${asset.quantity}`);
      });
}
)

test("Show asset from address", async function main() {
    const { utxos, walletAddress, collateral } = await getWalletInfoForTx();
    for (let i = 0; i < utxos.length; i++) {
        utxos[i].output.amount.forEach((asset) => {
            console.log(`Unit: ${asset.unit}, Quantity: ${asset.quantity}`);
            console.log(utxos[i].input.txHash, utxos[i].input.outputIndex)
          });
    }

})

