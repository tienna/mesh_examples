import { BlockfrostProvider, MeshWallet, mConStr0, Transaction } from "@meshsdk/core";
import { getScript, getTxBuilder, getWalletInfoForTx, wallet, getUtxoByTxHash } from "./common";

test("Show Wallet info", async function main() {
    const { utxos, walletAddress } = await getWalletInfoForTx();
    console.log({ walletAddress });
}
)

test("Create simple transaction from Alice to Bob", async function main() {
    const { utxos, walletAddress } = await getWalletInfoForTx();
    const Bob_Addr = "addr_test1qqew6jaz63u389gwnp8w92qntetzxs6j9222pn4cnej672vazs7a6wnrseqggj4d4ur43yq9e23r4q0m879t7efyhzjq8mvzua";
    const assets: Asset[] = [{ unit: "lovelace", quantity: "2230000", },];

    const txBuilder = getTxBuilder();
    const unsignedTx = await txBuilder
        .txOut(Bob_Addr, assets)
        .changeAddress(walletAddress)
        .selectUtxosFrom(utxos)
        .complete();


    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    console.log("txHash", txHash);
}
)

// test("Sent with metadata", async function main() {
//     const { utxos, walletAddress } = await getWalletInfoForTx();
//     const Bob_Addr = "addr_test1qqew6jaz63u389gwnp8w92qntetzxs6j9222pn4cnej672vazs7a6wnrseqggj4d4ur43yq9e23r4q0m879t7efyhzjq8mvzua";
//     const assets: Asset[] = [{ unit: "lovelace", quantity: "3000000", },];
//     const metadata = {
//         msg: [
//             'Name: Alice',
//             'Note: 3 ADA for Burger',
//         ],
//     }
//     const txBuilder = getTxBuilder();
//     const unsignedTx = await txBuilder
//         .txOut(Bob_Addr, assets)
//         .changeAddress(walletAddress)
//         .metadataValue(674, metadata)
//         .selectUtxosFrom(utxos)
//         .complete();


//     const signedTx = await wallet.signTx(unsignedTx);
//     const txHash = await wallet.submitTx(signedTx);
//     console.log("txHash", txHash);
// }
// )
