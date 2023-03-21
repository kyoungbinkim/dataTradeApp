import _ from 'lodash'
import React, { useEffect, useState } from 'react';
import { 
    View, Modal, Pressable,TextInput,Alert,
    StyleSheet
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import CustomChipButton from '../elements/chipButton';
import InputBox from '../elements/inputBox';

import JoinService from '../core/service/join';

const InitJoinPsswrd = ({ route, navigation }) => {

    const { sk_own, nickname } = route.params;
    const [psswrd, setPsswrd] = useState('');
    const [psswrdCheck, setPsswrdCheck] = useState('');

    useEffect(() => {}, [])

    return(
        <View style={[styles.container]}>
            <InputBox
                inputLabel={'password'}
                inputPlaceHolder={'비밀번호를 입력하시오'}
                setState={setPsswrd}
                defaultText={psswrd}
                isSecure={true}
                onBlur={() => {}}
            />
            <InputBox
                inputLabel={''}
                inputPlaceHolder={'비밀번호 다시 한번 입력해주세요'}
                setState={setPsswrdCheck}
                defaultText={psswrdCheck}
                isSecure={true}
                onBlur={() => {}}
            />

            {
                psswrdCheck === psswrd && psswrd !== '' ?
                    <CustomChipButton
                        containerStyle={styles.containerBt}
                        title={'Join'}
                        onPress={async () => {
                            const [flag, ret] = await JoinService(sk_own, nickname, psswrd);
                            console.log(flag, ret);
                            if (!flag) {
                                Alert.alert('다시 시도 해주세요.')
                            }
                            Alert.alert("sucess Join" +
                                "\n\nblockHash : " + ret['receipt']['blockHash'] +
                                "\ntxHash : " + ret['receipt']['transactionHash'] + '\n');
                            Clipboard.setString(sk_own);
                            navigation.navigate(`Init`);
                        }}
                    /> :
                    <></>
            }
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

export default InitJoinPsswrd;