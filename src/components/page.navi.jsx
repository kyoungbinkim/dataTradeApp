import React, { useEffect } from 'react';

import PageHome from './page.home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackMyDataNavi from './myData.navi';
import MyInfo from './myData.myInfo';

const Tab = createBottomTabNavigator();

const StackPageNavi = ({route, navigation}) => {
    useEffect(() => {

    }, []);

    return (
        <Tab.Navigator>
            <Tab.Screen name="home" component={PageHome} />
            <Tab.Screen name="my Data" component={StackMyDataNavi} />
            <Tab.Screen name="my Info" component={MyInfo} />
        </Tab.Navigator>
    )
}

export default StackPageNavi;