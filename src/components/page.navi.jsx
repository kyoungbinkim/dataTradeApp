import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import PageHome from './page.home';
import { DataViewComp } from '../elements/dataView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
// import MyData from './myData.home';
import StackMyDataNavi from './myData.navi';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const StackPageNavi = () => {
    useEffect(() => {

    }, []);

    return (
        <Tab.Navigator>
            <Tab.Screen name="home" component={PageHome} />
            <Tab.Screen name="my Data" component={StackMyDataNavi} />
            {/* <Tab.Screen name="view" component={DataViewComp} /> */}
        </Tab.Navigator>
    )
}

export default StackPageNavi;