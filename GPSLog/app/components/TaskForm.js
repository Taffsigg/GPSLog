import React from 'react';

import {
    Text,
    TextInput,
    View,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';

class TaskForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {isImportant: false};
    }

    onChange(text) {
        this.task = text;
    }

    onAddPressed() {
        this.props.onAdd(this.task, this.state.isImportant);
    }

    isImportantPressed() {
        this.setState({ isImportant: !this.state.isImportant });
        console.log('isImportantPressed: ', this.state.isImportant);
    }

    render() {
        const styles = this.props.styles();
        return (
            <View style={styles.container}>
                <TextInput
                    onChangeText={this.onChange.bind(this)}
                    style={styles.input}
                />

                <TouchableHighlight
                    onPress={this.isImportantPressed.bind(this)}
                    style={[styles.button, this.state.isImportant?styles.backgroundColorRed:styles.backgroundColorGreen]}
                >
                    <Text
                        style={styles.buttonText}
                    >
                        {this.state.isImportant?'Todo is important':'todo is not important'}
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={this.onAddPressed.bind(this)}
                    style={styles.button}
                >
                    <Text
                        style={styles.buttonText}
                    >
                        Add
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={this.props.onCancel}
                    style={[styles.button, styles.backgroundColorGrey]}
                >
                    <Text
                        style={styles.buttonText}
                    >
                        Cancel
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

TaskForm.propTypes = {
    onAdd: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    styles: React.PropTypes.func.isRequired,
};

export default TaskForm;
