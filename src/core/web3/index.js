import _ from 'lodash';
import contract from "./contract.js";
import httpCli from '../http/http.js';
import { Platform } from 'react-native';
import Config from 'react-native-config';

export let tradeContract = undefined
export let isInit = false

const rpcURL = Platform.OS === 'ios' ? Config.IOS_GANACHE_PROVIDER : Config.ANDROID_GANACHE_PROVIDER;

export const initTradeContract = async () => {
    console.log('ganache : ', Config.ANDROID_GANACHE_PROVIDER, Config.IOS_GANACHE_PROVIDER)
    console.log('http : ',Config.IOS_HTTP_URL )
    let contractAddr = undefined
    if(isInit) return;
    try {
        if(isInit) return;
        console.log('start init TradeContract')
        const contractInfo = await httpCli.get('/contract/getAddr')

        console.log(contractInfo['data'])
        contractAddr = contractInfo['data']
        
        isInit = true
    } catch (error) {
        console.log(error)
        return;
    }
    tradeContract = new contract(rpcURL, contractAddr);

    // test contract instance
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