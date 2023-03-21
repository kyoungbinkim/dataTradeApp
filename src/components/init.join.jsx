import _ from 'lodash'
import React, { useEffect, useState } from 'react';
import { Text, Button , Icon, Input} from 'react-native-elements';
import { 
    View, Modal, Pressable,TextInput,Alert,
    StyleSheet
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import CustomChipButton from '../elements/chipButton';
import mimc from '../core/crypto/mimc';
import UserKey from '../core/wallet/keyStruct';
import httpCli from '../core/http/http';
import types from '../core/utils/types';

const InitJoinJoin = ({ route, navigation }) => {

    const { sk_own, nickname } = route.params;

    useEffect(()=>{},[])

    function join(){
        const mimc7 = new mimc.MiMC7();
        
        const keys = JSON.parse(UserKey.recoverFromUserSk(sk_own).toJson());
        
        const JoinQuery = {
            loginTk : mimc7.hash(_.get(keys,'skOwn'), types.asciiToHex('login')),
            nickname: nickname,
            skEnc   : _.get(keys, 'skOwn'),
            pkOwn   : _.get(keys, 'pkOwn'),
            pkEnc   : _.get(keys, 'pkEnc'),
            addr    : _.get(keys, 'ena'),
            // EOA     : address,
        }

        httpCli.post("/usr/join/join", JoinQuery).then(res =>{
            console.log(res.data);
            if(res.data["flag"] === false){
              Alert.alert("이미가입되었거나 올바르지 않은 주소입니다.");
              return;
            }
            Alert.alert("sucess Join"+ 
                "\n\nblockHash : " + res.data['receipt']['blockHash']+
                "\ntxHash : " + res.data['receipt']['transactionHash'] +'\n');
            Clipboard.setString(sk_own);
            navigation.navigate(`Init`);
        });

    }

    return(
        <View style={[styles.container]}>
            <Text style={styles.text}>nickname : {nickname}</Text>
            <Text style={styles.text}>sk_own : {sk_own}</Text>
            {/* <Text style={styles.text}>address : {address}</Text> */}
            <CustomChipButton
                containerStyle={styles.containerBt}
                title={'Join'}
                onPress={()=>{join()}}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width:'100%',
        backgroundColor:'white',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        margin: 5,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginBottom: 8
    },
    containerBt :{
        alignItems:'center',
        justifyContent:'center',
        height: 45,
        width: '75%',
        padding: 5,
        margintop: 5,
    },
    text : {
        textAlign:'left',
        fontSize: 15,
        marginBottom:25,
    },
    strongText: {
        fontSize:25,
        fontStyle:'italic',
        marginBottom:5,
        fontWeight:'bold'
    },  
    copyBt : {
        alignSelf:'auto',
        height:35
    },
    box : {
        // marginTop:'50%',
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width : '100%',
        flex: .4,
        borderWidth: 5,
        borderRadius:20,
        borderColor:'#554BED'
    },
    input: {
        height: 40,
        margin: 12,
        width : '80%',
        borderWidth: 1,
        padding: 10,
        fontSize:9,
    },
})

export default InitJoinJoin;