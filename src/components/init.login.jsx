import React, { useEffect, useState } from 'react';
import { 
    View,
    StyleSheet,
    Alert} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import CustomChipButton from '../elements/chipButton';
import InputBox from '../elements/inputBox';

import PublicKey from '../core/snark/struct/pk';
import UserKey from '../core/wallet/keyStruct';
import { loginQuery } from '../core/http/loginQuery';
import { setLogin } from '../store/initSlice';
import { setData, setKey, setPublicKey } from '../store/infoSlice';
import { getDataListQuery } from '../core/http/dataQuery';


const InitLogin = ({ navigation }) => {
    const dispatch = useDispatch();

    const [localSk, setLocalSk] = useState('');
    return (
        <View style={styles.container}>
            <InputBox
                inputLabel={'write your sk_own'}
                inputPlaceHolder={''}
                setState={setLocalSk}
                defaultText={localSk}
                isSecure={false}
                onBlur={() => { }}
            />
            <CustomChipButton
                title={'login'}
                containerStyle={styles.containerBt}
                onPress={ async () => {
                    if(await loginQuery(localSk)){
                        dispatch(setLogin())
                        const data = await getDataListQuery();
                        dispatch(setData(data));

                        const usrkey = UserKey.recoverFromUserSk(localSk);
                        dispatch(setKey(usrkey));
                        dispatch(setPublicKey(PublicKey.fromUserKey(usrkey)));
                    }
                    else{
                        Alert.alert('올바르지 않습니다.')
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

export default InitLogin;