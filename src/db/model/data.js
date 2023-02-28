import SQLiteManager from "../db";

export class dataModel extends SQLiteManager {

    async createTable(){
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
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async insertData(data) {
        try {
            // console.log(data);
            await super.insert('data', data);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async dropTable() {
        try {
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