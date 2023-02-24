import _ from 'lodash';
import contract from "./contract.js";
import httpCli from '../http/http.js';
import { Platform } from 'react-native';

let tradeContract = undefined
export let isInit = false

const androidURL  = 'http://10.0.2.2:7545';
const iosURL      = 'http://127.0.0.1:7545';

const rpcURL = Platform.OS === 'ios' ? iosURL : androidURL;

export const initTradeContract = async () => {
    let contractAddr = undefined
    let tmp = undefined;
    // if(isInit) return;
    try {
        if(isInit) return;
        console.log('start init TradeContract')
        const contractInfo = await httpCli.get('/contract/getAddr')

        // console.log("!! : ",contractInfo);
        console.log(contractInfo['data'])
        contractAddr = contractInfo['data']
        
        isInit = true
    } catch (error) {
        console.log(error)
        return;
    }

    tradeContract = new contract(rpcURL, contractAddr);

    try {
        console.log(await tradeContract.isRegisteredData('123'))
    } catch (error) {
        isInit = false;
        return;
    }
    
}

export const getTradeContract = () => {
    return tradeContract
}

export default tradeContract