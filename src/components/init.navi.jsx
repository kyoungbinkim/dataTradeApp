import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import {Button} from 'react-native-elements'

import InitWalletPage from './init.page';
import InitLogin from './init.login';
import InitJoinHome from './init.join.home';
import InitJoinNickname from './init.join.nickname';
import InitJoinAddr from './init.join.addr';
import InitJoinJoin from './init.join';

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
                <Stack.Screen name='Join/addr' component={InitJoinAddr}/>
                <Stack.Screen name='Join/join' component={InitJoinJoin} />
                <Stack.Screen name="Login" component={InitLogin}/>
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default StackInitNav;