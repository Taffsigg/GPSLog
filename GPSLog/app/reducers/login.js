
const defaultState = {
    filteredTodos: [],
    authenticated: false,
    authenticatedUser: undefined,
};

function getFilteredTodos(allTodos, filter, user) {
    if(user === undefined){
        return [];
    }else{
        return allTodos.filter(todo => todo.state === filter && todo.user === user);
    }
}

export default function login(state = defaultState, action = {}) {
    switch (action.type) {
        case 'AUTHENTICATE':
            const authenticatedUser = state.users.find(x => x.loginName === action.loginName && x.loginPassword === action.loginPassword);
            return Object.assign({}, state, {
                filteredTodos: getFilteredTodos(state.todos, state.filter, authenticatedUser.loginName),
                authenticated: authenticatedUser !== undefined,
                authenticatedUser: authenticatedUser,
            });
        default:
            return state;
    }
};