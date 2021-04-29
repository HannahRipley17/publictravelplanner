import * as actionTypes from './actionTypes';
import axios from 'axios';


const sortCategory = (category) => {
    switch (category) {
        case "Flights":
            return "bFlights";
        case "Hotels":
            return "bHotels";

        case "Food":
            return "bFood";

        case "Public Trans.":
            return "bPtrans";

        case "Tickets":
            return "bTickets";

        case "Misc.":
            return "bMisc";
        default:
            return "bFails";
    }
};


export const fetchSpents = (category) => {
    //console.log("called fetchSpents in actions,", category);
    let sortedcategory = sortCategory(category);
    return dispatch => {
        axios.get(`https://publictravelplanner-default-rtdb.firebaseio.com/${sortedcategory}.json`)
            .then(res => {
                const fetchedSpents = [];
                for (let key in res.data) {
                    fetchedSpents.push({
                        ...res.data[key],
                        id: key
                    });
                };
                dispatch(fetchSpentsSuccess(fetchedSpents, category));
            })
            // .catch(err => {
            //     console.log(err);
            // });
    }
};
export const fetchSpentsSuccess = (fetchedSpents, category) => {
    return {
        type: actionTypes.FETCH_SPENTS,
        spents: fetchedSpents,
        category: category
    }
};
 
export const addNewSpent = (spentData) => {
    console.log(spentData);
    let id = "";
    let category = sortCategory(spentData.category);
    let promise = fetch(`https://publictravelplanner-default-rtdb.firebaseio.com/${category}.json`, {
        method: 'POST',
        body: JSON.stringify(spentData),
        headers: { 'Content-Type': 'application/json' }
    })
        // .then(response => {
        //     return response.json();
        // })
        // .then(responseData => {
        //     // console.log(responseData.name);
        //     id = responseData.name;
        //     console.log(id);
        // });
    return {
        type: actionTypes.ADD_NEW_SPENT,
        label: spentData.label,
        cost: parseInt(spentData.cost),
        category: spentData.category,
        promise: promise
    };
};



export const editSpent = (spentData, category) => {
    console.log(spentData);
    let sortedcategory = sortCategory(category);
    let promise = fetch(`https://publictravelplanner-default-rtdb.firebaseio.com/${sortedcategory}/${spentData.id}.json`, {
        method: 'PUT',
        body: JSON.stringify(spentData),
        headers: { 'Content-Type': 'application/json' }
    });
    return {
        type: actionTypes.EDIT_SPENT,
        newSpentData: spentData,
        category: category,
        promise: promise
    };
};

export const deleteSpent = (id, category) => {
    let sortedcategory = sortCategory(category);
    let promise = fetch(`https://publictravelplanner-default-rtdb.firebaseio.com/${sortedcategory}/${id}.json`, {
        method: 'DELETE',
        //body: JSON.stringify(spentData),
        headers: { 'Content-Type': 'application/json' }
    })
    return {
        type: actionTypes.DELETE_SPENT,
        id: id,
        category: category,
        promise: promise
    };
};