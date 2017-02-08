import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers, compose  } from 'redux';
import { Provider } from 'react-redux';
import AppContainer from './AppContainer';
import thunkMiddleware from 'redux-thunk';
import * as reducers from './reducers';
import createLogger from 'redux-logger';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
const reducer = combineReducers(reducers);
//const store = createStoreWithMiddleware(reducer);
const loggerMiddleware = createLogger({predicate: (getState, action) => __DEV__});

function configureStore(initialState){
    const enhancer = compose(
        applyMiddleware(
            thunkMiddleware,
            loggerMiddleware,
        ),
    );
    return createStore(reducer, initialState, enhancer);
}

const store = configureStore({});

const App = () => (
    <Provider store={store}>
        <AppContainer />
    </Provider>
);



class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        );
    }
}

export default App;