import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import './ToDoList.css';

import Todo from './Todo';

import AddButton from '../../components/UI/AddButton/AddButton';
import CheckModal from '../../components/UI/Check/checkModal';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSquare} from '@fortawesome/free-solid-svg-icons';
import {faCheckSquare} from '@fortawesome/free-solid-svg-icons';


// TODO

// edit not completed ones
// cancel add new todo?

const ToDoList = (props) => {

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [todo, setTodo] = useState('');
    const [checkModal, setCheckModal] = useState(false);
    
    

    useEffect(() => {
        props.onFetchTodos();
        props.onFetchCompletedTodos();
    }, []);

    const inputTodoChangedHandler = (event) => {
        let newtodo = todo;
        newtodo = event.target.value;
        setTodo(newtodo);
    };


    const saveNewTodo = () => {
        let todoData = todo;
        if (todoData !== '') {
            props.onAddTodo(todoData).promise.then(response => {
                props.onFetchTodos();
                setAddModalOpen(false);
                setTodo('');
            });
        }

    };

    const clearCompletedTodos = () => {
        props.onDeleteAllTodos().promise.then(response => {
            props.onFetchTodos();
            props.onFetchCompletedTodos();
            setCheckModal(false);
        });
    };

    const markTodoCompleted = (todo, id) => {
        props.onMarkTodoCompleted(todo, id).promise.then(response => {
            props.onFetchTodos();
            props.onFetchCompletedTodos();
        });
    };
    const markTodoNotCompleted = (todo, id) => {
        props.onMarkTodoNotCompleted(todo, id)
        .promise.then(response => {
            props.onFetchTodos();
            props.onFetchCompletedTodos();
        });
    };



    const openAddModal = () => {
        setAddModalOpen(true);
    };
    const closeAddModal = () => {
        setAddModalOpen(false);
    };

    const openCheckModal = () => {
        setCheckModal(true);
    };
    const closeCheckModal = () => {
        setCheckModal(false);
    };


    const mapTodos = (item, id) => {
        return <Todo 
            key={item.id}
            id={item.id}
            todo={item.todo}
            markTodoCompleted={markTodoCompleted}
        />
    };
        
    let todosList = (
        <div>
            {props.todos.map((item, id) =>
                mapTodos(item, id)
            )}
        </div>
    );

    const mapCompleted = (item, id) => {
        return ( 
            <div key={item.id} className="Todo">
                <FontAwesomeIcon icon={faCheckSquare} color="#213657" onClick={() => markTodoNotCompleted(item.todo, item.id)} />
                <p className="completedTodoP"
                    id={item.id} 
                    todo={item.todo}>{item.todo}</p>
            </div>
        )
    };
        
    let completedList = (
        <div>
            {props.completed.map((item, id) =>
                mapCompleted(item, id)
            )}
        </div>
    );

    return (
        <div>
            <h3 className="topheaders">To-Do List</h3>
            {todosList}
            {addModalOpen ? <input type="text" className="NewTodoInput" placeholder="New Todo" onChange={inputTodoChangedHandler}/> : null}
            {addModalOpen ? <p className="save" onClick={saveNewTodo}>Save</p> : <AddButton label="New Todo" clicked={openAddModal}/>}
            
            <div className="CompletedTodosDivider">
                <hr className=""></hr>
                <p>Completed</p>
                <hr></hr>
            </div>
            {completedList}
            <p className="delete" onClick={openCheckModal}>Clear Completed Todos</p>

            {checkModal ? 
                <CheckModal 
                    cancel={closeCheckModal}
                    delete={clearCompletedTodos}
                />
                : null }
        </div>
    );
}

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
        onAddTodo: (todo) => dispatch(actions.addNewTodo(todo)),
        onMarkTodoCompleted: (todo, id) => dispatch(actions.markTodoCompleted(todo, id)),
        onMarkTodoNotCompleted: (todo, id) => dispatch(actions.markTodoNotCompleted(todo, id)),
        onDeleteAllTodos: () => dispatch(actions.deleteAllTodos())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ToDoList);