import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Text, Button } from 'react-native-elements';
import { 
    View,
    Platform, 
    SafeAreaView, 
    StatusBar,
    StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import StackInitNav from './components/init.navi';
import StackPageNavi from './components/page.navi';
import PublicKey from './core/snark/struct/pk';
import { getServerKeys } from './core/http/serverQuery';
import { setServerPublicKey, selectPublicKey } from './store/serverInfoSlice';


const Layout = () => {
    const dispatch = useDispatch();
    const { isLogin } = useSelector(state => state.init);

    const loadEffect = () => {

    };

    useEffect( () => {
        async function initServerState() {
            const servKeys = await getServerKeys();
            // console.log('server keys : ', servKeys , _.get(servKeys, "pk_own"))
            const pubkey_server = new PublicKey(
                _.get(servKeys, "pk_own"),
                _.get(servKeys, "pk_enc"), 
                type = 'del'
            )
            dispatch(setServerPublicKey(pubkey_server));
        }
        initServerState();
        loadEffect();
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