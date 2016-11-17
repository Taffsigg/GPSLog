import React from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';

export default function render(styles) {

    const localStyle = StyleSheet.create({
        doneButton: {
            borderRadius: 0,
            padding: 5,
        },
        isImportantColor: {
            backgroundColor: this.props.todo.isImportant?'#FFCCCC':'#CCFFCC',
        },
    });

    return (
        <View style={[styles.rowContainer, localStyle.isImportantColor]}>

            <TouchableHighlight style={styles.isImportantButton} onPress={this.onIsImportantPressed.bind(this)}>
                <Text style={[styles.label]}>{this.props.todo.isImportant ? '!' : '-'}</Text>
            </TouchableHighlight>

            <Text style={styles.label}>{this.props.todo.task}</Text>

            <TouchableHighlight
                onPress={this.onDonePressed.bind(this)}
                style={localStyle.doneButton}
                underlayColor="#ddd"
            >
            {this.chooseImage()}
            </TouchableHighlight>

        </View>
    );
}