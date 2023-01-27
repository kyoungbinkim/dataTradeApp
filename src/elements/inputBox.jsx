import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, } from 'react-native-elements';
import PropTypes from 'prop-types';

const InputBox = ({ inputLabel, inputPlaceHolder, setState, isSecure, btnProps, defaultText, onBlur }) => {

    return (
        <View style={styles.contentView}>
            <View style={btnProps !== undefined ? styles.elemInput : { width: '95%' }}>
                <Input
                    label={inputLabel}
                    placeholder={inputPlaceHolder}
                    onChangeText={(text) => {
                        setState(text);
                    }}
                    secureTextEntry={isSecure}
                    value={defaultText}
                    onBlur={onBlur}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    contentView: {
        padding: 3,
        marginVertical: 3,
        alignItems: 'center',
        flexDirection: 'row'
    },
    elemInput: {
        width: '80%'
    },
    elemCheck: {
        widht: '20%'
    },
});

InputBox.propTypes = {
    inputLabel: PropTypes.string,
    inputPlaceHolder: PropTypes.string.isRequired,
    setState: PropTypes.func.isRequired,
    isSecure: PropTypes.bool.isRequired,
    btnProps: PropTypes.shape({
        title: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired,
        style: PropTypes.object
    }),
    defaultText: PropTypes.string,
    onBlur: PropTypes.func,
};

export default InputBox;