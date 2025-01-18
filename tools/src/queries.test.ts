import { Transaction, ForgeScript, AssetMetadata } from "@meshsdk/core";
import { getWalletInfoForTx, wallet } from "./common";  //Đã load wallet ở đâyđây
interface Amount {
    unit: string;
    quantity: string;
}

test("Truy van tai san tren vi", async function test_sc() {
    return;
    const assets = await wallet.getAssets();
    for (let i = 0; i < assets.length; i++) {
        if (assets[i].fingerprint === 'asset1mp5gwl95hknuy3pzmvfyj9ethhh3cxy44al66d') {
            console.log(assets[i]);
        }
    }

}
)

test("Truy van utxo tren có một tài sản nào đó ", async function test_sc() {
    const utxos = await wallet.getUtxos();
    const targetUnit = "914ffbd517188847646d1d71e8620a962bc45dc1ebb20b3adcd5e2cc4332564e";
    // Sử dụng hàm find để tìm phần tử
    for (let i = 0; i < utxos.length; i++) {
        const amount: Amount[] = utxos[i].output.amount
        const foundElement = amount.find(item => item.unit === targetUnit);
        if (foundElement) {
            console.log(`Unit: ${foundElement.unit}, Quantity: ${foundElement.quantity}`);
            console.log(utxos[i]);
        } else {
            console.log("Element not found.");
        }
        // In từng phần tửtử
        // amount.forEach((item) => {
        //     console.log(`Unit: ${item.unit}, Quantity: ${item.quantity}`);
        // });
        //  console.log(utxos[i]);

    }

}
)