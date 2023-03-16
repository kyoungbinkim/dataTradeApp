import _ from 'lodash'
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
                },
                {
                    name : 'key',
                    dataType : 'string',
                    isNotNull : false
                },
                {
                    name : 'h_ct',
                    dataType : 'string',
                    isNotNull : false
                }
            ])
            this.tableFlag = true;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async insertData(
        data,
        owner,
        title,
        key=undefined,
        h_ct=undefined
    ) {
        try {
            let dataJson = {
                'data' : data,
                'owner': owner,
                'title': title
            }

            if(key){
                _.set(dataJson, 'key', key)
            }

            if(h_ct){
                _.set(dataJson, 'h_ct', h_ct)
            }
            console.log(dataJson);
            const ret = await super.insert('data', dataJson);
            console.log(ret)
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getData(){
        try {
            const [rows]  = await super.select(
                'data',
                ['title', 'owner', 'data']
            )
            // console.log("getData ", rows)
            return rows
        } catch (error) {
            console.log(error)
            throw error
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