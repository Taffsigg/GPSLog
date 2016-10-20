import React from 'react';

import {
    Text,
    TextInput,
    View,
    TouchableHighlight,
    StyleSheet,
    Alert,
} from 'react-native';

class CreateUser extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    onCreateUserPressed(){
        var username = this.username;
        var password = this.password;
        var passwordRepeated = this.passwordRepeated;

        if(password === passwordRepeated){
            this._textInputUsername.setNativeProps({text: ''});
            this._textInputPassword.setNativeProps({text: ''});
            this._textInputSecondPassword.setNativeProps({text: ''});
            this.username = '';
            this.password = '';
            this.passwordRepeated = '';
            this.props.submitNewUser(username, passwordRepeated);
        }else{
            Alert.alert('Password error', 'Password is not equal',[{text: 'RETRY', onPress: () => console.log('RETRY Pressed')},]);
        }
    }

    onUsernameChange(text) {
        this.username = text;
    }

    onPasswordChange(text) {
        this.password = text;
    }

    onPasswordRepeatedChange(text) {
        this.passwordRepeated = text;
    }

    render() {
        const styles = this.props.styles();
        return (
            <View style={[styles.container, styles.containerPaddingTop]}>
                <Text style={styles.NormalText}>
                    Create user
                </Text>

                <TextInput
                    ref={component => this._textInputUsername = component}
                    placeholder='username'
                    style={styles.input}
                    onChangeText={this.onUsernameChange.bind(this)}
                />

                <TextInput
                    ref={component => this._textInputPassword = component}
                    placeholder='Password'
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={this.onPasswordChange.bind(this)}
                />

                <TextInput
                    ref={component => this._textInputSecondPassword = component}
                    placeholder='Password repeated'
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={this.onPasswordRepeatedChange.bind(this)}
                />

                <TouchableHighlight
                    onPress={this.onCreateUserPressed.bind(this)}
                    style={[styles.button, styles.backgroundColorGreen]}
                >
                    <Text style={styles.buttonText}>
                        Create user
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={this.props.onShowTodoFrontPage}
                    style={[styles.button, styles.backgroundColorGrey]}
                >
                    <Text style={styles.buttonText}>
                        Cancel
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

CreateUser.propTypes = {
    submitNewUser: React.PropTypes.func.isRequired,
    onShowTodoFrontPage: React.PropTypes.func.isRequired,
    styles: React.PropTypes.func.isRequired,
};

export default CreateUser;