import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-elements';

function textSecure(text, flag=false){
    return (flag? '*'.repeat(text.length) : text)
}

function SecureText({ normalText, secureText }) {
    const [flag, setFlag] = useState(true)
    let preSecureText = textSecure(secureText, flag)
    useEffect(() => {
    },[flag])
    return (
        <TouchableOpacity onPress={() => {
            setFlag(!flag)
            preSecureText = textSecure(secureText, flag)
        }}>
            <Text style={styles.text}>{normalText} : {preSecureText} </Text>
        </TouchableOpacity>
    )
}

export function CopyText({label, text}) {
    return (
        <>
            <Text style={styles.text}> {label} :  <Button title={<Text style={styles.text}>copy</Text>}/>  </Text>
        </>
    )
}

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
    justifyContent:'center',
    fontSize:11,
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


export default SecureText;