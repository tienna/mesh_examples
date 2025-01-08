# Bài tìm hiểu về output của tx trong Smart Contract
Ở bài này chúng ta sẽ yêu cầu người muốn unlock được ADA đã gửi và SC phải làm mấy việc:
- Gửi remeemder là "Unlock my ADA!"
- Gửi 2ADA (2000000 lovelace) tới đúng địa chỉ cố định.
để làm việc này SC được viết lại như sau

```typescript
validator hello_aiken {
  spend(
    datum_opt: Option<Datum>,
    //lấy từ tx-hash
    redeemer: Redeemer,
    // lấy từ  giao dịch
    _input: OutputReference,
    tx: Transaction,
  ) {
    let platform_addr =
      address.from_verification_key(
        #"32ed4ba2d47913950e984ee2a8135e562343522a94a0ceb89e65af29",  //địa chỉ paymentcredential của BOB ở dạng hex - tham khảo https://laceanatomy.com/address
      )
    expect Some(datum) = datum_opt
    let must_say_hello = redeemer.msg == "Unlock my ADA!"
    let must_be_signed = list.has(tx.extra_signatories, datum.owner)
    must_say_hello && must_be_signed && check_tips(
      tx.outputs,
      2000000,
      platform_addr,
    )
  }

  else(_) {
    fail
  }
}

pub fn check_tips(outputs: List<Output>, price: Int, address: Address) -> Bool {
  list.any(
    outputs,
    fn(output) {
      lovelace_of(output.value) == price && output.address.payment_credential == address.payment_credential
    },
  )
}

```

Sau đó hàm unlock phía offchain code cũng cần chỉnh sửa lại

```typescript
export async function unlockAsset(
    scriptUtxo: UTxO,
    message: string
): Promise<string> {
    const { utxos, walletAddress, collateral } = await getWalletInfoForTx();
    const { scriptCbor } = getScript(blueprint.validators[0].compiledCode);
    const signerHash = deserializeAddress(walletAddress).pubKeyHash;
    const assets: Asset[] = [{ unit: "lovelace", quantity: "2000000", },];
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
        .txOut(Bob_Addr, assets)
        .complete();
    return txBuilder.txHex;
}


test("unLock 50000000 to SC", async function main() {
    //    const txHashFromDesposit = await prompt("Transaction hash from lock: ");
    const txHashFromDesposit = "d013a598a5f17a11bad14f746e6f0a1d08d060d84454cdce119c871e737113e6";
    const message = "Unlock my ADA!"
    const utxo = await getUtxoByTxHash(txHashFromDesposit);
    if (utxo === undefined) throw new Error("UTxO not found");
    const unsignedTx = await unlockAsset(utxo, message);

    const signedTx = await wallet.signTx(unsignedTx);
    console.log("CBOR la: " + unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    console.log("Mã txHash: https://preview.cexplorer.io/tx/" + txHash);
}
)

```
Phiên lock có kết quả
```bash
cardano@did-client:~/mesh/examples/aiken-hello-world$ bun test src/lock-assets.t
bun test v1.1.42 (50eec002)

src/lock-assets.test.ts:
txHash: https://preview.cexplorer.io/tx/d013a598a5f17a11bad14f746e6f0a1d08d060d84454cdce119c871e737113e6
✓ Lock 1000000 to SC [743.18ms]

 1 pass
 0 fail
Ran 1 tests across 1 files. [2.55s]
cardano@did-client:~/mesh/examples/aiken-hello-world$ 
```
và phiên chạy test sẽ có kết quả như sau

```bash
cardano@did-client:~/mesh/examples/aiken-hello-world$ bun test src/unlock-assets.test.ts 
bun test v1.1.42 (50eec002)

src/unlock-assets.test.ts:
✓ Show CBOR of tx [0.11ms]
CBOR la: 84a600d9010282825820b0b91c95e46e08a41123a4537c76b6190f6801cf39d98bf7de57b3ea7c4bf4e701825820d013a598a5f17a11bad14f746e6f0a1d08d060d84454cdce119c871e737113e60001828258390032ed4ba2d47913950e984ee2a8135e562343522a94a0ceb89e65af299d143ddd3a638640844aadaf07589005caa23a81fb3f8abf6524b8a41a001e848082583900469bd25fa0936ff6d7c6f3915a0c199e4f8757ef5550da9b5d56d729353cfe3f376102111625fa568158e13dfe42581ed3fbe2e19a7ffe9b1a01fa9408021a000ca27d0b58205117d46e4516a3a401db1f6e3cec390555d237d6cb6f873ec87f4d5605d04c180dd9010281825820c1f8bd2f7ab0f98889947c7a4b1015d293c6df4e8f16784fbc268b02ef3832dd000ed9010281581c469bd25fa0936ff6d7c6f3915a0c199e4f8757ef5550da9b5d56d729a307d901028159029b590298010100323232323232322533300232323232325332330083001300937540042646644a66601666e1d2000300c375400c26464a666020602600426464a66601e66e1d20003010375400a26464a66602266e3cdd7180118099baa00c48810e556e6c6f636b206d7920414441210015333011001132330010013758602e6030603060286ea8038894ccc05800452809991299980aa99980a99b87325333016300f301737540022900009bad301b3018375400264a66602c601e602e6ea80045300103d87a8000132330010013756603860326ea8008894ccc06c004530103d87a8000132333222533301c33722911000031533301c3371e9101000031300f33020375000497ae014c0103d87a8000133006006001375c60340026eb4c06c004c07c008c074004c8cc004004dd5980d980e180c1baa00322533301a00114c103d87a8000132333222533301b33722911000031533301b3371e9101000031300e3301f374c00497ae014c0103d87a8000133006006001375c60320026eacc068004c078008c070005208092f40113375e600c602e6ea8c018c05cdd50011803180b9baa00714a029444cc010010004c060004c0640045280a503322323300100100322533301700114a026644a66602c66e3c0080145288998020020009bae3019001301a0013758602a602c602c602c602c602c602c602c602c60246ea8030dd7180098091baa30153012375400c4602a0022c60026602460026602498011e581c32ed4ba2d47913950e984ee2a8135e562343522a94a0ceb89e65af29004bd7019809260103d87a80004bd701ba54800058dd7180880098069baa00616300e001300e300f001300a37540046e1d200216300b300c003300a002300900230090013004375400229309b2b2b9a5573aaae7955cfaba05742ae88104d901029fd8799f581c469bd25fa0936ff6d7c6f3915a0c199e4f8757ef5550da9b5d56d729ffff05a182000182d8799f4e556e6c6f636b206d792041444121ff821a006acfc01ab2d05e00f5f6
Mã txHash: https://preview.cexplorer.io/tx/c85913b36c2b0b9edff0cb28b89f13a050b85c0e8d114c6f88f9e05ff4b339af
✓ unLock 50000000 to SC [948.42ms]

 2 pass
 0 fail
Ran 2 tests across 1 files. [2.62s]

```