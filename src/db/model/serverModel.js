import SQLiteManager from "../db";


export class serverModel extends SQLiteManager {
    initFlag = false;

    async createModelTable(){
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
        } catch (error) {
            console.log(error);
            throw error;
        }
        
    }
    

}

export default serverModel;