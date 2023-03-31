import _ from 'lodash'
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { 
    View,
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity,
} from 'react-native';
import SecureText from '../elements/secureText';
import { Button } from 'react-native-elements';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { useSelector } from 'react-redux';
import DBInstance from '../db';

const MyInfo = ({route, navigation}) => {
    
    const [nck, setNck] = useState('');
    const [ethadr, setEthadr] = useState('');
    const [ethSk , setEthsk] = useState('');
    const [skOwn, setSkOwn] = useState('');

    const [usrInfo, setUsrInfo] = useState(undefined);

    const {usrIdx} = useSelector(state => state.init)

    useEffect(
        () => {
            const unsubscribe = navigation.addListener('focus', (e) => {
                
                DBInstance.dataDB.db.transaction((tx) => {
                    try {
                        tx.executeSql(`SELECT * FROM myInfo WHERE idx = '${usrIdx}'`, [],
                            (tx, results) => {
                                const retJson = results.rows.item(0)
                                console.log(JSON.stringify(retJson, null, 2))
                                setUsrInfo(retJson);
                            })
                    } catch (error) {
                        console.log(error)
                    }
                })
            })

            return unsubscribe;
        }
        , [navigation]);

    
    return(
        <View style={styles.container}>
            <Text>nickname {`\t: ${_.get(usrInfo, 'nickname')}`}</Text>
        
            <SecureText
                normalText={'eth Address'}
                secureText={_.get(usrInfo, 'eoa')}
            />
            <SecureText
                normalText={'eth sk'}
                secureText={_.get(usrInfo, 'eoa_sk')}
            />
            
        </View>
    )
}


const styles = StyleSheet.create({
    scollViewContainer : {
        width: '100%',
        backgroundColor: 'white',
        paddingTop: 0,
        paddingBottom: 0,
        marginTop:20,
        marginBottom:10,
        borderWidth: 1,
        flex:1,

    },
    container: {
        width: '100%',
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 10,
        margin: 5,
    },
    content: {
        textAlign:'center',
        alignContent: 'center',
        marginBottom: 8
    },
    containerBt :{
        alignItems: 'center',
        height: 45,
        width: '75%',
        padding: 5,
        margintop: 10,
        textAlign: 'center',
    },
    text: { 
        width :'78%',
        textAlign: 'left', 
        fontSize : 20,
        marginBottom:15
    },
    btnText: { textAlign: 'center', color: '#fff' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
})

export default MyInfo;