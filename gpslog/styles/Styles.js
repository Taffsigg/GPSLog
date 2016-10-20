import React from 'react';

import {
    StyleSheet,
} from 'react-native';

export default function styles() {

    return styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-start',
            paddingTop: 150,
            backgroundColor: '#F7F7F7',
        },
        rowContainer: {
            backgroundColor: '#fff',
            borderWidth: 1,
            borderColor: '#E7E7E7',
            padding: 10,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
            marginLeft: 10,
            marginRight: 10,
        },
        containerPaddingTop:{
            paddingTop: 0,
        },
        input: {
            borderWidth: 1,
            borderColor: '#D7D7D7',
            height: 50,
            marginLeft: 10,
            marginRight: 10,
            padding: 15,
            borderRadius: 3,
        },
        buttonText: {
            fontSize: 18,
            fontWeight: '600',
            color: '#FAFAFA',
        },
        NormalText: {
            color: '#000000',
            fontSize: 20,
            fontWeight: '600',
            marginLeft: 20,
        },
        label: {
            fontSize: 20,
            fontWeight: '300',
        },
        TextHeader: {
            color: '#000000',
            marginLeft: 20,
        },
        button: {
            height: 50,
            backgroundColor: '#333',
            margin: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        doneButton: {
            borderRadius: 0,
            backgroundColor: '#EAEAEA',
            padding: 5,
        },
        isImportantButton: {
            paddingLeft: 10,
            paddingRight: 10,
        },
        backgroundColorGrey: {
            backgroundColor: '#666',
        },
        backgroundColorRed: {
            backgroundColor: '#FF6666',
        },
        backgroundColorGreen: {
            backgroundColor: '#66FF66',
        },
    });
}