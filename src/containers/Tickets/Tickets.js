import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import FlightTicket from './Ticket/FlightTicket';
import TrainTicket from './Ticket/TrainTicket';
import BusTicket from './Ticket/BusTicket';

import AddButton from '../../components/UI/AddButton/AddButton';
import NewTicketModal from './newModals/newTicketModal';



// TODO

// fix dates??? - it's adding one every time I save *facepalm

const Tickets = (props) => {

    const [newModalOpen, setNewModalOpen] = useState(false);


    useEffect(() => {
        props.onFetchTickets();
    }, []);

    const openNewTicketModal = () => {
        setNewModalOpen(true)
    };
    const closeNewTicketModal = () => {
        setNewModalOpen(false)
    };

    
    const mapTickets = (ticket, index) => {
        if(ticket.type === "flight") {
            return <FlightTicket 
                key={ticket.id}
                id={ticket.id}
                airline={ticket.airline}
                confNum={ticket.confNum}
                departAirport={ticket.departAirport}
                arrivalAirport={ticket.arrivalAirport}
                departCity={ticket.departCity}
                arrivalCity={ticket.arrivalCity}
                departTime={ticket.departTime}
                arrivalTime={ticket.arrivalTime}
                departTerminal={ticket.departTerminal}
                arrivalTerminal={ticket.arrivalTerminal}
                departDate={ticket.departDate}
                arrivalDate={ticket.arrivalDate}
                confNum={ticket.confNum}
                flightNum={ticket.flightNum}
                gate={ticket.departGate}
                seat={ticket.departSeat}
            />
        } else if(ticket.type === "train") {
            return <TrainTicket 
                key={ticket.id}
                id={ticket.id}
                trainCompany={ticket.trainCompany}
                departCity={ticket.departCity}
                arrivalCity={ticket.arrivalCity}
                departStation={ticket.departStation}
                arrivalStation={ticket.arrivalStation}
                departTime={ticket.departTime}
                arrivalTime={ticket.arrivalTime}
                departDate={ticket.departDate}
                arrivalDate={ticket.arrivalDate}
                confNum={ticket.confNum}
                trainNum={ticket.trainNum}
                departPlatform={ticket.departPlatform}
                departSeat={ticket.departSeat}
            />
        } else if(ticket.type === "bus") {
            return <BusTicket 
                key={ticket.id}
                id={ticket.id}
                busCompany={ticket.busCompany}
                departCity={ticket.departCity}
                arrivalCity={ticket.arrivalCity}
                departStation={ticket.departStation}
                arrivalStation={ticket.arrivalStation}
                departTime={ticket.departTime}
                arrivalTime={ticket.arrivalTime}
                departDate={ticket.departDate}
                arrivalDate={ticket.arrivalDate}
                confNum={ticket.confNum}
                busNum={ticket.busNum}
                platform={ticket.platform}
                seat={ticket.seat}
            />
        } 
        
    };

    let ticketsList = (
        <div>
            {props.tickets.map((ticket, index) => 
                mapTickets(ticket, index)
            )}
        </div>     
    );


    return (
        <div>
            <h3 className="topheaders">Tickets</h3>
            <AddButton label="New Ticket" clicked={openNewTicketModal}/>
            <div style={{paddingTop: "15px"}}>
                {ticketsList}
            </div>

            {newModalOpen ? <NewTicketModal 
                closeModal={closeNewTicketModal}
            /> : null }

            
        </div>
    );
};


const mapStateToProps = state => {
    return {
        tickets: state.tickets.tickets
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchTickets: () => dispatch(actions.fetchTickets()),
        // onAddTicket: (title, ticket) => dispatch(actions.addNewTicket(title, ticket)),
        // onEditTicket: (ticketData) => dispatch(actions.editTicket(ticketData)),
        // onDeleteTicket: (id) => dispatch(actions.deleteTicket(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);