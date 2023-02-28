import DataTradeDB, {
    createTable, dropTable
} from ".";

export const DBtest = async () => {
    try {        

        const testData = {
            'owner': 'kim',
            'title': '123',
            'data': '가나다라마바사abdefg '
        }

        await DataTradeDB.insertData(testData)

        console.log('search : ', await DataTradeDB.searchFromTitle('123'));

    } catch (error) {
        console.log(error)
    }
}

export const createTableTEST = async () => {
    try {
        console.log(await createTable())
    } catch (error) {
        console.log(error);
    }
}

export const dropTableTEST = async () => {
    try {
        console.log(await dropTable());
    } catch (error) {
        console.log(error);
    }
}