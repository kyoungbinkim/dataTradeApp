import React, { useEffect, useState } from 'react';
import { Text, Button, Icon, Input } from 'react-native-elements';
import {
    View, Modal, Pressable, TextInput, Alert,
    StyleSheet,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useDispatch, useSelector } from 'react-redux';

import CustomChipButton from '../elements/chipButton';
import { setSkOwn } from '../store/joinSlice';
import { selectSkOwn } from '../store/joinSlice';
import UserKey from '../core/wallet/keyStruct.js';

const InitJoinHome = ({ navigation }) => {
    const dispathch = useDispatch();
    const [keyGenVis, setKeyGenVis] = useState(false);

    const KeyGenModal = () => {  
        const sk_own = useSelector(selectSkOwn);
        return (
            <Modal
                animationType='slide'
                transparent={false}
                visible={keyGenVis}
                style={styles.container}
            >   
                <View style={[styles.container, ]}>
                    <View style={styles.box}>
                        <View>
                            <Text style={styles.strongText}>반드시 기억하세요.</Text>
                            <Text style={styles.text}>
                                sk_own : {'0x'+sk_own}
                            </Text> 
                        </View> 
                        <CustomChipButton
                            onPress={ () => {
                                setKeyGenVis(false)
                                navigation.navigate('Join/nickname')
                            }}
                            containerStyle = {[styles.containerBt]}
                            title={'close'}
                        />
                    </View>
                </View>
            </Modal>
        );
    }

    return (
        <View style={[styles.container]}>
                <CustomChipButton
                    title={'key generation 🔑'}
                    containerStyle={[styles.containerBt]}
                    onPress={() => {
                        const sk_own = UserKey.keyGen()['skOwn']
                        dispathch(setSkOwn(sk_own));
                        Clipboard.setString(sk_own);
                        Alert.alert('비밀키가 클립보드에 복사되었습니다.');
                        setKeyGenVis(true);
                }}/>
                {<KeyGenModal/>}
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
        margin : 5
    },
    strongText: {
        fontSize: 25,
        fontStyle: 'italic',
        margin : 5,
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

export default InitJoinHome;