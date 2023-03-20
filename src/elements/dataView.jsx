import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';

import CustomChipButton from './chipButton';

function DataView({title, owner, dataText}) {
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.titleStyle}> {title} </Text>
        <Text style={styles.owner}> {owner} </Text>
        
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>
            {dataText}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center'
  },
  scrollView: {
    marginHorizontal: 5,
    marginBottom: 5
  },
  content : {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  },
  containerBt :{
    alignItems: 'center',
    height: 45,
    width: '100%',
    padding: 5,
    margintop: 4,
    marginBottom:4,
    textAlign: 'center',
  },
  text: {
    
    textAlign : 'left'
  },
  titleStyle: {
    marginTop:10,
    fontSize : 28,
    fontWeight: 'bold',
    textAlign : 'center'
  },
  owner : {
    marginRight : 30,
    marginBottom: 10,
    fontSize    : 14,
    fontWeight  : '500',
    textAlign   : 'right',
    borderBottomWidth : 12,
    borderColor : '0x000000'
  
  }
});


export function DataViewComp({ title, owner, data, onPress, btTitle }) {
  // const { title, owner, data, navi } = route.params;
  return (<>
    <DataView
      title = {title?? 'title'}
      owner = {owner ?? 'owner'}
      dataText= {data ?? 'data'}
    />
    <CustomChipButton
      title= {btTitle??'close'}
      containerStyle={styles.containerBt}
      onPress={onPress}
    />
  </>);
}
export function DataViewNavi({route, navigation}) {
  const {title, owner, data, onPress, btTitle, navi} = route.params;
  return (<DataViewComp
    title={title}
    owner={owner}
    data={data}
    btTitle = {btTitle}
    onPress={()=>{onPress;navigation.navigate(navi??'data/home')}}
  />)
}

export default DataView;