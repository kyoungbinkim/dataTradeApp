import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack'

import InitWalletPage from './init.page';
import InitLogin from './init.login';
import InitJoinHome from './init.join.home';
import InitJoinNickname from './init.join.nickname';
import InitJoinPsswrd from './init.join.psswrd';
import TestPage from './test';
import { DataViewComp } from '../elements/dataView';

const Stack = createStackNavigator();

const StackInitNav = () => {

    useEffect(() => {

    }, []);

    return (
        <Stack.Navigator initialRouteName='Init'>
            <Stack.Group>
                <Stack.Screen name="Init" component={InitWalletPage}/>
                <Stack.Screen name="Join/home" component={InitJoinHome} />
                <Stack.Screen name='Join/nickname' component={InitJoinNickname}/>
                <Stack.Screen name='Join/join' component={InitJoinPsswrd} />
                <Stack.Screen name="Login" component={InitLogin}/>
                <Stack.Screen name="dataView" component={DataViewComp}/>
                <Stack.Screen name="test" component={TestPage} 
                    options={{
                        headerShown: false,
                }}/>
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default StackInitNav;