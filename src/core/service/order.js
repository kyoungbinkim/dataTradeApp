import _ from 'lodash'
import DBInstance from "../../db";
import { getServerKeys } from "../http/serverQuery"
import { getDataInfoFromHct } from '../http/dataQuery';
import PublicKey from "../snark/struct/pk";
import UserKey from "../wallet/keyStruct";
import Encryption from '../crypto/encryption';
import SnarkInputs from '../snark/struct/snarkInput';
import Libsnark from '../snark/bridge/libsnark';
import { getTradeContract } from '../web3';
import { proofFlat } from '../web3/utils';
import { genTradeQuery } from '../http/dataQuery';

let snarkClass = new Libsnark();

export const initLibSnark = async () => {
    await snarkClass.init();
  
    await snarkClass.readVerifyKeyFromFile('/crs/');
    await snarkClass.readProofKeyFromFile('/crs/');
  
  }

export const orderData = async (idx, h_ct) => {
    try {
        // server key setting
        const delKeys = await getServerKeys();
        const pubkey_del = new PublicKey(
            _.get(delKeys, "pk_own"),
            _.get(delKeys, "pk_enc"), 
            type = 'del'
        )
        
        // consumer key setting
        const consKeyJson = await DBInstance.myInfoDB.getFromIdx(idx)
        console.log('my KEY : ', consKeyJson, '\n\n');
        const consKey = UserKey.recoverFromUserSk(_.get(consKeyJson, 'sk_own'));
        const pubkey_cons = PublicKey.fromUserKey(consKey, type='cons')

        // peer(writer) key setting
        const Info = await getDataInfoFromHct(h_ct)
        console.log('peer Info', Info, typeof Info);
        const pubkey_peer = new PublicKey(
            _.get(Info, 'pk_own'),
            _.get(Info, 'pk_enc'),
            type='peer'
        )

        const symEnc = new Encryption.symmetricKeyEncryption(consKey.skEnc)
        const ENA = symEnc.Enc(BigInt(100000).toString(16))
        const ENA_ = symEnc.Enc(BigInt(2000).toString(16));

        console.log('start GenTrade ', _.get(Info, 'h_k'))
        let GenTradeInputs = new SnarkInputs(
            pubkey_peer,
            pubkey_del,
            pubkey_cons,
            ENA, 
            ENA_,
            consKey.skEnc,
            _.get(Info, 'h_k')
        )
        GenTradeInputs.init()
        console.log(GenTradeInputs.toJson())
        // const dataInfo = await getDataInfoFromHct(h_ct)

        const proof = await snarkClass.runProof(GenTradeInputs.toSnarkInput());
        console.log(proof);

        const contractInputs = GenTradeInputs.toContractInput();
        
        const receipt = await getTradeContract().genTrade(
            proofFlat(JSON.parse(proof)),
            contractInputs,
            _.get(consKeyJson, 'eoa'),
            '0x' + _.get(consKeyJson, 'eoa_sk')
        )
        console.log(receipt, typeof receipt)

        
        // const getTx =  await getTradeContract().eth.getTransaction(_.get(receipt, 'transactionHash'))
        // console.log('getTransaction',getTx)
        // const tmp = _.get(getTx, 'input').slice(10)
        // for(let i=0; i<27; i++ ){
        //     console.log(tmp.slice(i*64, (i+1)*64))
        // }

        const genTradeRes = await genTradeQuery(h_ct, _.get(receipt, 'transactionHash'))
        const resJson = _.get(genTradeRes,'data')

        if(_.get(resJson, 'flag') == false){
            return [false, undefined, undefined, undefined]
        }

        console.log(
            decodeURIComponent(resJson['data'])
        )
        let { title, owner, key, data} = resJson
        data= decodeURIComponent(data)

        await DBInstance.dataDB.insertData(
            data, 
            owner,
            title,
            key,
            h_ct
        );

        return [true, title, owner, data]
    } catch (error) {
        console.log(error)
        return [false, undefined, undefined, undefined]
    }
    
}