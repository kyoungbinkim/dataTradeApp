import SQLiteManager from "../db";


export class serverModel extends SQLiteManager {
    tableFlag = false;
    initFlag = false;

    async createModelTable(){
        if(this.tableFlag) {return ;}
        try {
            await super.createTable('server',[
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
            ])
            this.tableFlag = true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async init(
        pk_own,
        pk_enc
    ) {
        if(this.initFlag) return;
        try {
            await super.insert(
                'server',
                {
                    pk_enc : pk_enc,
                    pk_own : pk_own
                }
            )
            this.initFlag =true;
            console.log('server DB init success')
        } catch (error) {
            console.log(error);
            throw error;
        }
        
    }
    
    async get(){
        if(!this.initFlag) return undefined;
        try {
            const [ret] = await super.select(
                'server'
            )
            return ret;
        } catch (error) {
            console.log(error)
            throw error
        }
    }

}

export default serverModel;