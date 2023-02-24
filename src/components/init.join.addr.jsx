import React, { useEffect, useState } from 'react';
import { Text, Button, Icon, Input } from 'react-native-elements';
import {
    View, Modal, Pressable, TextInput, Alert, Image,
    StyleSheet,
    Platform,
    SafeAreaView,
    StatusBar,
    ActivityIndicator
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import 'react-native-get-random-values'
import '@ethersproject/shims';
import { ethers } from 'ethers';

import CustomChipButton from '../elements/chipButton';
import InputBox from '../elements/inputBox';
import {  setAddr } from '../store/joinSlice';

import joinQuery from '../core/http/joinQuery.js';

const InitJoinAddr = ({ navigation }) => {
    const dispathch = useDispatch();


    const [uploadModalVis, setUploadModalVis] = useState(false);
    const [addrGenModalVis, setAddrGenModalVis] = useState(false);
    const [wallet, setWallet] = useState(undefined);
    const [localAddr, setLocalAddr] = useState('');

    const CreateWallet = () => {
        const tmp = ethers.Wallet.createRandom()
        console.log(tmp._signingKey())
        console.log(tmp.address)
        setWallet(tmp)
        setTimeout(() => {
        }, 10000);
    }

    return (
        <View style={[styles.container]}>
            {
                uploadModalVis ?
                    <>  
                        <Text>0xE55b103af6CfB0FFE3Eda18a836399819a089Ae1</Text>
                        <InputBox
                            inputLabel={'EOA 주소 업로드'}
                            inputPlaceHolder={'EOA 주소를 입력하시오.'}
                            setState={setLocalAddr}
                            defaultText={localAddr}
                            isSecure={false}
                            onBlur={() => { }}
                        />
                        <CustomChipButton
                            title={'저장'}
                            containerStyle={styles.containerBt}
                            onPress={async () => {
                                if (!ethers.utils.isAddress(localAddr)) {
                                    Alert.alert('정확한 주소를 입력하시오.');
                                    return;
                                }
                                if(!(await joinQuery.addressCheck(localAddr))){
                                    Alert.alert('이미 가입한 주소입니다.');
                                    return;
                                }
                                
                                dispathch(setAddr(localAddr));
                                navigation.navigate('Join/join')
                            }}
                        />
                    </>
                    :
                    addrGenModalVis ?
                        <>
                            {/* <Text style={styles.text}>{JSON.stringify(wallet._signingKey(),null,2)}</Text> */}
                            <Text style={styles.strongText}>반드시 기억하세요.</Text>
                            <Text style={styles.text}>privKey : {wallet._signingKey().privateKey}</Text>
                            <Text style={styles.text}>pubKey : {wallet._signingKey().publicKey}</Text>
                            <Text style={styles.text}>addr : {wallet.address}</Text>
                            <CustomChipButton
                                title={'close'}
                                containerStyle={styles.containerBt}
                                onPress={() => {
                                    dispathch(setAddr(wallet.address))
                                    setAddrGenModalVis(false);
                                    navigation.navigate('Join/join');
                                }}
                            />

                        </>
                        :
                        <>
                            <Text style={styles.strongText}>EOA 업로드</Text>
                            <CustomChipButton
                                title={'upload ETH addr'}
                                containerStyle={styles.containerBt}
                                onPress={() => {
                                    setUploadModalVis(true)
                                }}
                            />
                            <CustomChipButton
                                title={'Generate ETH addrs'}
                                containerStyle={styles.containerBt}
                                onPress={async () => {
                                    CreateWallet();
                                    setAddrGenModalVis(true)
                                }}
                            />
                        </>
            }
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

export default InitJoinAddr;