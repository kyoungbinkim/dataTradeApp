import dataModel from "./model/data";

export const DataTradeDB = new dataModel();

export const createTable = async () => {
    await Promise(DataTradeDB.createModelTable());
};

export const dropTable = async () => {
    await Promise(DataTradeDB.dropTable());
}

export default DataTradeDB;
