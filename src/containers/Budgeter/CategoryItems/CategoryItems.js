import React from 'react';
import { connect } from 'react-redux';


const CategoryItems = (props) => {
    let categoryItemsList = [];
    if (props.categoryLabel === "Flights") {
        categoryItemsList = [...props.flights];
    } else if (props.categoryLabel === "Hotels") {
        categoryItemsList = [...props.hotels];
    } else if (props.categoryLabel === "Food") {
        categoryItemsList = [...props.food];
    } else if (props.categoryLabel === "Public Trans.") {
        categoryItemsList = [...props.ptrans];
    } else if (props.categoryLabel === "Tickets") {
        categoryItemsList = [...props.tickets];
    } else if (props.categoryLabel === "Misc.") {
        categoryItemsList = [...props.misc];
    }

    const mapItems = (item, id) => {
        return <p className="CategoryItemsP" key={id}><span>{item.label}</span> <span>${item.cost}</span></p>
        // don't forget to add a key once the id is working
    };


    let spentList = (
        <div>
            {categoryItemsList.map((item, id) =>
                mapItems(item, id)
            )}
        </div>
    );

    return (
        <div>
            {spentList}
        </div>
    );
};


const mapStateToProps = state => {
    return {
        flights: state.budgeter.flights,
        hotels: state.budgeter.hotels,
        food: state.budgeter.food,
        ptrans: state.budgeter.ptrans,
        tickets: state.budgeter.tickets,
        misc: state.budgeter.misc,
    }
};

export default connect(mapStateToProps)(CategoryItems);