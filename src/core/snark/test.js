/* global BigInt */

import _ from 'lodash'

import math from '../utils/math';
import Encryption from '../crypto/encryption';
import UserKey from '../wallet/keyStruct';
import PublicKey from './struct/pk';
import Libsnark from "./bridge/libsnark"
import Order from "./struct/order"
import SnarkInputs from "./struct/snarkInput";

const testSnark = async () => {
    let snarkClass = new Libsnark();

    await snarkClass.init();

    await snarkClass.readVerifyKeyFromFile('/crs/');
    await snarkClass.readProofKeyFromFile('/crs/');

    const sampleInput = {
        "g_r" : "137",
        "c1"  : "123",
        "cm_own" : "123",
        "cm_del" : "123",
        "ENA" : ["123", "233"],
        "ENA_" :["112", "233"],
        "fee_del" : "321",
        "fee_own" : "123",
        "CT_cons" : ["12","22","32","42","52","62"],
        "CT_r" : "123"
    }

    const proof = await snarkClass.runProof(sampleInput);
    console.log(proof);

    const vf = await snarkClass.runVerify(proof, sampleInput);
    console.log('vf:', vf);

}

export const testOrder = () => {
    const h_k = math.randomFieldElement().toString(16)

    const consKey = UserKey.keyGen()
    const peerKey = UserKey.keyGen()
    const delKey  = UserKey.keyGen()

    const pubkey_peer = PublicKey.fromUserKey(peerKey, type='peer')
    const pubkey_cons = PublicKey.fromUserKey(consKey, type='cons')
    const pubkey_del  = PublicKey.fromUserKey(delKey, type='del')

    const symEnc = new Encryption.symmetricKeyEncryption(consKey.skEnc)

    const ENA = symEnc.Enc(BigInt(100000).toString(16))
    const ENA_= symEnc.Enc(BigInt(2000).toString(16));
    
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
}



export default testSnark;