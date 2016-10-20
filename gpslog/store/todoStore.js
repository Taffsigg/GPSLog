import{
    createStore,
} from 'redux';

import styles from '../styles/Styles';

const defaultAllTodos = [
    {
        task: 'Remove done todo',
        isImportant: false,
        state: 'pending',
        user: 'meh',
    },
    {
        task: 'Realm local database',
        isImportant: true,
        state: 'pending',
        user: 'meh',
    },
    {
        task: 'Export app away from exponent',
        isImportant: false,
        state: 'pending',
        user: 'meh',
    },
    {
        task: 'Redux multiple reducers',
        isImportant: true,
        state: 'pending',
        user: 'meh',
    },
    {
        task: 'smoke weed everydaaay',
        isImportant: false,
        state: 'pending',
        user: 'frederik',
    },
    {
        task: 'get map up and running',
        isImportant: true,
        state: 'done',
        user: 'meh',
    },
    {
        task: 'Interactive map',
        isImportant: true,
        state: 'done',
        user: 'meh',
    },
    {
        task: 'one todo per user',
        isImportant: true,
        state: 'done',
        user: 'meh',
    },
    {
        task: 'create user',
        isImportant: true,
        state: 'done',
        user: 'meh',
    },
    {
        task: 'change password',
        isImportant: true,
        state: 'done',
        user: 'meh',
    },
    {
        task: 'todo list',
        isImportant: false,
        state: 'done',
        user: 'meh',
    },
    {
        task: 'isImportant function',
        isImportant: false,
        state: 'done',
        user: 'meh',
    },
    {
        task: 'Simple login',
        isImportant: false,
        state: 'done',
        user: 'meh',
    },
    {
        task: 'Master CSS file',
        isImportant: true,
        state: 'done',
        user: 'meh',
    },
];

const defaultUsers = [
    {
        loginName: 'meh',
        loginPassword: 'meh',
    },
    {
        loginName: 'frederik',
        loginPassword: 'fred1101',
    },
];

const defaultState = {
    todos: defaultAllTodos,
    filter: 'pending',
    filteredTodos: [],
    users: defaultUsers,
    authenticated: false,
    authenticatedUser: undefined,
    locationPermission: false,
    currentLocation: undefined,
    workPlace: {latitude: 55.62799595, longitude: 12.38850787, title: 'Cap Gemini', description: 'Cap Gemini Sogeti Denmark A/S Delta park'},
    styles: styles,
};

function getFilteredTodos(allTodos, filter, user) {
    if(user === undefined){
        return [];
    }else{
        return allTodos.filter(todo => todo.state === filter && todo.user === user);
    }
}

function todos(state = defaultState, action) {
    switch (action.type) {
        case 'ADD_TODO':
            const allTodos = state.todos.concat([{
                task: action.task,
                isImportant: action.isImportant,
                state: 'pending',
                user: state.authenticatedUser.loginName,
            }]);

            return Object.assign({}, state, {
                todos: allTodos,
                filteredTodos: getFilteredTodos(allTodos, state.filter, state.authenticatedUser.loginName),
            });

        case 'DONE_TODO':
            const doneTodo = Object.assign({}, action.todo, {
                state: 'done',
            });

            const allTodosContainingDone = state.todos.map((todo) => {
                return todo === action.todo ? doneTodo : todo;
            });

            return Object.assign({}, state, {
                todos: allTodosContainingDone,
                filteredTodos: getFilteredTodos(allTodosContainingDone, state.filter, state.authenticatedUser.loginName),
            });
        case 'NOT_DONE_TODO':
            const notDoneTodo = Object.assign({}, action.todo, {
                state: 'pending',
            });

            const allTodosContainingNotDone = state.todos.map((todo) => {
                return todo === action.todo ? notDoneTodo : todo;
            });

            return Object.assign({}, state, {
                todos: allTodosContainingNotDone,
                filteredTodos: getFilteredTodos(allTodosContainingNotDone, state.filter, state.authenticatedUser.loginName),
            });
        case 'TOGGLE_STATE':
            const filter = state.filter === 'pending' ? 'done' : 'pending';
            console.log('toggling state');
            return Object.assign({}, state, {
                filter,
                filteredTodos: getFilteredTodos(state.todos, filter, state.authenticatedUser.loginName),
            });
        case 'TOGGLE_IS_IMPORTANT':
            const isImportantTodo = Object.assign({}, action.todo, {
                isImportant: action.todo.isImportant !== true,
            });

            const allTodosIsImportant = state.todos.map((todo) => {
                return todo === action.todo ? isImportantTodo : todo;
            });

            console.log('isImportant in store: ', isImportantTodo.isImportant);

            return Object.assign({}, state, {
                todos: allTodosIsImportant,
                filteredTodos: getFilteredTodos(allTodosIsImportant, state.filter, state.authenticatedUser.loginName),
            });
        case 'AUTHENTICATE':
            const authenticatedUser = state.users.find(x => x.loginName === action.loginName && x.loginPassword === action.loginPassword);
            return Object.assign({}, state, {
                filteredTodos: getFilteredTodos(state.todos, state.filter, authenticatedUser.loginName),
                authenticated: authenticatedUser !== undefined,
                authenticatedUser: authenticatedUser,
            });
        case 'CHANGE_PASSWORD':
            const newPasswordForUser = Object.assign({}, state.authenticatedUser, {
                loginPassword: action.loginPassword,
            });
            console.log('newPasswordForUser ', newPasswordForUser);
            const newPasswordForUsers = state.users.map((user) => {
                return user === state.authenticatedUser ? newPasswordForUser : user;
            });
            console.log('newPasswordForUsers ', newPasswordForUsers);
            return Object.assign({}, state, {
                users: newPasswordForUsers,
                authenticatedUser: newPasswordForUser,
            });
        case 'ADD_USER':
            const allUsers = state.users.concat([{
                loginName: action.newUser,
                loginPassword: action.newPassword,
            }]);
            return Object.assign({}, state, {
                users: allUsers,
            });
        case 'LOGOUT':
            return Object.assign({}, state, {
                authenticated: false,
                authenticatedUser: undefined,
            });
        case 'SET_LOCATION_PERMISSION':
            console.log('store SET_LOCATION_PERMISSION: ', action.locationPermission);
            return Object.assign({}, state, {
                locationPermission: action.locationPermission,
            });
        case 'SET_LOCATION':
            console.log('store SET_LOCATION: lat: ', action.currentLocation.latitude, ', lon: ', action.currentLocation.longitude);
            return Object.assign({}, state, {
                currentLocation: action.currentLocation,
            });
        default:
            return state;
    }
}


export default createStore(todos);
