import React from 'react';
import { connect } from 'react-redux';


const CityThings = (props) => {

    const mapEvents = (thing, id) => {
        return <p key={id} className="ThingToDo">{thing.title} - ${thing.cost}</p>
    };

    const cities = [...props.cities];
    let thingsList = [];
    let thisCity = null;
    for (const cityIndex in cities) {
        if (cities[cityIndex].id === props.id) {
            thisCity = cities[cityIndex];
            let id = props.id
            thingsList = (
                <div>
                    {thisCity.thingstodo.map((thing, id) =>
                        mapEvents(thing, id)
                    )}
                </div>
            )
        }
    };

    return (
        <div>
            {thingsList}
        </div>
    );
};


const mapStateToProps = state => {
    return {
        cities: state.itinerary.cities
    }
};

export default connect(mapStateToProps)(CityThings);