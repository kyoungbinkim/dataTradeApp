import _ from 'lodash'
import httpCli from "./http"
import mimc from "../crypto/mimc"
import types from "../utils/types"

export async function loginQuery(sk_own) {
    try {
        const mimc7 = new mimc.MiMC7();
        const lgTk = mimc7.hash(sk_own, types.asciiToHex('login'));

        const res = await httpCli.post('/usr/login/login', {
            'loginTk': lgTk
        })

        if (!_.get(res.data, 'flag')) {
            return [false, undefined];
        }

        setJWT(
            _.get(res.data, 'nickname'),
            _.get(res.data, 'token'),
            _.get(res.data, 'loginTk')
        )

        // httpCli.defaults.headers.common['access-token'] = JSON.stringify(res.data);

        return [true, res.data];
    } catch (error) {
        return false
    }
}

export function setJWT(
    nickname,
    token,
    login_tk
) {
    console.log(nickname, login_tk, token)
    httpCli.defaults.headers.common['access-token'] = JSON.stringify(new Object({
        nickname : nickname,
        loginTk : login_tk,
        token : token
    }));
}