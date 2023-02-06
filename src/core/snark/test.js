import _ from 'lodash'

import Libsnark from "./bridge/libsnark"
import Order from "./struct/order"
import SnarkInput from "./struct/snarkInput";

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

    console.log("hi" , Number.parseInt(100 * 0.3))

    const ord = new Order(
        1,
        1,
        1,
        1,
        1,
        1
    )
    console.log(ord.toJson());
    const cm = ord.makeCoinCommitment(1, 1);
    console.log(cm.toJson());

    const snarkInputs = new SnarkInput();
    snarkInputs.uploadOrder(ord);

    console.log(snarkInputs.toJson())
}

export default testSnark;