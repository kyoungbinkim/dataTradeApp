import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Icon, Button } from 'react-native-elements';
import CustomChipButton from '../elements/chipButton';

import testSnark,{ testOrder, initLibSnark } from '../core/snark/test';
import { DBtest, dropTableTEST, createTableTEST } from '../db/test';

const InitWalletPage = ({ navigation }) => {

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: ''
        })
    }, [navigation])

    return (
        <View style={[styles.container, styles.content]}>
            
            <Text style={styles.text}>not Login</Text>
            <CustomChipButton
                title={'Join'}
                containerStyle={[styles.containerBt]}
                onPress={() => { navigation.navigate('Join/home') }}
            />
            <CustomChipButton
                title={'Login'}
                containerStyle={[styles.containerBt]}
                onPress={() => {navigation.navigate('Login') }}
            />
            <CustomChipButton 
                title={'init Snark'}
                containerStyle={[styles.containerBt]}
                onPress={async () => {
                    await initLibSnark();
                }}
            />
            <CustomChipButton
                title={'snarkTest'}
                containerStyle={[styles.containerBt]}
                onPress={async () => {
                    await testSnark();
                    await testOrder();
                }}
            />
            <CustomChipButton
                title={'DB Test'}
                containerStyle={[styles.containerBt]}
                onPress={async () => {
                    // await createTableTEST();
                    // await dropTableTEST();
                    await DBtest();
                }}
            />

        </View>
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
        width: '75%',
        padding: 5,
        margintop: 4,
        textAlign: 'center',
    }
})

export default InitWalletPage;