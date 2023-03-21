import React, { useEffect, useState } from 'react';
import { Text, Button, Icon, Input } from 'react-native-elements';
import {
    View, Modal, Pressable, TextInput, Alert,
    StyleSheet,
} from 'react-native';
import CustomChipButton from '../elements/chipButton';
import InputBox from '../elements/inputBox';
import joinQuery from '../core/http/joinQuery';


const InitJoinNickname = ({ route, navigation }) => {
    const [nickname, setLocalNickname] = useState('');
    const { sk_own } = route.params;

    return (
        <View style={[styles.container]}>
            <InputBox
                inputLabel={'중복확인'}
                inputPlaceHolder={'닉네임을 입력하시오'}
                setState={setLocalNickname}
                defaultText={nickname}
                isSecure={false}
                onBlur={() => {}}
            />
            <CustomChipButton 
                containerStyle={[styles.containerBt, {width:'50%'}]}
                title={'중복확인'}
                onPress={ async () => {
                    try {
                        if(await joinQuery.nicknameCheck(nickname)){
                            navigation.navigate('Join/join', {
                                sk_own : sk_own,
                                nickname : nickname
                            })                    
                        }
                        else{
                            Alert.alert('닉네임을 다시 입력하시오')
                        }
                    } catch (error) {
                        console.log(error)
                        Alert.alert(error);
                        navigation.navigate('Join/nickname');
                    }
                    
                    
                }}
            />
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
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
    containerBt: {
        justifyContent: 'center',
        height: 45,
        width: '75%',
        padding: 5,
        margintop: 5,
    },
    text: {
        fontSize: 15,
        marginBottom: 25,
    },
    strongText: {
        fontSize: 25,
        fontStyle: 'italic',
        marginBottom: 5,
        fontWeight: 'bold'
    },
    copyBt: {
        alignSelf: 'auto',
        height: 35
    },
    box: {
        // marginTop:'50%',
        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flex: .4,
        borderWidth: 5,
        borderRadius: 20,
        borderColor: '#554BED'
    },
    input: {
        height: 40,
        margin: 12,
        width: '80%',
        borderWidth: 1,
        padding: 10,
        fontSize: 9,
    },
})

export default InitJoinNickname;