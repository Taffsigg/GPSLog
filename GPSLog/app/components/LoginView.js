import React from 'react';

import {
    Text,
    TextInput,
    View,
    TouchableHighlight,
    StyleSheet,
} from 'react-native';

const dismissKeyboard = require('dismissKeyboard');
const Permissions = require('react-native-permissions');

class LoginView extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        this.getLocationAsync().done(); // async call to get status of location permission and ask for it
    }

    async getLocationAsync() {
        Permissions.requestPermission('location')
            .then(response => {
                //returns once the user has chosen to 'allow' or to 'not allow' access
                //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
                if(response === 'authorized'){
                    this.props.locationPermission(true);
                }else{
                    console.log('denied location...');
                    this.props.locationPermission(false);

                }
            });

        /*
        Permissions.getPermissionStatus('location')
            .then(response => {
                //response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
                if(response === 'authorized'){
                    this.props.locationPermission(true);
                }else{
                    console.log('denied location...');
                    this.props.locationPermission(false);

                }
                this.setState({ photoPermission: response })
            });

        try{
            const { Permissions } = Exponent;
            const { status } = await Permissions.askAsync(Permissions.LOCATION);
            console.log('status: ', status);
            if (status === 'granted') {
                this.props.locationPermission(true);
            } else {
                console.log('denied location...');
                this.props.locationPermission(false);
            }
        }
        catch(e){
            console.log('caught error', e);
        }*/
    }

    onGetLocationRetry() {
        console.log('onGetLocationRetry');
        this.getLocationAsync().done();
    }

    onNameChange(text) {
        this.loginName = text;
    }

    onPasswordChange(text) {
        this.loginPassword = text;
    }

    onLoginPressed() {
        dismissKeyboard();
        var name = this.loginName;
        var password = this.loginPassword;
        this._textInputPassword.setNativeProps({text: ''});
        this.loginPassword = '';
        this.props.onLogin(name, password);
    }

    onCreateUserPressed(){
        this.props.onCreateUserStarted();
    }

    render() {
        const styles = this.props.styles();

        const loginButton = () => {
            if(!this.props.isLocationPermitted){
                return (
                    <TouchableHighlight style={[styles.button, styles.backgroundColorRed]} onPress={this.onGetLocationRetry.bind(this)}>
                        <Text style={styles.buttonText}>
                            Ask for location permission
                        </Text>
                    </TouchableHighlight>
                );
            }
            else{
                return (
                    <TouchableHighlight style={styles.button} onPress={this.onLoginPressed.bind(this)}>
                        <Text style={styles.buttonText}>
                            Login
                        </Text>
                    </TouchableHighlight>
                );
            }
        };

        return (
            <View style={styles.container}>

                <Text style={[styles.buttonText, styles.TextHeader]}>
                    Login
                </Text>

                <TextInput
                    placeholder='Username'
                    style={styles.input}
                    onChangeText={this.onNameChange.bind(this)}
                />

                <TextInput
                    ref={component => this._textInputPassword = component}
                    placeholder='Password'
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={this.onPasswordChange.bind(this)}
                />

                {loginButton()}


                <TouchableHighlight style={[styles.button, styles.backgroundColorGrey]} onPress={this.onCreateUserPressed.bind(this)}>
                    <Text style={styles.buttonText}>
                        Create new user
                    </Text>
                </TouchableHighlight>

            </View>
        );
    }
}

LoginView.propTypes = {
    onLogin: React.PropTypes.func.isRequired,
    onCreateUserStarted: React.PropTypes.func.isRequired,
    locationPermission: React.PropTypes.func.isRequired,
    isLocationPermitted: React.PropTypes.bool.isRequired,
    styles: React.PropTypes.func.isRequired,
};

export default LoginView;
