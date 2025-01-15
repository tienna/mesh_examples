# Một số tips khi lập trình với 

## tìm ra được input trùng với UTXO ref
```typescript

validator gift_card(token_name: ByteArray, utxo_ref: OutputReference) {
  spend(_d, _r, own_ref: OutputReference, transaction: Transaction) -> Bool {
    let Transaction { mint, inputs, .. } = transaction
    expect Some(own_input) = list.find(inputs, fn(input) { input.output_reference == own_ref })  // tìm ra input trùng với UTXO Ref
    expect Script(policy_id) = own_input.output.address.payment_credential  //Gán định script policy bằng địa chỉ 
 
    expect [Pair(asset_name, amount)] =
      mint                                  //số lượng token được mint
        |> assets.tokens(policy_id)         //lấy ra assets có số Policy ID trùng với policy_id đã chỉ định 
        |> dict.to_pairs()                  // ghép cặp và gán giá trị cho assets_name và amount
 
    amount == -1 && asset_name == token_name
}
}
```
