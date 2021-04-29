import React, {useState} from 'react';
import '../Notes.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';

const Note = (props) => {

    const setEditEventInfo = () => {
        props.openEditModal(props.item);
    };
    
    return(
        <div className={props.className}>
            <h3>{props.item.title}</h3>
            <p>{props.item.note}</p>
            {props.homepage ? null : <FontAwesomeIcon icon={faEdit} color="#213657" onClick={setEditEventInfo}/> }

        </div>
    );
};
export default Note;