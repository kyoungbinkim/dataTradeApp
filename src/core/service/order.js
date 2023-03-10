import _ from 'lodash'
import DBInstance from "../../db";
import { getServerKeys } from "../http/serverQuery"
import PublicKey from "../snark/struct/pk";
import UserKey from "../wallet/keyStruct";

export const orderData = async (idx, h_k) => {
    try {
        const delKeys = await getServerKeys();
        const pubkey_del = new PublicKey(
            _.get(delKeys, "pk_own"),
            _.get(delKeys, "pk_enc"), 
            type = 'del'
        )

        const consKeyJson = await DBInstance.myInfoDB.getFromIdx(idx)
        console.log(consKeyJson);
        const consKey = UserKey.recoverFromUserSk(_.get(consKeyJson, 'sk_own'));

    } catch (error) {
        throw error;
    }
    
}