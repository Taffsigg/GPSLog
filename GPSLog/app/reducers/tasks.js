const task = (state, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return {
                id: action.id,
                title: action.title,
                createdAt: new Date(),
                completedAt: null,
                completed: false
            };
        case 'TOGGLE_TASK':
            if (state.id !== action.id) {
                return state;
            }

            return Object.assign({}, state, {
                completed: !state.completed,
                completedAt: !state.completed ? new Date() : null
            });
        default:
            return state;
    }
};

const defaultTasks = [
    {id: 1, title: 'Clean up garage' , createdAt: new Date(), completed: false},
    {id: 2, title: 'Install BBQ'     , createdAt: new Date(), completed: false},
    {id: 3, title: 'Watch NBA final' , createdAt: new Date(), completed: false},
    {id: 4, title: 'Buy supprise egg', createdAt: new Date(), completed: false},
    {id: 5, title: 'Watch Iron Man 3', createdAt: new Date(), completed: false},
];

const tasks = (state = defaultTasks, action) => {
    switch (action.type) {
        case 'ADD_TASK':
            return [
                ...state,
                task(undefined, action)
            ];
        case 'TOGGLE_TASK':
            return state.map(t =>
                task(t, action)
            );
        default:
            return state;
    }
};

export default tasks;