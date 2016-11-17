import React from 'react';

import {
    Navigator,
    Alert,
} from 'react-native';

import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import LoginView from '../components/LoginView';
import TodoFrontPage from '../components/TodoFrontPage';
import ChangePassword from '../components/ChangePassword';
import CreateUser from '../components/CreateUser';
import Map from '../components/Map';
import TodoStore from '../reducers/todoStore';

export default class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = TodoStore.getState();

        TodoStore.subscribe(() => {
            this.setState(TodoStore.getState());
        });
    }

    static route = {
        navigationBar: {
            title: 'Todo'
        },
    };

    startLocationWatch(){
        this.watchID = navigator.geolocation.watchPosition((position) => {
            console.log('watch lat: ', position.coords.latitude, ', lon: ', position.coords.longitude);
            TodoStore.dispatch({
                type: 'SET_LOCATION',
                currentLocation: {latitude: position.coords.latitude, longitude: position.coords.longitude},
            });
        });
    }

    onAddStarted() {
        this.nav.push({
            name: 'taskForm',
        });
    }

    onCancel() {
        console.log('cancelled!');
        this.nav.pop();
    }

    onAdd(task, isImportant) {
        if(task === undefined){
            console.log('task is undefined');
            task = '-';
        }
        console.log('a task was added: ', task);
        TodoStore.dispatch({
            type: 'ADD_TODO',
            task,
            isImportant,
        });
        this.nav.pop();
    }

    onDone(todo) {
        if(this.state.filter === "pending"){
            console.log('todo was completed: ', todo.task);
            TodoStore.dispatch({
                type: 'DONE_TODO',
                todo,
            });
        }else{ // this.state.filter = "done"
            console.log('done todo was set to pending: ', todo.task);
            TodoStore.dispatch({
                type: 'NOT_DONE_TODO',
                todo,
            });
        }
    }

    isImportant(todo) {
        console.log('todo: ', todo.task, ', isImportant: ', todo.isImportant);
        TodoStore.dispatch({
            type: 'TOGGLE_IS_IMPORTANT',
            todo,
        });
    }

    onToggle() {
        TodoStore.dispatch({
            type: 'TOGGLE_STATE',
        });
    }

    onLogin(loginName, loginPassword) {
        const authenticatedUser = this.state.users.find(x => x.loginName === loginName && x.loginPassword === loginPassword);
        if(authenticatedUser !== undefined){
            TodoStore.dispatch({
                type: 'AUTHENTICATE',
                loginName: loginName,
                loginPassword: loginPassword,
            });
            this.nav.push({
                name: 'todoFrontPage',
            });
        }else{
            Alert.alert(
                'Login Error', 'Wrong username or password entered!',[{text: 'RETRY', onPress: () => console.log('RETRY Pressed')},]
            );
        }
    }

    onLogout() {
        TodoStore.dispatch({
            type: 'LOGOUT',
        });
        this.nav.pop();
    }

    onShowTaskList() {
        this.nav.push({
            name: 'taskList',
        });
    }

    onShowTodoFrontPage() {
        this.nav.pop();
    }

    onChangePassword(){
        this.nav.push({
            name: 'changePassword',
        });
    }

    onSubmitNewPassword(newPassword){
        Alert.alert(
            'Password changed', 'The password have been changed',[{text: 'OK', onPress: () => console.log('OK Pressed')},]
        );
        TodoStore.dispatch({
            type: 'CHANGE_PASSWORD',
            loginPassword: newPassword,
        });
        this.nav.pop();
    }

    onCreateUserStarted(){
        this.nav.push({
            name: 'createUser',
        });
    }

    submitNewUser(newUserName, newUserPassword){
        TodoStore.dispatch({
            type: 'ADD_USER',
            newUser: newUserName,
            newPassword: newUserPassword,
        });
        this.nav.pop();
    }

    onSetlocationPermission(isLocationPermitted){
        console.log('onSetlocationPermission isLocationPermitted: ', isLocationPermitted, 'store: ', this.state.locationPermission);
        TodoStore.dispatch({
            type: 'SET_LOCATION_PERMISSION',
            locationPermission: isLocationPermitted,
        });
        if(isLocationPermitted === true){
            this.startLocationWatch();
        }
    }

    onMap(){
        this.nav.push({
            name: 'map',
        });
    }

    renderScene(route, nav) {
        switch (route.name) {
            case 'taskForm':
                return (
                    <TaskForm
                        onAdd={this.onAdd.bind(this)}
                        onCancel={this.onCancel.bind(this)}
                        styles={this.state.styles}
                    />
                );
            case 'taskList':
                return (
                    <TaskList
                        filter={this.state.filter}
                        filteredTodos={this.state.filteredTodos}
                        onAddStarted={this.onAddStarted.bind(this)}
                        onDone={this.onDone.bind(this)}
                        isImportant={this.isImportant.bind(this)}
                        onToggle={this.onToggle.bind(this)}
                        onShowTodoFrontPage={this.onShowTodoFrontPage.bind(this)}
                        styles={this.state.styles}
                    />
                );
            case 'todoFrontPage':
                return (
                    <TodoFrontPage
                        userName={this.state.authenticatedUser.loginName}
                        onLogout={this.onLogout.bind(this)}
                        onShowTaskList={this.onShowTaskList.bind(this)}
                        onChangePassword={this.onChangePassword.bind(this)}
                        onMap={this.onMap.bind(this)}
                        styles={this.state.styles}
                    />
                );
            case 'changePassword':
                return (
                    <ChangePassword
                        userName={this.state.authenticatedUser.loginName}
                        userPassword={this.state.authenticatedUser.loginPassword}
                        onSubmitNewPassword={this.onSubmitNewPassword.bind(this)}
                        onShowTodoFrontPage={this.onShowTodoFrontPage.bind(this)}
                        styles={this.state.styles}
                    />
                );
            case 'createUser':
                return (
                    <CreateUser
                        submitNewUser={this.submitNewUser.bind(this)}
                        onShowTodoFrontPage={this.onShowTodoFrontPage.bind(this)}
                        styles={this.state.styles}
                    />
                );
            case 'map':
                return (
                    <Map
                        workPlace={this.state.workPlace}
                        currentLocation={this.state.currentLocation}
                        onShowTodoFrontPage={this.onShowTodoFrontPage.bind(this)}
                        styles={this.state.styles}
                    />
                );
            case 'loginView':
                return (
                    <LoginView
                        onLogin={this.onLogin.bind(this)}
                        onCreateUserStarted={this.onCreateUserStarted.bind(this)}
                        locationPermission={this.onSetlocationPermission.bind(this)}
                        isLocationPermitted={this.state.locationPermission}
                        styles={this.state.styles}
                    />
                );
            default:
                return (
                    <LoginView
                        onLogin={this.onLogin.bind(this)}
                        onCreateUserStarted={this.onCreateUserStarted.bind(this)}
                        locationPermission={this.onSetlocationPermission.bind(this)}
                        isLocationPermitted={this.state.locationPermission}
                        styles={this.state.styles}
                    />
                );
        }
    }

    configureScene() {
        return Navigator.SceneConfigs.FloatFromBottom;
    }

    render() {
        return (
            <Navigator
                configureScene={this.configureScene}
                initialRoute={{name: 'loginView', index: 0}}
                ref={((nav) => {
                    this.nav = nav;
                })}
                renderScene={this.renderScene.bind(this)}
            />
        );
    }


}
