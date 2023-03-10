import SQLiteManager from "../db";

export class dataModel extends SQLiteManager {

    tableFlag= false;

    async createModelTable(){
        if(this.tableFlag) {return ;}
        try {
            await super.createTable('data',[
                {
                    name : 'idx',
                    dataType : 'integer',
                    isNotNull : true,
                    options: 'PRIMARY KEY AUTOINCREMENT'
                },
                {
                    name : 'owner',
                    dataType : 'string',
                    isNotNull : true,
                },
                {
                    name : 'title',
                    dataType : 'string',
                    isNotNull : true
                },
                {
                    name : 'data',
                    dataType : 'string',
                    isNotNull : true
                }
            ])
            this.tableFlag = true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async insertData(data) {
        try {
            await super.insert('data', data);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async dropTable() {
        if(!this.tableFlag){return;}
        try {
            this.tableFlag= false;
            await super.drop('data');
        }
        catch (error) {
            console.error('data : ',error);
            throw error;
        }

    }

    async searchFromTitle(title){
        try {
            console.log(title)
            return (await super.select('data', ['title'], {'title' : title},false));
        } catch (error) {
            console.log(error);
            throw error
        }
    }
}

export default dataModel;