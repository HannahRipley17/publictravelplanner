import * as actionTypes from '../actions/actionTypes.js';

const initialState = {
    flights: [
        // {"label":"SGU - SAT", "cost": 250},
        // {"label":"SAT - SGU", "cost": 250}
    ],
    hotels: [
        // {"label":"San Antonio Airbnb", "cost": 300},
    ],
    food: [
        // {"label":"Breakfast", "cost": 4},
        // {"label":"Lunch", "cost": 6},
        // {"label":"Dinner", "cost": 10},
        // {"label":"Dessert", "cost": 50}
    ],
    ptrans: [
        // {"label":"Uber from airport", "cost": 25},
        // {"label":"Bus pass", "cost": 20},
    ],
    tickets: [
        // {"label":"Alamo", "cost": 5},
    ],
    misc: [
        // {"label":"Keychain", "cost": 4},
    ]
}

const sortCategory = (category) => {
    switch (category) {
        case "Flights":
            return "flights";
        case "Hotels":
            return "hotels";

        case "Food":
            return "food";

        case "Public Trans.":
            return "ptrans";

        case "Tickets":
            return "tickets";

        case "Misc.":
            return "misc";
        default:
            return false;
    }
};

const fetchSpents = (state, action) => {
    let category = sortCategory(action.category);
   
    switch (action.category) {
        case "Flights":
            return {
                ...state,
                flights: action.spents
            };
        case "Hotels":
            return {
                ...state,
                hotels: action.spents
            };

        case "Food":
            return {
                ...state,
                food: action.spents
            };

        case "Public Trans.":
            return {
                ...state,
                ptrans: action.spents
            };

        case "Tickets":
            return {
                ...state,
                tickets: action.spents
            };

        case "Misc.":
            return {
                ...state,
                misc: action.spents
            };
        default:
            return {...state};
    }
};

const addSpent = (state, action) => {
    const newSpent = {};
    newSpent["label"] = action.label;
    newSpent["cost"] = action.cost;
    switch (action.category) {
        case "Flights":
            return {
                ...state,
                flights: state.flights.concat(newSpent)
            };
        case "Hotels":
            return {
                ...state,
                hotels: state.hotels.concat(newSpent)
            };

        case "Food":
            return {
                ...state,
                food: state.food.concat(newSpent)
            };

        case "Public Trans.":
            return {
                ...state,
                ptrans: state.ptrans.concat(newSpent)
            };

        case "Tickets":
            return {
                ...state,
                tickets: state.tickets.concat(newSpent)
            };

        case "Misc.":
            return {
                ...state,
                misc: state.misc.concat(newSpent)
            };
        default:
            return {...state};
    }
    
};

const editSpent = (state, action) => {
    // const newSpentData = action.newSpentData;
    // switch (action.category) {
    //     case "Flights":
    //         return {
    //             ...state,
    //             flights: newSpentData
    //         };
    //     case "Hotels":
    //         return {
    //             ...state,
    //             hotels: newSpentData
    //         };

    //     case "Food":
    //         return {
    //             ...state,
    //             food: newSpentData
    //         };

    //     case "Public Trans.":
    //         return {
    //             ...state,
    //             ptrans: newSpentData
    //         };

    //     case "Tickets":
    //         return {
    //             ...state,
    //             tickets: newSpentData
    //         };

    //     case "Misc.":
    //         return {
    //             ...state,
    //             misc: newSpentData
    //         };
    //     default:
            return {...state};
    // }
};

const deleteSpent = (state, action) => {
    // const id = action.id;
    // switch (action.category) {
    //     case "Flights":
    //         let newSpentFlightsData=[...state.flights];
    //         newSpentFlightsData.splice(id, 1);
    //         return {
    //             ...state,
    //             flights: newSpentFlightsData
    //         };
    //     case "Hotels":
    //         let newSpentHotelsData=[...state.hotels];
    //         newSpentHotelsData.splice(id, 1);
    //         return {
    //             ...state,
    //             hotels: newSpentHotelsData
    //         };

    //     case "Food":
    //         let newSpentFoodData=[...state.food];
    //         newSpentFoodData.splice(id, 1);
    //         return {
    //             ...state,
    //             food: newSpentFoodData
    //         };

    //     case "Public Trans.":
    //         let newSpentPtransData=[...state.ptrans];
    //         newSpentPtransData.splice(id, 1);
    //         return {
    //             ...state,
    //             ptrans: newSpentPtransData
    //         };

    //     case "Tickets":
    //         let newSpentTicketsData=[...state.tickets];
    //         newSpentTicketsData.splice(id, 1);
    //         return {
    //             ...state,
    //             tickets: newSpentTicketsData
    //         };

    //     case "Misc.":
    //         let newSpentMiscData=[...state.misc];
    //         newSpentMiscData.splice(id, 1);
    //         return {
    //             ...state,
    //             misc: newSpentMiscData
    //         };
    //     default:
            return {...state};
    // };
};

const budgeterReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SPENTS:
            return fetchSpents(state, action);
        case actionTypes.ADD_NEW_SPENT:
            return addSpent(state, action);
        case actionTypes.EDIT_SPENT:
            return editSpent(state, action);
        case actionTypes.DELETE_SPENT:
            return deleteSpent(state, action);
        default:
            return state;
    }
};

export default budgeterReducer;