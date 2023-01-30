import types from "../utils/types";
import mimc from "../crypto/mimc";


export default class CoinCommitment {
    constructor(cm_peer, cm_del){
        this.cm_peer = cm_peer
        this.cm_del  = cm_del
    }

    static makeCm(
        pk_own_peer,
        pk_own_del,
        pk_enc_cons,
        rand,
        fee_peer,
        fee_del,
        h_k
    ) {
        const mimc7 = new mimc.MiMC7();

        const cm_peer = mimc7.hash(pk_own_peer, rand, fee_peer, h_k, pk_enc_cons);
        const cm_del  = mimc7.hash(pk_own_del,  rand, fee_del,  h_k, pk_enc_cons);

        return new CoinCommitment(cm_peer, cm_del);
    }

}