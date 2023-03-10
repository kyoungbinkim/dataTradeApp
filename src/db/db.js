import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
    {
        name: 'dataTrade.db',
        location: 'default',
        createFromLocation: '~www/dataTrade.db',
        androidDatabaseProvider: 'system',
    },
    () => {
        console.log('Open Database Successed')
    },
    error => {
        console.log('ERROR: ' + error);
    }
)

export class SQLiteManager {
    constructor() {
        this.db = db;
        SQLite.DEBUG(true);
        SQLite.enablePromise(true);
    }

    executeQuery = (sql, params = []) => new Promise((resolve, reject) => {
        this.db.transaction((trans) => {
            trans.executeSql(sql, params, (trans, results) => {
                resolve(results);
            },
                (error) => {
                    reject(error);
                });
        });
    });

    /**
     *
     * @param {string}              tableName                   Table Name
     * @param {Array[Object]}       columns                     The array of column
     * @param {Object}              columns[i]                  The 'Object' type
     * @param {Object}              columns[i].name             Row(field) name
     * @param {Object}              columns[i].dataType         SQL data type
     * @param {Object}              columns[i].isNotNull        boolean, The 'NOT NULL' constraint enforces a clumn to NOT accept NULL values
     * @param {Object}              columns[i].options          Any option, e.g., PRIMARY KEYS/ AUTOINCREMENT, and so on.
     *
     */
    async createTable(tableName, columns) {
        let query = '';
        for (let i = 0; i < columns.length; i++) {
            if (i === columns.length - 1) {
                query += '"' + columns[i].name + '" ' + columns[i].dataType + ' ' + ((columns[i].isNotNull) ? 'NOT NULL ' : '') + ((columns[i].options) ? columns[i].options : '')
            } else {
                query += '"' + columns[i].name + '" ' + columns[i].dataType + ' ' + ((columns[i].isNotNull) ? 'NOT NULL ' : '') + ((columns[i].options) ? columns[i].options : '') + ','
            }
        }
        

        query = 'CREATE TABLE IF NOT EXISTS ' + tableName + ' (' + query + ')';
        // console.log(query);
        return this.executeQuery(query);
        // console.log(table);
    }

    /**
     *
     * @param {string}      tableName                   Table Name
     * @param {Object}      data                        Object type, the values to be inserted { [name] : [value] }
     *
     */
    async insert(tableName, data) {
        let keys = Object.keys(data);
        let values = keys.map((key) => data[key]);

        console.log(keys, values)

        let query = 'INSERT INTO ' + tableName + ' (';
        for (let i = 0; i < keys.length; i++) {
            query += keys[i] + ',';
        }
        query = query.slice(0, query.length - 1);
        query += ') VALUES ';

        query += '(';
        for (let i = 0; i < values.length; i++) {
            query += '?,';
        }
        query = query.slice(0, query.length - 1);
        query += ')';

        console.log('insert :',query, values);
        return this.executeQuery(query, values);
    }

    /**
     *
     * @param {string}      tableName               Table Name
     * @param {Object}      data                    Object type, the values to updated
     * @param {Object}      where                   The condition of value to be updated
     */
    async update(tableName, data, where) {
        let keys = Object.keys(data);
        let values = keys.map((key) => data[key]);

        let whereKey = Object.keys(where);
        let whereValue = whereKey.map((key) => where[key]);

        let query = 'UPDATE ' + tableName + ' SET ';
        for (let i = 0; i < keys.length; i++) {
            query += keys[i] + ' = ?,';
        }
        query = query.slice(0, query.length - 1);
        query += ' WHERE '

        for (let i = 0; i < whereKey.length; i++) {
            query += whereKey[i] + ' = ?,';
        }
        query = query.slice(0, query.length - 1);
        values.push(...whereValue);

        // console.log(query, values);
        return await this.executeQuery(query, values);
        // console.log(updateQuery);
    }

    /**
     *
     * @param {string}          tableName           Table Name
     * @param {array}           columns             If you want to select a specific column, input the column string array.
     * @param {Object}          where               The condition of data to be selected
     * @param {string}          order               The criteria for sorting when selecting
     * @returns {Array}
     */
    async select(tableName, columns = false, where = false, order = false) {
        let query = 'SELECT ';
        columns = (columns === false) ? '*' : columns.join();
        query += columns + ' FROM ' + tableName;
        if (where) {
            let whereKey = Object.keys(where);
            query += ' WHERE ';
            for (let i = 0; i < whereKey.length; i++) {
                query += whereKey[i] + ' = ?,';
            }
            query = query.slice(0, query.length - 1);
            query = query.replace(/,/g, ' AND ');
        }

        if (order) {
            query += ' ORDER BY ' + order;
        }
        let selectQuery;
        if (where) {
            let whereKey = Object.keys(where);
            let whereValue = whereKey.map((key) => where[key]);
            selectQuery = await this.executeQuery(query, whereValue);
        } else {
            // console.log(query);
            selectQuery = await this.executeQuery(query);
            // console.log(selectQuery);
        }

        let rows = selectQuery.rows;
        let res = [];
        for (let i = 0; i < rows.length; i++) {
            res.push(rows.item(i));
        }
        // DEBUG
        // console.log(res);
        return res;
    }

    /**
     *
     * @param {string}          tableName           The table name to be droped.
     */
    async drop(tableName) {
        let query = 'DROP TABLE IF EXISTS ' + tableName;
        // console.log(query);
        await Promise(this.executeQuery(query));
    }

    /**
     *
     * @param {string}          tableName           The table name
     * @param {Object}          where               The condition of the row, which is to be deleted.
     */
    async delete(tableName, where) {
        let whereKey = Object.keys(where);
        let whereValue = whereKey.map((key) => where[key]);
        let query = 'DELETE FROM ' + tableName;
        if (where && whereValue) {
            query += ' WHERE '
            for (let i = 0; i < whereKey.length; i++) {
                query += whereKey[i] + ' = ?,';
            }
            query = query.slice(0, query.length - 1);
            // console.log(query, whereValue);
            return this.executeQuery(query, whereValue);
            // console.log(deleteQuery);
        } else {
            // console.log('ERROR: delete condition is nothing');
        }
    }
}

export default SQLiteManager;
