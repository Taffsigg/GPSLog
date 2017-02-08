import * as types from './actionTypes';

export function increment() {
    return {
        type: types.INCREMENT
    };
}

export function decrement() {
    return {
        type: types.DECREMENT
    };
}

export function setLocation(latitude, longitude){
    return {
        type: types.SET_LOCATION,
        currentLocation: {latitude: latitude, longitude: longitude},
    };
}

export function addTodo(task, isImportant){
    return {
        type: types.ADD_TODO,
        task: task,
        isImportant: isImportant,
    };
}

export function doneTodo(todo){
    return {
        type: types.DONE_TODO,
        todo: todo,
    };
}

export function notDoneTodo(todo){
    return {
        type: types.NOT_DONE_TODO,
        todo: todo,
    };
}

export function toggleIsImportant(todo){
    return {
        type: types.TOGGLE_IS_IMPORTANT,
        todo: todo,
    };
}

export function toggleState(){
    return {
        type: types.TOGGLE_STATE,
    };
}

export function authenticate(loginName, loginPassword){
    return {
        type: types.AUTHENTICATE,
        loginName: loginName,
        loginPassword: loginPassword,
    };
}

export function logout(){
    return {
        type: types.LOGOUT,
    };
}

export function addUser(newUserName, newUserPassword){
    return {
        type: types.ADD_USER,
        newUser: newUserName,
        newPassword: newUserPassword,
    };
}

export function setLocationPermission(isLocationPermitted){
    return {
        type: types.SET_LOCATION_PERMISSION,
        locationPermission: isLocationPermitted,
    };
}

