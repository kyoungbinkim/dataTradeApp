import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import CustomChipButton from '../elements/chipButton';
import InitLogin from './init.login';


const InitWalletPage = ({ navigation }) => {

    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: ''
        })
    }, [navigation])

    return (
        <>
        <View style={[styles.container, styles.content]}>
            <InitLogin/>
            <CustomChipButton
                title={'Join'}
                containerStyle={[styles.containerBt]}
                onPress={() => { navigation.navigate('Join/home') }}
            />

        </View>
        <CustomChipButton
            title = {'test page'}
            containerStyle={[styles.containerBt, {width:'100%'}]}
            onPress={() => {
                navigation.navigate('test')
            }}
        />
        </>
    )
}

const styles = StyleSheet.create({
    text : {
        marginTop : 8,
        textAlign : 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignContent: 'center',
        marginBottom: 8
    },
    containerBt :{
        alignItems: 'center',
        height: 45,
        width: '72%',
        padding: 5,
        margintop: 4,
        textAlign: 'center',
    }
})

export default InitWalletPage;