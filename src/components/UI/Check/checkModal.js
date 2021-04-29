import React from 'react';
import "./checkModal.css";

const CheckModal = (props) => {

    return(
        <div className="CheckModal">
            <h3>Are you sure you want to delete?</h3>
            <p>This action cannot be undone</p>
            <p style={{color: "#234871", cursor: "pointer"}} onClick={props.cancel}>Cancel</p>
            <p onClick={props.delete} className="delete">Delete</p>
        </div>

    );
    
};
export default CheckModal;