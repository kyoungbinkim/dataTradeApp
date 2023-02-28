import dataModel from "./model/data";

export const DataTradeDB = new dataModel();

export const createTable = async () => {
    await Promise(DataTradeDB.createTable());
};

export const dropTable = async () => {
    await DataTradeDB.dropTable();
}

export default DataTradeDB;
