/* global BigInt */

import _ from 'lodash'

import math from '../utils/math';
import Encryption from '../crypto/encryption';
import UserKey from '../wallet/keyStruct';
import PublicKey from './struct/pk';
import Libsnark from "./bridge/libsnark"
import Order from "./struct/order"
import SnarkInputs from "./struct/snarkInput";

let snarkClass = new Libsnark();

export const initLibSnark = async () => {
  await snarkClass.init();

  await snarkClass.readVerifyKeyFromFile('/crs/');
  await snarkClass.readProofKeyFromFile('/crs/');

}

export const testSnark = async () => {

  const sampleInput = {
    "pk_enc_peer": "2302976a6bcf8ee09d653970d4e5299318efb9a68f8e0413aea0bcc8cfbbf8cc",
    "pk_own_peer": "2064622a689dfdff3f312131a88d8cbecb319132ee1f52f9f46712ab2b811b33",
    "pk_enc_cons": "79b775e7417582a822d93018e2058a9196b2f0062150e5a27533d4b2654f465",
    "pk_own_cons": "25d035f996d233bd880cc2eba49e4035e132b48182f8f48fb9936579ec96ef2d",
    "pk_own_del": "24b6230a1d8a9de3b6f946833f05645f736f02e1d0a16fb5426dd76bec4554a2",
    "ENA": [
      "25f45ec75cb20bd889e0d505e80ddc7b5217d37f4e0a3a3cf7d4b066ab1469cf",
      "f59be76757c347e1986f4689a8b4eb1aba878c17298fe60b5ad6149232067be"
    ],
    "ENA_": [
      "191bf528a29301a2b240285a61b1d6e603ed6ae70198bc4f9dcea375839d30b7",
      "2a32133591a093fea85eb478b1dafb381eaba32cf3bdda32bfbc0fc967d87128"
    ],
    "h_k": "13ae3c96e35db160b30d3e8b7e2c80c172feea316b9c06c19467544de9681f33",
    "k_ena": "1035c62163c852131933a469b80166d2dcbc4151dff5a899a43d1b427aa6d9ec",
    "fee_del": "00000000000000000000000000000000000000000000000000000000000007d0",
    "fee_own": "0000000000000000000000000000000000000000000000000000000000017700",
    "cm_del": "1fe72c441e06f8cad648b4ca0bdf1a92c0a2dc9078ed06f0b4ddb2a479c2fbed",
    "cm_own": "9f6e9baa24dc22ad543d37b587ed2d38ab1075dccc208f0f8b31165d00e6c8d",
    "r_cm": "241cac1995d88e9d4b7fc8141f380648af52ed888eadca992922c2d0f0374b7b",
    "g_r": "7dc12ccbbe451ec188a3e94e5f1bc623c81db7664110f730131d79e6248c8a2",
    "c1": "bd6083bd3be0dffc04a3101b6a63f2d2cb79a64dd18ff72f09ea482f5ec3ed4",
    "CT_cons": [
      "29f9cd2fc4b93027fe439d7df1f477bb0e6089774261561b7c0e13137569dfd9",
      "4667f7f809201fb91f49b81ed3520c74672b19c8aae71f2dd4c937b71a19124",
      "1f8d89e5c270b35b902f078076f2da94c7de70c98f917524000ccf5989d032fd",
      "226ee11389b36167fef69087007f85a01e25fe676a0910424c239a74dfe1d334",
      "1ba81ee8870c4b317838bdc6830db6256773495079bca24827ed8e0215d44306",
      "1b6ae3fc0e38ee0e949fb5a51dd46bc5daec3183878108352b4c6b7b590188de"
    ],
    "r_enc": "407708bd37ece47241e8b3fd6912c371366a7259d0c96bb266de35923b6a0c0",
    "k_enc": "12df9557dedba152657a1528d301cb656b297de9885dce47e63002ec5782e6a0"
  }

  const proof = await snarkClass.runProof(sampleInput);
  console.log(proof);

  const vf = await snarkClass.runVerify(proof, sampleInput);
  console.log('vf:', vf);

}

export const testOrder = async () => {
  const h_k = math.randomFieldElement().toString(16)

  const consKey = UserKey.keyGen()
  const peerKey = UserKey.keyGen()
  const delKey = UserKey.keyGen()

  const pubkey_peer = PublicKey.fromUserKey(peerKey, type = 'peer')
  const pubkey_cons = PublicKey.fromUserKey(consKey, type = 'cons')
  const pubkey_del = PublicKey.fromUserKey(delKey, type = 'del')

  const symEnc = new Encryption.symmetricKeyEncryption(consKey.skEnc)

  const ENA = symEnc.Enc(BigInt(100000).toString(16))
  const ENA_ = symEnc.Enc(BigInt(2000).toString(16));

  console.log(pubkey_cons.toJson(), pubkey_del.toJson(), pubkey_peer.toJson())

  let snarkInputs = new SnarkInputs(
    pubkey_peer,
    pubkey_del,
    pubkey_cons,
    ENA,
    ENA_,
    consKey.skEnc,
    h_k
  )
  snarkInputs.init()
  console.log(snarkInputs.toJson())

  const proof = await snarkClass.runProof(snarkInputs.toSnarkInput());
  console.log(proof);

  const vf = await snarkClass.runVerify(proof, snarkInputs.toSnarkInput());
  console.log('vf:', vf);
  

  snarkInputs.toContractInput();
}



export default testSnark;