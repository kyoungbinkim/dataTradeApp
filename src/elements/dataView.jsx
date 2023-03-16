import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  View
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


export function DataViewComp({ route, navigation}) {
  const { title, owner, data, navi } = route.params;
  console.log(title, owner, navi )
  return (<>
    <DataView
      title = {title}
      owner = {owner}
      dataText= {data}
    />
    <CustomChipButton
      title= {'close'}
      containerStyle={styles.containerBt}
      onPress={()=>{
        navigation.navigate(navi??'Init');
      }}
    />
  </>);
}

export default DataView;