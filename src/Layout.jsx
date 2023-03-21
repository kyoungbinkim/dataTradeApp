import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { 
    SafeAreaView, 
    StatusBar,
} from 'react-native';
import '@ethersproject/shims';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import StackInitNav from './components/init.navi';
import StackPageNavi from './components/page.navi';
import { getServerKeys } from './core/http/serverQuery';
import DBInstance, { createTable, dropTable } from './db/index';
import { setInitDB, setInitServer } from './store/initSlice';
import { initLibSnark } from './core/service/order';
import { initTradeContract } from './core/web3';

const Layout = () => {
    const dispatch = useDispatch();
    const { isLogin } = useSelector(state => state.init);

    useEffect( () => {
        async function initServerState() {
            await createTable();
            if(DBInstance.serverDB.initFlag){return;}
            const servKeys = await getServerKeys();

            DBInstance.serverDB.init(
                _.get(servKeys, "pk_own"),
                _.get(servKeys, "pk_enc")
            )   
            dispatch(setInitServer);
            dispatch(setInitDB);
            await initLibSnark();
            await initTradeContract();
        }
        initServerState();

        
    }, []);

    return (
        <>
            <StatusBar 
                backgroundColor= {'white'}
                barStyle='dark-content'
            />
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' ,justifyContent: 'center'}}>
                <NavigationContainer>
                    {
                        isLogin? 
                        <>  
                            <StackPageNavi/>
                        </>:
                        <>  
                            <StackInitNav />    
                        </>
                    }
                </NavigationContainer>
            </SafeAreaView>
        </>
    )
}

export default Layout;