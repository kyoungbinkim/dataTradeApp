import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import PageHome from './page.home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackMyDataNavi from './myData.navi';

const Tab = createBottomTabNavigator();

const StackPageNavi = ({route, navigation}) => {
    useEffect(() => {

    }, []);

    return (
        <Tab.Navigator>
            <Tab.Screen name="home" component={PageHome} />
            <Tab.Screen name="my Data" component={StackMyDataNavi} />
        </Tab.Navigator>
    )
}

export default StackPageNavi;