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
