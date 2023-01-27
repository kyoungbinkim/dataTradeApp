import React, { useEffect, useState } from 'react';
import { Text, Button, Icon, Input } from 'react-native-elements';
import {
    View, Modal, Pressable, TextInput, Alert,
    StyleSheet,
    Platform,
    SafeAreaView,
    StatusBar
} from 'react-native';

import Spinner from '../Infinity.gif'


export default function({vis}){
    return (
        <View style={styles.container}>
            <Modal
                visible={vis}
            >
                <img src={Spinner} alt='생성중' width='35%'/>
            </Modal>
        </View>
    );
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
})