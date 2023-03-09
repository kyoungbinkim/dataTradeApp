import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack'

import PageHome from './page.home';

const Stack = createStackNavigator();

const StackPageNavi = () => {
    useEffect(() => {

    }, []);

    return (
        <Stack.Navigator initialRouteName='home'>
            <Stack.Group>
                <Stack.Screen name="home" component={PageHome}/>
                
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default StackPageNavi;