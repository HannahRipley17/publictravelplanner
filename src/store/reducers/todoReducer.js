import * as actionTypes from '../actions/actionTypes.js';

const initialState = {
    todoList: [],
    completedList: []
};

const fetchTodos = (state, action) => {
    let newTodos = [...action.todos];
    return {
        ...state,
        todoList: newTodos,
    };
};

const fetchCompletedTodos = (state, action) => {
    let newCompletedTodos = [...action.completedTodos];
    return {
        ...state,
        completedList: newCompletedTodos,
    };
};


const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TODOS_SUCCESS:
            return fetchTodos(state, action);
        case actionTypes.FETCH_COMPLETED_TODOS_SUCCESS:
            return fetchCompletedTodos(state, action);
        case actionTypes.ADD_NEW_TODO:
            return {...state};
        case actionTypes.EDIT_TODO:
            return {...state};
        case actionTypes.DELETE_TODO:
            return {...state};
        case actionTypes.MARK_TODO_COMPLETED:
            return {...state}
        case actionTypes.MARK_TODO_NOT_COMPLETED:
            return {...state}
        default:
            return state;
    }
};

export default todoReducer;