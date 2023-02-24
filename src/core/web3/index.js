import _ from 'lodash';
import contract from "./contract.js";
import httpCli from '../http/http.js';

let tradeContract = undefined
export let isInit = false

export const initTradeContract = async () => {
    let contractAddr = undefined
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
    }
    tradeContract = new contract('http://127.0.0.1:7545', contractAddr)
    console.log(await tradeContract.isRegisteredData('123'))
}

export const getTradeContract = () => {
    return tradeContract
}

export default tradeContract