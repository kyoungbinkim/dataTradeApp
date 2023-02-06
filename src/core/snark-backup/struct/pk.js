

export default class PublicKey{
    type   = undefined
    pk_enc = undefined
    pk_own = undefined
    
    constructor(pk_own='', pk_enc='', type=''){
        this.type = type
        this.pk_enc = pk_enc
        this.pk_own = pk_own
    }

    toJson() {
        const pk_own_type = `pk_own_${this.type}`
        const pk_enc_type = `pk_enc_${this.type}`
        let pk = {}
        pk[pk_own_type] = this.pk_own
        pk[pk_enc_type] = this.pk_enc

        return JSON.stringify(pk, null, 2)
    }
}