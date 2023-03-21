import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Icon, Button } from 'react-native-elements';
import CustomChipButton from '../elements/chipButton';
import loginService from '../core/service/login';
import testSnark,{ testOrder, initLibSnark } from '../core/snark/test';
import { DBtest, dropTableTEST, createTableTEST } from '../db/test';
import { useSelector } from 'react-redux';
import DBInstance, { getMyInfo, getServerKey } from '../db';
import JoinService from '../core/service/join';
import { randomFieldElement } from '../core/utils/math';
import { orderData } from '../core/service/order';
import { getDataInfoFromHct } from '../core/http/dataQuery';


const TestPage = ({ navigation }) => {

    const {serverPublicKey} = useSelector(state => state.server)

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
                    // await dropTableTEST();
                    // await createTableTEST();
                    await DBtest();
                }}
            />
            <CustomChipButton
                title={'drop DB'}
                containerStyle={[styles.containerBt]}
                onPress={async () => {
                    await dropTableTEST();
                }}
            />
            <CustomChipButton
                title={'create DB'}
                containerStyle={[styles.containerBt]}
                onPress={async () => {
                    await createTableTEST();
                }}
            />
            <CustomChipButton 
                title={'get Data From DB'}
                containerStyle={styles.containerBt}
                onPress = {async () => {
                    try {
                        const d = await DBInstance.dataDB.getData()
                        console.log('get Data From DB', d);
                    } catch (error) {
                        console.log(error)
                    }
                    
                }}
            />
            <CustomChipButton
                title={'get key TEST'}
                containerStyle={styles.containerBt}
                onPress= {async () => {
    
                    console.log('Server  : ', await getServerKey());
                    console.log('myInfo  : ', await getMyInfo());
                }}
            />
            <CustomChipButton 
                title={'Join Login Service TEST'}
                containerStyle={styles.containerBt}
                onPress = {async () => {
                    // 24c24032d20890e2dda138dcaff4fbdb2fd0e6e3d154d3907cfb39cb5837ac4
                    const sk = randomFieldElement().toString(16).slice(0,32)
                    const pw = randomFieldElement().toString(16).slice(0,6)
                    console.log('sk : ', sk);
                    console.log('pw : ', pw);
                    const ret = await JoinService(
                        sk,
                        randomFieldElement().toString(16).slice(0,12),
                        pw
                    );
                    await loginService(pw)
                }}
            />
            <CustomChipButton 
                title={'Order Service TEST'}
                containerStyle={styles.containerBt}
                onPress = {async () => {
                    try {
                        await getDataInfoFromHct('2a495be70e6922b27cc1c08ae16cfd1fa035ba08d9f44bcbe58d2c876b1dca89');
                        // await orderData('1')
                    } catch (error) {
                        console.log(error)
                    }
                    
                }}
            />

            <CustomChipButton
                title={'data View Test'}
                containerStyle={styles.containerBt}
                onPress={async () => {
                    let dtext = '12312312312312312dasasdasdasdasdas\n\n\n' + '\n\n'+'12341234\n\n\n\n\n\n\n\n\n\n'
                    dtext += dtext;
                    dtext += dtext;
                    dtext += dtext;
                    try {
                        navigation.navigate('dataView',{
                            title: '1화',
                            owner : 'kim',
                            data: dtext
                        });
                    } catch (error) {
                        console.log(error)
                    }

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

export default TestPage;