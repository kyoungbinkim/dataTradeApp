import _ from 'lodash';
import dataModel from "./model/dataModel";
import serverModel from "./model/serverModel";
import myInfoModel from "./model/myInfoModel";

import { getServerKeys } from '../core/http/serverQuery';

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
    await Promise.all([
        dataDB.dropTable(),
        serverDB.dropTable(),
        myInfoDB.dropTable()
    ])
}

export const getServerKey = async () => {
    if(DBInstance.serverDB.initFlag == false) {
        const servKeys = await getServerKeys()
        await DBInstance.serverDB.init(
            _.get(servKeys, "pk_own"),
            _.get(servKeys, "pk_enc")
        )
    }
    const keys = await DBInstance.serverDB.get();
    // console.log('pk_enc : ', _.get(keys, 'pk_enc'));
    // console.log('pk_own : ', _.get(keys, 'pk_own'));
    return keys;
}

export const getMyInfo = async () => {
    if(DBInstance.myInfoDB.initFlag == false){
        console.log('myInfo DB does not init');
        return undefined;
    }

    const info = await DBInstance.myInfoDB.get();
    // console.log('myInfo : ', info);
    return info;
}

const DBInstance = {
    dataDB,
    serverDB,
    myInfoDB
}

export default DBInstance;