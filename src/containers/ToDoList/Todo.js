import React, {useState} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import './ToDoList.css';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSquare} from '@fortawesome/free-solid-svg-icons';

const Todo = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [todo, setTodo] = useState(props.todo);
    
    const inputTodoChangedHandler = (event) => {
        let newtodo = todo;
        newtodo = event.target.value;
        setTodo(newtodo);
    };

    const openEditModal = () => {
        setEditMode(true);
    }
    const saveEditedTodo = () => {
        // todoData["id"] = props.id;
        if (todo !== '') {
            props.onEditTodo(todo, props.id).promise.then(response => {
                props.onFetchTodos();
                props.onFetchCompletedTodos();
            });
            setEditMode(false);
        };
    };

    let body = (
        <div className="Todo" key={props.id}>
            <FontAwesomeIcon icon={faSquare} color="#213657" onClick={() => props.markTodoCompleted(props.todo, props.id)}/>
            <p className="TodoP" onClick={openEditModal}
                key={props.id} 
                id={props.id} 
                todo={props.todo}>{props.todo}</p>
        </div>
    );

    let edit = (
        <div>
            <div style={{display: "flex"}}>
                <FontAwesomeIcon icon={faSquare} color="#213657"/>
                <input type="text" className="editTodoInput" defaultValue={todo} onChange={inputTodoChangedHandler}/>
            </div>
            <p className="save" onClick={saveEditedTodo}>Save</p>
        </div>
    )

    return(
        <div>
            { editMode ? edit : body}
        </div>
    );
};
const mapStateToProps = state => {
    return {
        todos: state.todos.todoList,
        completed: state.todos.completedList
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchTodos: () => dispatch(actions.fetchTodos()),
        onFetchCompletedTodos: () => dispatch(actions.fetchCompletedTodos()),
        onEditTodo: (todo, id) => dispatch(actions.editTodo(todo, id))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Todo);