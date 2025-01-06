# Tạo một giao dịch đơn gian
## Phân tích các utilities đã tạo trong file ./common.ts
File common.ts sẽ chứa các hàm căn bản: như gọi Blockfrost, mở ví

```typescript
import {
  BlockfrostProvider,
  MeshTxBuilder,
  MeshWallet,
  serializePlutusScript,
  UTxO,
} from "@meshsdk/core";
import { applyParamsToScript } from "@meshsdk/core-csl";
import dotenv from "dotenv";
dotenv.config();

//Đọc các biến từ file .env 
export const blockfrost_api_key = process.env.BLOCKFROST_API_KEY || "";
export const wallet_mnemonic = process.env.MNEMONIC
  ? process.env.MNEMONIC.split(" ")
  : "solution,".repeat(24).split(",").slice(0, 24);
console.log(wallet_mnemonic)
// Mở ví dựa vào mnemonic
const blockchainProvider = new BlockfrostProvider(blockfrost_api_key);
export const wallet = new MeshWallet({
  networkId: 0,
  fetcher: blockchainProvider,
  submitter: blockchainProvider,
  key: {
    type: "mnemonic",
    words: wallet_mnemonic,
  },
});

export async function getWalletInfoForTx() {
  const utxos = await wallet.getUtxos();
  const collateral = (await wallet.getCollateral())[0];
  const walletAddress = await wallet.getChangeAddress();

  if (!utxos || utxos?.length === 0) {
    throw new Error("No utxos found");
  }
  if (!collateral) {
    throw new Error("No collateral found");
  }
  if (!walletAddress) {
    throw new Error("No wallet address found");
  }
  return { utxos, collateral, walletAddress };
}

```

## Tạo file simple.test.ts
Để chạy mà không cần giao diện Chúng ta sẽ đặt tên file là simple.test.ts với nội dung

```typescript
import { getTxBuilder, getWalletInfoForTx, wallet} from "./common";

test("Show Wallet info", async function main() {
    const { utxos, walletAddress } = await getWalletInfoForTx();
    console.log({ utxos, walletAddress });

}
)

test("Create simple transaction from Alice to Bob", async function main() {
    const { utxos, walletAddress } = await getWalletInfoForTx();
    const Bob_Addr = "addr_test1qqew6jaz63u389gwnp8w92qntetzxs6j9222pn4cnej672vazs7a6wnrseqggj4d4ur43yq9e23r4q0m879t7efyhzjq8mvzua";
    const assets: Asset[] = [{ unit: "lovelace", quantity: "2220000", },];

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


```

## Chạy test thử
Để chạy cần về home folder của chương trình
```bash
cardano@did-client:~/mesh/examples/aiken-hello-world$ bun test src/simple.test.ts 
bun test v1.1.42 (50eec002)

src/simple.test.ts:
[
  "leisure", "come", "endorse", "situate", "perfect", "slender", "helmet", "pond", "next", "host", "mean",
  "great", "program", "antenna", "ecology", "used", "scheme", "indoor", "various", "conduct", "border",
  "swamp", "spread", "spin"
]
{
  walletAddress: "addr_test1qprfh5jl5zfklakhcmeezksvrx0ylp6haa24pk5mt4tdw2f48nlr7dmpqgg3vf0626q43cfalep9s8knl03wrxnll6dslr7wfj",
}
✓ Show Wallet info [316.10ms]
txHash bc94118cf4dc9c708866cff638d9cff81562e6f33c74cf276f14e3afb452512d
✓ Create simple transaction from Alice to Bob [444.37ms]

 2 pass
 0 fail
Ran 2 tests across 1 files. [2.18s]
cardano@did-client:~/mesh/examples/aiken-hello-world$
```

