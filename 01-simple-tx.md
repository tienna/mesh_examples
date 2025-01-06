# tạo một giao dịch đơn gian
## phân tích các utilities đã tạo trong file ./common.ts

## tạo file simple.test.ts
Để chạy mà không cần giao diện Chúng ta sẽ đặt tên file là simple.test.ts với nội dung

```typesrcipt
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

## chạy test thử
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

