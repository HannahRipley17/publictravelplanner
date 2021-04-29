import * as actionTypes from './actionTypes';
import axios from 'axios';


export const fetchTicketsSuccess = (fetchedTickets) => {
    return {
        type: actionTypes.FETCH_TICKETS_SUCCESS,
        tickets: fetchedTickets
    }
};

export const fetchTickets = () => {
    return dispatch => {
        axios.get('https://publictravelplanner-default-rtdb.firebaseio.com/tickets.json')
            .then(res => {
                const fetchedTickets = [];
                for (let key in res.data) {
                    fetchedTickets.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchTicketsSuccess(fetchedTickets));
            })
        }
}

export const saveNewTicket = (ticketData) => { // id
    console.log("called saveNewTicket");
    let promise = fetch(`https://publictravelplanner-default-rtdb.firebaseio.com/tickets.json`, {
        method: 'POST',
        body: JSON.stringify(ticketData),
        headers: { 'Content-Type': 'application/json' }
    });
 
    return {
        type: actionTypes.ADD_NEW_TICKET,
        newTicket: ticketData,
        promise: promise
    };
};

export const editTicket = (ticketData) => {
    console.log("called editTicket", ticketData);
    let promise = fetch(`https://publictravelplanner-default-rtdb.firebaseio.com/tickets/${ticketData.id}.json?`, {
        method: 'PUT',
        body: JSON.stringify(ticketData),
        headers: { 'Content-Type': 'application/json' }
    })
    return {
        type: actionTypes.EDIT_TICKET,
        id: ticketData.id,
        newTicketData: ticketData,
        promise: promise
    };
};

export const deleteTicket = (id) => {
    console.log("called deleteTicket", id);
    let promise = fetch(`https://publictravelplanner-default-rtdb.firebaseio.com/tickets/${id}.json?`, {
        method: 'DELETE',
        //body: JSON.stringify(transitData),
        headers: { 'Content-Type': 'application/json' }
    })
    return {
        type: actionTypes.DELETE_TICKET,
        id: id,
        promise: promise
    };
};