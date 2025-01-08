use aiken/collection/list
use aiken/crypto.{VerificationKeyHash}
use cardano/address.{Address}
use cardano/assets.{lovelace_of}
use cardano/transaction.{Output, OutputReference, Transaction}

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
    let platform_addr =
      address.from_verification_key(
        #"32ed4ba2d47913950e984ee2a8135e562343522a94a0ceb89e65af29",
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
