import React from 'react';
import '../Itinerary.css';

const CityNote = (props) => {
    
    return(
        <div className={props.className}>
            <p>{props.note}</p>
        </div>
    );
};
export default CityNote;