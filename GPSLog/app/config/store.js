import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { app } from '../routes/app'

const middleware = applyMiddleware(thunk);

export default (data = {}) => {
    const rootReducer = combineReducers({
        //every modules reducer should be define here
        [app.NAME]: app.reducer
    });

    return createStore(rootReducer, data, middleware)
}