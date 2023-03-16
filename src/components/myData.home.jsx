import _ from 'lodash'
import React, { useEffect, useState, useLayoutEffect } from 'react';
import { 
    View,
    StyleSheet,
    ScrollView,
    Text,
    TouchableOpacity,
    Modal} from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import { useDispatch, useSelector } from 'react-redux';

import CustomChipButton from '../elements/chipButton';
import { getDataListQuery } from '../core/http/dataQuery';
import { selectData, setData } from '../store/infoSlice';
import { getDataInfoFromHct } from '../core/http/dataQuery';
import { selectUsrIdx } from '../store/initSlice';
import { orderData } from '../core/service/order';
import { DataViewComp } from '../elements/dataView';
import DBInstance from '../db';

const MyDataHome = ({route, navigation}) => {
    const dispatch = useDispatch();

    // const {dataList, test} = route.params;
    const [dataList, setDataList] = useState([]); 

    const [didx, setDidx] = useState(0);
    const [vis, setVis] = useState(false);
    const [dis, setDis] = useState('');
    const [hct, setHct] = useState('');
    const [nck, setNck] = useState('');

    useEffect(
        () => {
            DBInstance.dataDB.db.transaction((tx) => {
                try {
                    tx.executeSql('SELECT * FROM data', [],
                        (tx, results) => {
                            // console.log(JSON.stringify(results.rows.item))
                            // console.log(tx, results)
                            // console.log(results.rows.item(0),results.rows.item(1))
                            let tmp = []
                            for (let i=0; i<results.rows.length; i++){
                                tmp.push(results.rows.item(i))
                            }
                            console.log(tmp)
                            setDataList(tmp)
                        })
                } catch (error) {
                    console.log(error)
                }

            })
        }
        , []);

    const ViewButton = (ind) => (
        <TouchableOpacity 
            onPress={() => { 
                setDidx(ind);
                setDis(dataList[ind]['descript']);
                setNck(dataList[ind]['owner_nickname']);
                setHct(dataList[ind]['h_ct']);
                setVis(true);

                navigation.navigate(
                    'data/view',
                    {
                        title : _.get(dataList[ind], 'title'),
                        owner : _.get(dataList[ind], 'owner'),
                        data : _.get(dataList[ind], 'data'),
                        btTitle : 'close',
                        navi : 'data/home'
                    }
                )

            }}
            style={{alignItems:'center'}}
        >
            <View style={styles.btn}>
                <Text style={styles.btnText}> 📖 </Text>
            </View>
        </TouchableOpacity>

    );
    
    return(
        <View style={styles.container}>
            <ScrollView
                style={styles.scollViewContainer}
            >
                <Table borderStyle={{ borderWidth: 1, borderColor: '#a0a0a0' }}>
                    <Row data={['제목', '작가', '읽기']} textStyle={{margin:6, textAlign:'center'}}></Row>
                    {
                        dataList.map((val, ind) => (
                            <TableWrapper key={ind} style={{flexDirection: 'row'}}>
                                <Cell data={_.get(val, 'title')} textStyle={{margin:6, }}/>
                                <Cell data={_.get(val, 'owner')} textStyle={{margin:6, }}/>
                                <Cell data={ViewButton(ind)} textStyle={{margin:6, }}/>
                            </TableWrapper>
                        ))
                    }
                </Table>
            </ScrollView>
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

export default MyDataHome;