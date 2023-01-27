import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Chip } from 'react-native-elements';
import { StyleSheet, Text, View } from 'react-native';


function CustomChipButton({containerStyle, onPress, title, linearGradientColor}) {
    const gradientColor = linearGradientColor ? linearGradientColor : styles.chip.linearGradientProps;
    return (
        <View style={containerStyle}>
            <Chip
                ViewComponent={LinearGradient}
                linearGradientProps={linearGradientColor || styles.chip.linearGradientProps}
                containerStyle={styles.chip.containerStyle}
                buttonStyle={styles.chip.buttonStyle}
                title={(
                    <Text style={styles.chip.titleStyle}>
                        {title}
                    </Text>
                )}
                onPress={onPress}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    chip: {
        containerStyle: {
            width: '100%',
            height: '100%',
        },
        linearGradientProps: {
            // colors: ['#7269F7', '#554BED'],
            colors: ['#9993F4', '#554BED'],
            start: { x: 0.1, y: 0 },
            end: { x: 0.9, y: 1 },
        },
        buttonStyle: {
            // backgroundColor: '#554BED',
            borderRadius: 12,
            height: '100%',
        },
        titleStyle: {
            textAlign : 'center',
            color: 'white',
            fontSize: 15,
            fontWeight: '600',
        },
    },
});

export default CustomChipButton;