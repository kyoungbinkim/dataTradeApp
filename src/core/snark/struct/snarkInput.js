/* global BigInt */

import _ from 'lodash'
import types from '../../utils/types'
import mimc from '../../crypto/mimc'

import { hexStrToDec } from '../../utils/types'
import Encryption, { sCT } from '../../crypto/encryption'
import PublicKey from './pk'
import CoinCommitment from './cm'

const fee_ratio = 0.3

export default class SnarkInputs{
    /**
     * 
     * @param {PublicKey} PublicKey_peer 
     * @param {PublicKey} PublicKey_del 
     * @param {PublicKey} PublicKey_cons 
     * @param {sCT} ENA 
     * @param {sCT} ENA_ 
     * @param {String} k_ena 
     * @param {String} h_k 
     */
    constructor(
        PublicKey_peer,
        PublicKey_del,
        PublicKey_cons,
        ENA,
        ENA_,
        k_ena,
        h_k
    ){
        // this.PublicKey_cons = PublicKey_cons
        // this.PublicKey_peer = PublicKey_peer
        // this.PublicKey_del  = PublicKey_del

        this.pk_enc_peer = PublicKey_peer.pk_enc
        this.pk_own_peer = PublicKey_peer.pk_own
        this.pk_enc_cons = PublicKey_cons.pk_enc
        this.pk_own_cons = PublicKey_cons.pk_own
        this.pk_own_del  = PublicKey_del.pk_own

        this.ENA = ENA
        this.ENA_= ENA_
        this.h_k = h_k
        this.k_ena = k_ena
    }

    init() {

        const symEnc = new Encryption.symmetricKeyEncryption(this.k_ena);
        const pubEnc = new Encryption.publicKeyEncryption()
        const fee = BigInt('0x' + symEnc.Dec(this.ENA) )- BigInt('0x'+symEnc.Dec(this.ENA_),'hex' )
        console.log(symEnc.Dec(this.ENA),)
        console.log(symEnc.Dec(this.ENA_), )
        console.log('fee : ', fee.toString(10))

        this.fee_del = BigInt('2000').toString(16).padStart(64, '0')
        this.fee_own = BigInt('96000').toString(16).padStart(64, '0')
        
        console.log('fee_del : ',this.fee_del.padStart(64, '0'))
        console.log('fee_own : ',this.fee_own, '\n\n')

        const [cm, rand] = CoinCommitment.genCm(
            this.pk_own_peer,
            this.pk_own_del,
            this.pk_enc_cons,
            this.fee_own,
            this.fee_del,
            this.h_k
        )
        console.log(cm.toJson(), rand);
        this.cm_del = cm.cm_del
        this.cm_own = cm.cm_own
        this.r_cm = rand

        const [pct, r_enc, k_enc]= pubEnc.Enc(
            new Object({ pkEnc : this.pk_enc_peer }), 
            this.pk_enc_cons,
            this.pk_own_cons,
            this.r_cm,
            this.fee_own.toString(16),
            this.fee_del.toString(16),
            this.h_k
        )
        const pctList = pct.toList();
        this.g_r = pctList[0];
        this.c1  = pctList[1];
        this.CT_cons = pctList.slice(2);
        this.r_enc = r_enc
        this.k_enc = k_enc
    }

    toJson(){
        return JSON.stringify(this, null, 2)
    }

    toSnarkInput(){
        const json = JSON.parse(JSON.stringify(this, null, 2))
        json.ENA = this.ENA.toList()
        json.ENA_= this.ENA_.toList()
        return JSON.stringify(json, null, 2)
    }

    toContractInput(){
        let contractInputs = [
            "1",
            this.g_r, 
            this.c1,
            this.cm_own,
            this.cm_del,
        ]
        contractInputs = _.union(contractInputs, this.ENA.toList())
        contractInputs = _.union(contractInputs, this.ENA_.toList())
        contractInputs = _.union(contractInputs, [this.fee_del, this.fee_own])
        contractInputs = _.union(contractInputs, this.CT_cons)

        for(let i=0; i<contractInputs.length; i++){
            contractInputs[i] = hexStrToDec(contractInputs[i])
        }
        console.log(contractInputs)
        return contractInputs;
    }
}


