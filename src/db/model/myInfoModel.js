import SQLiteManager from "../db";

class myInfoModel extends SQLiteManager {

    nickname = undefined;
    initFlag = false;

    async createTable() {
        try {
            await super.createTable('myInfo',[
                {
                    name : 'nickname',
                    dataType : 'string',
                    isNotNull : true
                },
                {
                    name : 'sk_onw',
                    dataType : 'string',
                    isNotNull : true
                },
                {
                    name : 'sk_enc',
                    dataType : 'string',
                    isNotNull : true
                },
                {
                    name : 'pk_enc',
                    dataType : 'string',
                    isNotNull : true,
                },
                {
                    name : 'pk_own',
                    dataType : 'string',
                    isNotNull : true
                },
                {
                    name : 'login_tk',
                    dataType : 'string',
                    isNotNull : true
                },
            ])
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async init(
        nickname,
        sk_own,
        sk_enc,
        pk_onw,
        pk_enc,
        login_tk
    ) {
        if(this.initFlag){return;}
            
        try {
            await super.insert(
                'myInfo',
                {
                    nickname : nickname,
                    sk_own   : sk_own,
                    sk_enc   : sk_enc,
                    pk_own   : pk_onw,
                    pk_enc   : pk_enc,
                    login_tk : login_tk
                }
            )
            this.nickname = nickname;
            this.initFlag = true;
        } catch (error) {
            console.log(error);
            throw error;
        }

    }

    async logout() {
        if (!this.initFlag){return;}

        try {
            await super.delete(
                'myInfo',
                { 'nickname' : this.nickname }
            )
            this.initFlag = false;
            this.nickname = undefined
        } catch (error) {
            console.log(error);
            throw error;
        }
    }


}