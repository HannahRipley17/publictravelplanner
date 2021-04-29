import React from 'react';
import './AddButton.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';

const AddButton = (props) => {
    return(
    <p onClick={props.clicked} className="AddButton"><FontAwesomeIcon icon={faPlus} color="#213657"/>&nbsp; &nbsp;{props.label}</p>
    );
};

export default AddButton;