import _ from 'lodash';
import contract from "./contract.js";
import httpCli from '../http/http.js';

let tradeContract = undefined

export const initTradeContract = async () => {
    
    const contractInfo = await httpCli.get('/contract/getInfo')

    console.log(contractInfo);

    // tradeContract = new contract(testWsProvider, contractAddr)
}

export const getTradeContract = () => {
    return tradeContract
}

export default tradeContract