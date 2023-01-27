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


const Layout = () => {
    const dispatch = useDispatch();
    const { isLogin } = useSelector(state => state.init);

    const loadEffect = () => {
    };

    useEffect(() => {
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