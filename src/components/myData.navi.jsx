import React, { useEffect, useState, useLayoutEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { DataViewNavi } from '../elements/dataView';
import MyData from './myData.home';

const Stack = createStackNavigator();

const StackMyDataNavi = ({route, navigation}) => {
    useLayoutEffect(() => {
    }, [navigation]);

    return (
        <Stack.Navigator initialRouteName='data/home'>
            <Stack.Group >
                <Stack.Screen 
                    name="data/home" 
                    component={MyData}
                    initialParams={{dataList : route.dataList}}
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