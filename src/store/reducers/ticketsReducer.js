import * as actionTypes from '../actions/actionTypes.js';

const initialState = {
    tickets: [],
};

const fetchTickets = (state, action) => {
    let newTickets = [...action.tickets];
    console.log(newTickets);
    return {
        ...state,
        tickets: newTickets,
    };
};

const addTicket = (state, action) => {
    const newTicket = {
        ...action.newTicket
    };
    return {
        ...state,
        tickets: state.tickets.concat(newTicket)
    }
};


const deleteTicket = (state, action) => {
    let newtickets = state.tickets;
    newtickets.splice(action.id, 1);
    return {
        ...state,
        tickets: newtickets
    }
};


const ticketsReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TICKETS_SUCCESS:
            return fetchTickets(state, action);
        case actionTypes.ADD_NEW_TICKET:
            return addTicket(state, action);
        case actionTypes.EDIT_TICKET:
            return {...state};
        default:
            return state;
    }
};

export default ticketsReducer;