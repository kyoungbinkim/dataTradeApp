import _ from 'lodash';
import DBInstance from "../../db/index";
import { loginQuery } from "../http/loginQuery";
import UserKey from "../wallet/keyStruct";
import httpCli from '../http/http';

export const loginService = async (password) => {

    try {
        const info = await DBInstance.myInfoDB.getFromPassWord(password);
        if(info === undefined){ return [false, undefined]; }
        
        console.log(info);
        const sk_own = _.get(info, 'sk_own')

        console.log(sk_own);
        const [check] = await loginQuery(sk_own);

        console.log(check)
        if(check === false) {return [false, undefined]}

        return [true, info];
    } catch (error) {
        console.log(error)
        throw error;
    }
    



    // try {
    //     const [check, info] = await loginQuery(sk_own);

    //     if(check == false){
    //         return false;
    //     }

    //     const usrkey = UserKey.recoverFromUserSk(sk_own);

    //     await DBInstance.myInfoDB.init(
    //         _.get(info, 'nickname'),
    //         sk_own,
    //         usrkey.skEnc,
    //         usrkey.pk.pkOwn,
    //         usrkey.pk.pkEnc,
    //         usrkey.getLoginTk(),
    //     )
        
    //     httpCli.defaults.headers.common['access-token'] = JSON.stringify({
    //         nickname : _.get(info, 'nickname'),
    //         login_tk : usrkey.getLoginTk(),
    //         sk_enc   : usrkey.skEnc
    //     });

    //     console.log(info);
    // } catch (error) {
    //     console.log(error);
    //     throw(error);
    // }
    
}

export default loginService;

// 24c24032d20890e2dda138dcaff4fbdb2fd0e6e3d154d3907cfb39cb5837ac4