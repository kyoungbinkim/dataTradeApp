import SQLiteManager from "../db";
import mimc from "../../core/crypto/mimc";
import types from "../../core/utils/types";
import {
    toHexStringFormat
} from "../../core/utils/types";

export class myInfoModel extends SQLiteManager {
    mimc7 = new mimc.MiMC7();
    tableFlag = false;

    async createModelTable() {
        try {
            if (this.tableFlag) {
                return;
            }
            await super.createTable('myInfo', [{
                    name: 'idx',
                    dataType: 'integer',
                    isNotNull: true,
                    options: 'PRIMARY KEY AUTOINCREMENT'
                },
                {
                    name: 'nickname',
                    dataType: 'string',
                    isNotNull: true
                },
                {
                    name: 'sk_own',
                    dataType: 'string',
                    isNotNull: true,
                    options: 'unique'
                },
                {
                    name: 'sk_enc',
                    dataType: 'string',
                    isNotNull: true
                },
                {
                    name: 'pk_enc',
                    dataType: 'string',
                    isNotNull: true,
                },
                {
                    name: 'pk_own',
                    dataType: 'string',
                    isNotNull: true
                },
                {
                    name: 'login_tk',
                    dataType: 'string',
                    isNotNull: true
                },
                {
                    name: 'addr',
                    dataType: 'string',
                    isNotNull: false
                },
                {
                    name: 'eoa',
                    dataType: 'string',
                    isNotNull: false
                },
                {
                    name: 'eoa_sk',
                    dataType: 'string',
                    isNotNull: false
                },
                {
                    name: 'password',
                    dataType: 'string',
                    isNotNull: false,
                    options: 'unique'
                }
            ])

            this.tableFlag = true
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async register(
        nickname,
        sk_own,
        sk_enc,
        pk_onw,
        pk_enc,
        login_tk,
        addr,
        password,
        eoa,
        eoa_sk,
    ) {
        try {
            await super.insert(
                'myInfo', {
                    nickname: nickname,
                    sk_own: sk_own,
                    sk_enc: sk_enc,
                    pk_own: pk_onw,
                    pk_enc: pk_enc,
                    login_tk: login_tk,
                    password: password,
                    addr: addr,
                    eoa: eoa,
                    eoa_sk: eoa_sk
                }
            )
        } catch (error) {
            console.log(error);
            throw error;
        }

    }

    async getFromIdx(idx) {
        try {
            const [ret] = await super.select(
                'myInfo',
                ['*'],{
                    'idx' : idx
                }
            )
            
            return ret;
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async getFromSkOwn(sk_own) {
        try {
            const [ret] = await super.select(
                'myInfo',
                ['*'], {
                    'sk_own': sk_own
                }
            )
            return ret;
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async getFromPassWord(password) {
        try {
            const [ret] = await super.select(
                'myInfo',
                ['*'],{
                    'password' : this.mimc7.hash(types.asciiToHex(password))
                }
            )
            // console.log(ret)
            return ret;
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    // async logout() {
    //     if (!this.initFlag) {
    //         return;
    //     }

    //     try {
    //         await super.delete(
    //             'myInfo', {
    //                 'nickname': this.nickname
    //             }
    //         )
    //         this.initFlag = false;
    //         this.nickname = undefined
    //     } catch (error) {
    //         console.log(error);
    //         throw error;
    //     }
    // }

    async dropTable() {
        if (!this.tableFlag) {
            return;
        }
        try {
            this.tableFlag = false;
            await super.drop('myInfo');
        } catch (error) {
            console.error('myInfo DROP TABLE : ', error);
            throw error;
        }
    }
}

export default myInfoModel;