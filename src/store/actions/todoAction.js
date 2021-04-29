import * as actionTypes from './actionTypes';
import axios from 'axios';


export const fetchTodosSuccess = (fetchedTodos) => {
    return {
        type: actionTypes.FETCH_TODOS_SUCCESS,
        todos: fetchedTodos,
        id: fetchedTodos.id
    }
};

export const fetchTodos = () => {
    return dispatch => {
        axios.get('https://publictravelplanner-default-rtdb.firebaseio.com//todos.json').then(res => {
                const fetchedTodos = [];
                for (let key in res.data) {
                    fetchedTodos.push({
                        todo: res.data[key],
                        id: key
                    });
                }
                dispatch(fetchTodosSuccess(fetchedTodos));
            })
        }
};


export const fetchCompletedTodosSuccess = (fetchedCompletedTodos) => {
    return {
        type: actionTypes.FETCH_COMPLETED_TODOS_SUCCESS,
        completedTodos: fetchedCompletedTodos,
        id: fetchedCompletedTodos.id
    }
};

export const fetchCompletedTodos = () => {
    return dispatch => {
        axios.get('https://publictravelplanner-default-rtdb.firebaseio.com//completedTodos.json').then(res => {
                const fetchedCompletedTodos = [];
                for (let key in res.data) {
                    fetchedCompletedTodos.push({
                        todo: res.data[key],
                        id: key
                    });
                }
                dispatch(fetchCompletedTodosSuccess(fetchedCompletedTodos));
            })
        }
};

export const addNewTodo = (todoData) => { // id
    let promise = fetch('https://publictravelplanner-default-rtdb.firebaseio.com/todos.json', {
        method: 'POST',
        body: JSON.stringify(todoData),
        headers: { 'Content-Type': 'application/json' }
    })
 
    return {
        type: actionTypes.ADD_NEW_TODO,
        newTodo: todoData,
        promise: promise
    };
};

export const editTodo = (todo, id) => {
    let promise = fetch(`https://publictravelplanner-default-rtdb.firebaseio.com/todos/${id}.json`, {
        method: 'PUT',
        body: JSON.stringify(todo),
        headers: { 'Content-Type': 'application/json' }
    })
    return {
        type: actionTypes.EDIT_TODO,
        promise: promise
    };
};

export const deleteAllTodos = () => {
    let promise = fetch(`https://publictravelplanner-default-rtdb.firebaseio.com/completedTodos.json?`, {
        method: 'DELETE',
        //body: JSON.stringify(transitData),
        headers: { 'Content-Type': 'application/json' }
    })
    return {
        type: actionTypes.DELETE_ALL_TODOS,
        promise: promise
    };
};

export const deleteTodo = (id) => {
    let promise = fetch(`https://publictravelplanner-default-rtdb.firebaseio.com/todos/${id}.json?`, {
        method: 'DELETE',
        //body: JSON.stringify(transitData),
        headers: { 'Content-Type': 'application/json' }
    })
    return {
        type: actionTypes.DELETE_TODO,
        id: id,
        promise: promise
    };
};

export const deleteCompletedTodo = (id) => {
    let promise = fetch(`https://publictravelplanner-default-rtdb.firebaseio.com/completedTodos/${id}.json?`, {
        method: 'DELETE',
        //body: JSON.stringify(transitData),
        headers: { 'Content-Type': 'application/json' }
    })
    return {
        type: actionTypes.DELETE_COMPLETED_TODO,
        id: id,
        promise: promise
    };
};


export const markTodoCompleted = (todo, id) => {
    deleteTodo(id);
    // epiphany moment - all these things have to return something. either return a call to the reducer or the dispatch. if you just do a console.log, it'll say something about being a plain object
    let promise = fetch('https://publictravelplanner-default-rtdb.firebaseio.com/completedTodos.json', {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: { 'Content-Type': 'application/json' }
    })

    return {
        type: actionTypes.MARK_TODO_COMPLETED,
        promise: promise
    };
    
};

export const addTodoBackToTodoList = (todo) => {
    let promise = fetch('https://publictravelplanner-default-rtdb.firebaseio.com/todos.json', {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: { 'Content-Type': 'application/json' }
    })

    return {
        type: actionTypes.MARK_TODO_NOT_COMPLETED,
        promise: promise
    };
};

export const markTodoNotCompleted = (todo, id) => {
    deleteCompletedTodo(id);
    // epiphany moment - all these things have to return something. either return a call to the reducer or the dispatch. if you just do a console.log, it'll say something about being a plain object
    let promise = fetch('https://publictravelplanner-default-rtdb.firebaseio.com/todos.json', {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: { 'Content-Type': 'application/json' }
    })

    return {
        type: actionTypes.MARK_TODO_NOT_COMPLETED,
        promise: promise
    };
    
};
