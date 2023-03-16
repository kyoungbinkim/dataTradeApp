import React, { useEffect, useState, useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import PageHome from './page.home';
import { DataViewNavi } from '../elements/dataView';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import DBInstance from '../db';
import MyData from './myData.home';
import { dataDB } from '../db';

const Stack = createStackNavigator();

const StackMyDataNavi = () => {

    const [dataList, setDataList] = useState([]); 

    useLayoutEffect(() => {

    }, []);

    return (
        <Stack.Navigator initialRouteName='data/home'>
            <Stack.Group >
                <Stack.Screen 
                    name="data/home" 
                    component={MyData}
                    initialParams={{test : 'test'}}
                    options={{
                        headerShown: false,
                    }} 
                />
                <Stack.Screen 
                    name="data/view" 
                    component={DataViewNavi}
                    options={{
                        headerShown: false,
                    }} 
                />
            </Stack.Group>
        </Stack.Navigator>
    )
}

export default StackMyDataNavi;