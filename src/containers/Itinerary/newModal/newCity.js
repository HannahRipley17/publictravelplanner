import React from 'react';
import classes from './newModal.css';

const NewCity = (props) => {
    return (
        <div className={props.class}>

            <div className="itinerarymodaltop">
                <h2 className="itinerarymodalheader">New City</h2>
                <b onClick={props.putDown} className="itinerarymodalexit">X</b>
            </div>

            <input className="itineraryinput" type="text" placeholder="City"/>
            <input className="itineraryinput" type="text" placeholder="Dates"/>

            <h3 onClick={props.save} className="itinerarysave">SAVE</h3>
        </div>
    );
};

export default NewCity;