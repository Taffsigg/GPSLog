import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

const middleware = applyMiddleware(thunk);

export default (data = {}) => {
    return createStore(reducer, data, middleware)
}