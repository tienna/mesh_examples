use aiken/collection/list
use aiken/crypto.{VerificationKeyHash}
use aiken/primitive/bytearray
use cardano/address.{Address}
use cardano/assets.{AssetName, PolicyId, flatten, lovelace_of, without_lovelace}
use cardano/minting
use cardano/transaction.{InlineDatum, Input, Output}
use cardano/tx
use validation/find

// Tìm output có chuyển ADA >price và chuyển đến địa chỉ đã cài đặt không?
pub fn find_output(
  outputs: List<Output>,
  price: Int,
  address: Address,
) -> Option<Output> {
  list.find(
    outputs,
    fn(output) {
      lovelace_of(output.value) >= price && output.address.payment_credential == address.payment_credential
    },
  )
}
