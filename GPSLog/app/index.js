import React from 'react'
import { Component } from 'react-native';
import { Provider } from 'react-redux';
import { home } from './routes/home';
import createStore from './config/store';

const store = createStore();

const App = () => {
    return (
        <Provider store={store}>
            <home.Home />
        </Provider>
    )
};

export default App