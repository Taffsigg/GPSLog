import React from 'react';

import {
    Text,
    View,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';

export default function render(styles) {
    return (
        <View style={styles.container}>

            <TouchableHighlight
                onPress={this.onIsImportantPressed.bind(this)}
                style={styles.isImportantButton}
            >
                <Text>IOS: {this.props.todo.isImportant?'!':'-'}</Text>
            </TouchableHighlight>

            <Text
                style={styles.label}
            >{this.props.todo.task}</Text>

            <TouchableHighlight
                onPress={this.onDonePressed.bind(this)}
                style={styles.doneButton}
            >
                <Text>Done</Text>
            </TouchableHighlight>

        </View>
    );
}