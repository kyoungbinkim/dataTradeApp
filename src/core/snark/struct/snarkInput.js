import types from '../../utils/types'

export default class SnarkInput {

    constructor(
        g_r,
        c1,
        cm_own,
        cm_del,
        ENA,
        ENA_,
        fee_del,
        fee_own,
        CT_r,
        CT_cons,
        h_k,
        r_cm,
        k_ena,
        r_enc,
        k_enc,
        pk_enc_cons,
        pk_enc_peer,
        pk_own_cons,
        pk_own_peer,
        pk_own_del
    ) 
    {
        this.g_r        =g_r
        this.c1         =c1
        this.cm_own     =cm_own
        this.cm_del     =cm_del
        this.ENA        =ENA
        this.ENA_       =ENA_
        this.fee_del    =fee_del
        this.fee_own    =fee_own
        this.CT_r       =CT_r
        this.CT_cons    =CT_cons
        this.h_k        =h_k
        this.r_cm       =r_cm
        this.k_ena      =k_ena
        this.r_enc      =r_enc
        this.k_enc      =k_enc
        this.pk_enc_cons=pk_enc_cons
        this.pk_enc_peer=pk_enc_peer
        this.pk_own_cons=pk_own_cons
        this.pk_own_peer=pk_own_peer
        this.pk_own_del =pk_own_del
    }

}