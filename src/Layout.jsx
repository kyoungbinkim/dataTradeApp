import React, { useEffect, useState } from 'react';
import { Text, Button } from 'react-native-elements';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';



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
            <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
                <NavigationContainer>
                    {
                        isLogin? 
                        <>
                            <Text>
                                login
                            </Text>
                        </>:
                        <>
                            <Text>
                                not login
                            </Text>
                        </>
                    }
                </NavigationContainer>
            </SafeAreaView>
        </>
    )
}

export default Layout;