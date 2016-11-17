import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import todoApp from './reducers';
import Home from './containers/Home';

const store = createStore(todoApp);

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <Home />
            </Provider>
        );
    }
}

export default App;