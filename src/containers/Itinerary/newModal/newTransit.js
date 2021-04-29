import React from 'react';

const newTransit = (props) => {
    return (
        <div className={props.class}>

            <div className="itinerarymodaltop">
                <h2 className="itinerarymodalheader">New Transit</h2>
                <b onClick={props.putDown} className="itinerarymodalexit">X</b>
            </div>
            

            <input className="itineraryinput" type="text" placeholder="From"/>
            <input className="itineraryinput" type="text" placeholder="To"/>
            <input className="itineraryinput" type="date" placeholder="Date"/>
            <input className="itineraryinput" type="text" placeholder="Time"/>
            <input className="itineraryinput" type="text" placeholder="Method (Flight, train, etc)"/>

            <h3  onClick={props.save} className="itinerarysave">SAVE</h3>

        </div>
    );
};

export default newTransit;