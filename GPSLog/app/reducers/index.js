import { combineReducers } from 'redux';
import task from './task';
import user from './user';

const reducer = combineReducers({
    task,
    user,
});

export default reducer