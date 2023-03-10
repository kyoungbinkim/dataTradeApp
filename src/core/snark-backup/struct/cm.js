// import crypto from 'crypto';

import Config from '../../utils/config';
import CurveParam from '../../crypto/curveParam';
import types from "../../utils/types";
import mimc from "../../crypto/mimc";


export default class CoinCommitment {
    constructor(
        cm_own = undefined,
        cm_del = undefined
    ) {
        this.cm_own = cm_own
        this.cm_del = cm_del
    }

    static makeCm({
        pk_own_peer,
        pk_own_del,
        pk_enc_cons,
        r_cm,
        fee_own,
        fee_del,
        h_k
    }) {
        const mimc7 = new mimc.MiMC7();

        const cm_own = mimc7.hash(pk_own_peer, r_cm, fee_own, h_k, pk_enc_cons);
        const cm_del = mimc7.hash(pk_own_del, r_cm, fee_del, h_k, pk_enc_cons);

        return new CoinCommitment(cm_own, cm_del);
    }

    static genCm({
        pk_own_peer,
        pk_own_del,
        pk_enc_cons,
        fee_own, 
        fee_del, 
        h_k, 
    }) {
        let prime = CurveParam(Config.EC_TYPE).prime
        let bitLength = parseInt(prime.toString(2).length);
        // let randomHex = '0x' + crypto.randomBytes(bitLength).toString('hex');
        let randomHex = '0x1122ffffffff'
        return this.makeCm({
            pk_own_peer : pk_own_peer,
            pk_own_del  : pk_own_del,
            pk_enc_cons : pk_enc_cons,
            r_cm        : randomHex,
            fee_own     : fee_own, 
            fee_del     : fee_del, 
            h_k         : h_k, 
        })
    }

    toJson(){
        return JSON.stringify(this, null, 2);
    }
}