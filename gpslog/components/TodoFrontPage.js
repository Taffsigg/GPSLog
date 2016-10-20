import React from 'react';

import {
    View,
    StyleSheet,
    TouchableHighlight,
    Text,
} from 'react-native';

class TodoFrontPage extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        const styles = this.props.styles();
        return (
            <View style={[styles.container, styles.containerPaddingTop]}>

                <Text style={styles.NormalText}>
                    welcome {this.props.userName}
                </Text>

                <TouchableHighlight
                    onPress={this.props.onShowTaskList}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>
                        Show todo list
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={this.props.onMap}
                    style={[styles.button, styles.backgroundColorGreen]}
                >
                    <Text style={styles.buttonText}>
                        Map
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={this.props.onChangePassword}
                    style={[styles.button, styles.backgroundColorGrey]}
                >
                    <Text style={styles.buttonText}>
                        Change password
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={this.props.onLogout}
                    style={[styles.button, styles.backgroundColorRed]}
                >
                    <Text style={styles.buttonText}>
                        logout
                    </Text>
                </TouchableHighlight>

            </View>
        );
    }
}

TodoFrontPage.propTypes = {
    userName: React.PropTypes.string.isRequired,
    onLogout: React.PropTypes.func.isRequired,
    onShowTaskList: React.PropTypes.func.isRequired,
    onChangePassword: React.PropTypes.func.isRequired,
    onMap: React.PropTypes.func.isRequired,
    styles: React.PropTypes.func.isRequired,
};

export default TodoFrontPage;