import _ from 'lodash';
import DBInstance from "../../db/index";
import {
    loginQuery
} from "../http/loginQuery";
import UserKey from "../wallet/keyStruct";
import httpCli from '../http/http';

export const uploadSkOwn = async (sk_own, password) => {

    const [check, info] = await loginQuery(sk_own);

    if (check == false) {
        return false;
    }

    const usrkey = UserKey.recoverFromUserSk(sk_own);

    await DBInstance.myInfoDB.init(
        _.get(info, 'nickname'),
        sk_own,
        usrkey.skEnc,
        usrkey.pk.pkOwn,
        usrkey.pk.pkEnc,
        usrkey.getLoginTk(),
        password
    )
    
    return true;
}

export default uploadSkOwn;