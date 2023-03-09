import _ from 'lodash';
import dataModel from "./model/dataModel";
import serverModel from "./model/serverModel";
import myInfoModel from "./model/myInfoModel";

export const dataDB      = new dataModel();
export const serverDB    = new serverModel();
export const myInfoDB    = new myInfoModel();

export const createTable = async () => {
    
    await Promise.all([
        dataDB.createModelTable(),
        serverDB.createModelTable(),
        myInfoDB.createModelTable()
    ])
    
};

export const dropTable = async () => {
    await Promise(dataDB.dropTable());
}

export const getServerKey = async () => {
    if(DBInstance.serverDB.initFlag == false) {
        return undefined;
    }
    const keys = await DBInstance.serverDB.get();
    console.log('pk_enc : ', _.get(keys, 'pk_enc'));
    console.log('pk_own : ', _.get(keys, 'pk_own'));
    return keys;
}

const DBInstance = {
    dataDB,
    serverDB,
    myInfoDB
}

export default DBInstance;