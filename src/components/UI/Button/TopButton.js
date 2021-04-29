import React from 'react';
import './TopButton.css';

const TopButton = (props) => {
    return(
        <button 
            onClick={props.clicked}
            className = "TopButton"
            // className={[classes.Button, classes[props.btnType]].join(' ')}
            disabled={props.disabled}
        >{props.children}</button>
    );
};

export default TopButton;