use aiken/collection/dict
use aiken/collection/list
use aiken/primitive/string.{to_bytearray}
use cardano/assets.{PolicyId, from_asset, zero}
use cardano/transaction.{OutputReference, Transaction} as tx
 
pub type Datum {
  msg: ByteArray,
}

pub type Redeemer {
  msg: ByteArray,
}

validator utxo_spend() {
  spend(datum_opt: Option<Datum>,redeemer: Redeemer, own_ref: OutputReference, transaction: Transaction) {
    let token_name = to_bytearray(@"asset1mp5gwl95hknuy3pzmvfyj9ethhh3cxy44al66d")
    let Transaction { mint, inputs, .. } = transaction
    expect Some(own_input) =
      list.find(inputs, fn(input) { input.output_reference == own_ref })
      expect [Pair(asset_name, amount)] =
      mint
        |> assets.tokens(#"304c76913e8ef5d94204033ec16d9d81417bddf098fd07af7e89e9494332564e")
        |> dict.to_pairs()

    // amount == -1 && 
    expect Some(datum) = datum_opt
    let say_same = redeemer.msg == datum.msg
    asset_name == token_name && say_same
  }

  else(_) {
    fail
  }
}