import _ from 'lodash'
import React, { useEffect, useState } from 'react';
import { 
    View,
    StyleSheet,
    Alert} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import CustomChipButton from '../elements/chipButton';
import InputBox from '../elements/inputBox';

import loginService from '../core/service/login';
import PublicKey from '../core/snark/struct/pk';
import UserKey from '../core/wallet/keyStruct';
import { loginQuery } from '../core/http/loginQuery';
import { setLogin, setUsrIdx } from '../store/initSlice';
import { setData, setKey, setPublicKey } from '../store/infoSlice';
import { getDataListQuery } from '../core/http/dataQuery';


const InitLogin = ({ navigation }) => {
    const dispatch = useDispatch();

    const [psswrd, setPsswrd] = useState('');
    return (
        <View style={styles.container}>
            <InputBox
                inputLabel={''}
                inputPlaceHolder={'비밀번호를 입력하시오'}
                setState={setPsswrd}
                defaultText={psswrd}
                isSecure={true}
                onBlur={() => { }}
            />
            <CustomChipButton
                title={'login'}
                containerStyle={styles.containerBt}
                onPress={ async () => {

                    const [flag, info] = await loginService(psswrd);

                    console.log(info, typeof info,Number.parseInt( _.get(info, 'idx') ));

                    if(flag) {
                        const data = await getDataListQuery();
                        dispatch(setUsrIdx(_.get(info, 'idx') ))
                        dispatch(setData(data));
                        dispatch(setLogin());
                    }
                    else{
                        Alert.alert('등록되지 않거나 올바르지 않은 비밀번호입니다.')
                    }
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        // backgroundColor: 'white',
        flex: 0.15,
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