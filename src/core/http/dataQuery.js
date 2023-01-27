import httpCli from "./http";

export async function getDataListQuery() {
    try {
        const dataList = (await httpCli.get(`data/page`))['data']['data'];
        console.log('data List : ', dataList);
        return dataList;
    } catch (error) {
        console.log(error);
        return []
    }
}