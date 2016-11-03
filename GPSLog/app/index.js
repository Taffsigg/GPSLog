import React from 'react'
import { Component } from 'react-native';
import { Provider } from 'react-redux';

import { app } from './routes/app'

import createStore from './config/store'

const store = createStore();

const Main = () => {
    return (
        <Provider store={store}>
            <app.App />
        </Provider>
    )
};

export default Main