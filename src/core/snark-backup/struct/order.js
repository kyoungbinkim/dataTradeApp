import _ from 'lodash'
import CoinCommitment from "./cm"

const fee_ratio = 0.3

export default class Order {

    pk_enc_cons = undefined
    pk_own_cons = undefined
    r_cm        = undefined
    fee_del     = undefined
    fee_own     = undefined
    h_k         = undefined

    constructor(
        pk_enc_cons = undefined,
        pk_own_cons = undefined,
        r_cm        = undefined,
        fee_del     = undefined,
        fee_own     = undefined,
        h_k         = undefined
    ){
        this.pk_own_cons = pk_own_cons
        this.pk_enc_cons = pk_enc_cons
        this.r_cm        = r_cm
        this.fee_del     = fee_del
        this.fee_own     = fee_own
        this.h_k         = h_k
    }

    toJson(){
        return JSON.stringify(this, null, 2);
    }


    makeCoinCommitment(pk_own_peer, pk_own_del) {
        const cmInfo = _.merge(
            JSON.parse(this.toJson()),
            {
                'pk_own_peer' : pk_own_peer,
                'pk_own_del'  : pk_own_del
            }
        )
        console.log(cmInfo);
        return CoinCommitment.makeCm(cmInfo)
    }
}