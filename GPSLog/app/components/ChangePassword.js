import React from 'react';

import {
    Text,
    TextInput,
    View,
    TouchableHighlight,
    StyleSheet,
    Alert,
} from 'react-native';

class ChangePassword extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    onChangePasswordPressed(){
        var oldPassword = this.OldPassword;
        var newPassword = this.newPassword;
        var newSecondPassword = this.newSecondPassword;

        if(oldPassword === this.props.userPassword){
            if(newPassword === newSecondPassword){
                console.log('Form correctly filled, newPassword: ', newPassword, ', newSecondPassword: ', newSecondPassword, ', oldPassword: ', this.props.userPassword);
                this._textInputOldPassword.setNativeProps({text: ''});
                this._textInputNewPassword.setNativeProps({text: ''});
                this._textInputNewSecondPassword.setNativeProps({text: ''});
                this.OldPassword = '';
                this.newPassword = '';
                this.newSecondPassword = '';
                this.props.onSubmitNewPassword(newSecondPassword);
            }else{
                console.log('New password is not equal, pw1: ', newPassword, ', pw2: ', newSecondPassword);
                Alert.alert('Password error', 'New password is not equal',[{text: 'RETRY', onPress: () => console.log('RETRY Pressed')},]);
            }
        }else{
            console.log('Old password is wrong, should be: ', this.props.userPassword, ', was: ', oldPassword);
            Alert.alert('Password error', 'Old password is wrong',[{text: 'RETRY', onPress: () => console.log('RETRY Pressed')},]);
        }
    }

    onOldPasswordChange(text) {
        this.OldPassword = text;
    }

    onNewPasswordChange(text) {
        this.newPassword = text;
    }
    onNewSecondPasswordChange(text) {
        this.newSecondPassword = text;
    }

    render() {
        const styles = this.props.styles();
        return (
            <View style={[styles.container, styles.containerPaddingTop]}>
                <Text style={styles.NormalText}>
                    Change password for {this.props.userName}
                </Text>

                <TextInput
                    ref={component => this._textInputOldPassword = component}
                    placeholder='Old password'
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={this.onOldPasswordChange.bind(this)}
                />

                <TextInput
                    ref={component => this._textInputNewPassword = component}
                    placeholder='New password'
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={this.onNewPasswordChange.bind(this)}
                />

                <TextInput
                    ref={component => this._textInputNewSecondPassword = component}
                    placeholder='New password repeated'
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={this.onNewSecondPasswordChange.bind(this)}
                />

                <TouchableHighlight
                    onPress={this.onChangePasswordPressed.bind(this)}
                    style={[styles.button, styles.backgroundColorGrey]}
                >
                    <Text style={styles.buttonText}>
                        Change password
                    </Text>
                </TouchableHighlight>

                <TouchableHighlight
                    onPress={this.props.onShowTodoFrontPage}
                    style={[styles.button, styles.backgroundColorRed]}
                >
                    <Text style={styles.buttonText}>
                        Cancel
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

ChangePassword.propTypes = {
    userName: React.PropTypes.string.isRequired,
    userPassword: React.PropTypes.string.isRequired,
    onSubmitNewPassword: React.PropTypes.func.isRequired,
    onShowTodoFrontPage: React.PropTypes.func.isRequired,
    styles: React.PropTypes.func.isRequired,
};

export default ChangePassword;