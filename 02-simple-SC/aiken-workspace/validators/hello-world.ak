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
    datum_opt: Option<Datum>, //lấy từ tx-hash
    redeemer: Redeemer,       // lấy từ  giao dịch
    _input: OutputReference,  
    tx: Transaction,
  ) {
    expect Some(datum) = datum_opt
    let must_say_hello = redeemer.msg == "Hello, Aiken language!"
    let must_be_signed = list.has(tx.extra_signatories, datum.owner)
    must_say_hello && must_be_signed
  }

  else(_) {
    fail
  }
}
