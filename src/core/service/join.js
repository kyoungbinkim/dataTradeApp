import _ from 'lodash';
import DBInstance from "../../db/index";
import UserKey from "../wallet/keyStruct";
import httpCli from '../http/http';
import mimc from '../crypto/mimc';
import types from '../utils/types';
import {
    loginQuery
} from "../http/loginQuery";

export const JoinService = async (sk_own, nickname, password) => {
    try {
        const mimc7 = new mimc.MiMC7();

        const keys = JSON.parse(UserKey.recoverFromUserSk(sk_own).toJson());

        const JoinQuery = {
            loginTk : mimc7.hash(_.get(keys,'skOwn'), types.asciiToHex('login')),
            nickname: nickname,
            skEnc   : _.get(keys, 'skEnc'),
            pkOwn   : _.get(keys, 'pkOwn'),
            pkEnc   : _.get(keys, 'pkEnc'),
            addr    : _.get(keys, 'ena'),
        }

        const res = _.get((await httpCli.post("/usr/join/join", JoinQuery)), 'data')
        if(_.get(res, 'flag') == false){
            return [false, undefined];
        }
        const eoa = _.get(res, 'account')
        
        await DBInstance.myInfoDB.register(
            nickname,
            sk_own,
            _.get(keys, 'skEnc'),
            _.get(keys, 'pkOwn'),
            _.get(keys, 'pkEnc'),
            _.get(JoinQuery, 'loginTk'),
            _.get(JoinQuery, 'addr'),
            mimc7.hash(types.asciiToHex(password)),
            _.get(eoa, 'address'),
            _.get(eoa, 'privKey')
        )
        console.log('\n\n\n',res, eoa);
        return [true, res];
    } catch (error) {
        console.log(error);
        return [false, undefined];
    }
    

    // const [check, info] = await loginQuery(sk_own);

    // if (check == false) {
    //     return false;
    // }

    // const usrkey = UserKey.recoverFromUserSk(sk_own);

    // await DBInstance.myInfoDB.init(
    //     _.get(info, 'nickname'),
    //     sk_own,
    //     usrkey.skEnc,
    //     usrkey.pk.pkOwn,
    //     usrkey.pk.pkEnc,
    //     usrkey.getLoginTk(),
    //     password
    // )
    
    
}

export default JoinService;