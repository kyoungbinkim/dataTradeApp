import React, { useEffect, useState } from 'react';
import { Button } from 'react-native-elements';
import { 
    View,
    StyleSheet,
    Platform, 
    SafeAreaView, 
    StatusBar, 
    Alert,
    ScrollView,
    Text,
    TouchableOpacity,
    Pressable,
    Modal} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import CustomChipButton from '../elements/chipButton';
import InputBox from '../elements/inputBox';

import { getDataListQuery } from '../core/http/dataQuery';
import { selectData, selectKey, setData, setSkOwn } from '../store/infoSlice';
import { getUserKeys } from '../core/http/serverQuery';
import { selectServerPublicKey } from '../store/serverInfoSlice';
import { getDataInfoFromHct } from '../core/http/dataQuery';
import { selectUsrIdx } from '../store/initSlice';
import { orderData } from '../core/service/order';

const PageHome = ({navigation}) => {
    const dispatch = useDispatch();
    
    const usrIdx   = useSelector(selectUsrIdx);
    const dataList = useSelector(selectData);
    
    // console.log(usrIdx,dataList)

    const [didx, setDidx] = useState(0);
    const [vis, setVis] = useState(false);
    const [dis, setDis] = useState('');
    const [hct, setHct] = useState('');
    const [nck, setNck] = useState('');

    useEffect(
        () => {() => {}}
    , []);
    
    const ViewModal = () => (
        <Modal
            visible={vis}
            animationType={'slide'}
        >
            <View style={styles.container}>
                <Text style={styles.text}>{dis}</Text>
                <CustomChipButton
                    containerStyle={styles.containerBt}
                    onPress={async ()=> {
                        console.log(hct);
                        
                        const info = await getDataInfoFromHct(hct)
                        console.log(info)
                        await orderData(usrIdx, hct)
                        // // const userKey = await getUserKeys(nck);
                        // console.log("hi", serverPublicKey)
                        // console.log('my KEY : ', key);
                    }}
                    title={'Buy????'}
                />
                <CustomChipButton
                    containerStyle={styles.containerBt}
                    onPress={()=>{setVis(false)}}
                    title={'close'}
                />
            </View>
        </Modal>
    )

    const ViewButton = (ind) => (
        <TouchableOpacity 
            onPress={() => { 
                setDidx(ind);
                setDis(dataList[ind]['descript']);
                setNck(dataList[ind]['owner_nickname']);
                setHct(dataList[ind]['h_ct']);
                setVis(true);
            }}
            style={{alignItems:'center'}}
        >
            <View style={styles.btn}>
                <Text style={styles.btnText}>????</Text>
            </View>
        </TouchableOpacity>

    );
    
    return(
        <View style={styles.container}>
            {ViewModal()}
            <ScrollView
                style={styles.scollViewContainer}
            >
                <Table borderStyle={{ borderWidth: 1, borderColor: '#a0a0a0' }}>
                    <Row data={['??????', '??????', '????????????']} textStyle={{margin:6, textAlign:'center'}}></Row>
                    {
                        dataList.map((val, ind) => (
                            <TableWrapper key={ind} style={{flexDirection: 'row'}}>
                                <Cell data={val['title']} textStyle={{margin:6, }}/>
                                <Cell data={val['owner_nickname']} textStyle={{margin:6, }}/>
                                <Cell data={ViewButton(ind)} textStyle={{margin:6, }}/>
                            </TableWrapper>
                        ))
                    }
                </Table>
            </ScrollView>
            <CustomChipButton 
                title={'refresh'}
                containerStyle={styles.containerBt}
                onPress={async () => {   
                    const data = await getDataListQuery();
                    console.log(data);
                    dispatch(setData(data));
                }}
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
        alignItems: 'center',
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

export default PageHome;

/**
 * 0x44fdbd63557b3f9dcd64d87f774c75274b165d88b62556300a06434ef4afb79
 * 0x44348fcdc35ff4cbc1afb522aeab4cdf6b18f25acad09b5741c994a20428f02
 * 
 * 
 */