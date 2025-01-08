# tìm hiểu sâu hơn chút về SC nhé

Giờ mình sẽ yêu cầu đầu ra (outputs) của SC phải có đúng 03 nhánh output khác nhau
lúc đó hợp đồng thông minh sẽ viết  thành

```typescript
use aiken/collection/list
use aiken/crypto.{VerificationKeyHash}
use cardano/transaction.{OutputReference, Transaction}

pub type Datum {
  owner: VerificationKeyHash,
}

pub type Redeemer {
  msg: ByteArray,
}

validator hello_aiken {
  spend(
    datum_opt: Option<Datum>,
    //lấy từ tx-hash
    redeemer: Redeemer,
    // lấy từ  giao dịch
    _input: OutputReference,
    tx: Transaction,
  ) {
    expect Some(datum) = datum_opt
    let must_say_hello = redeemer.msg == "Hello, Aiken language!"
    let must_be_signed = list.has(tx.extra_signatories, datum.owner)
    let must_three_tx = list.length(tx.outputs) == 3
    must_say_hello && must_be_signed && must_three_tx
  }

  else(_) {
    fail
  }
}

```

Và hợp đồng unlock cần chỉnh sửa một chút như sau


```typescript
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

```