import { deserializeAddress, mConStr1, mConStr, UTxO, stringToHex } from "@meshsdk/core";
import {
    getScript,
    getTxBuilder,
    getUtxoByTxHash,
    getWalletInfoForTx,
    wallet,
} from "./common";


test("unLock 10000000 to SC", async function main() {
    const message = "Hello, World!";
    const { utxos, walletAddress, collateral } = await getWalletInfoForTx();
    const signerHash = deserializeAddress(walletAddress).pubKeyHash;
    console.log("Deserialize Addr: ", deserializeAddress(walletAddress), "Singer hash", signerHash)
    console.log("mConStr0-Signerhash", mConStr(0, [signerHash]))
    console.log("mConStr0_HexofMess", mConStr1([stringToHex(message)]))
}
)


