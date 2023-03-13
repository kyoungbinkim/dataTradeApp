import _ from 'lodash'
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

export async function getDataInfoFromHct(h_ct) {
    try {
        const info = (await httpCli.get(`data/info/${h_ct}`))
        // console.log(_.get(info, 'data'));
        return _.get(info, 'data')
    } catch (error) {
        console.log(error);
        return undefined
    }
}