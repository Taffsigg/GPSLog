import { combineReducers } from 'redux';
import tasks from './tasks';
import visibilityFilter from './visibilityFilter';

const todoApp = combineReducers({
    tasks,
    visibilityFilter
});

export default todoApp;