import React, {useState, useEffect} from 'react';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import moment from 'moment';
import '../newModals/newTicketModals.css';
import CheckModal from '../../../components/UI/Check/checkModal';


const EditFlightModal = (props) => {

    const [inputData, setInputData] = useState({
        id: props.id,
        airline: props.airline,
        confNum: props.confNum,
        departAirport: props.departAirport,
        arrivalAirport: props.arrivalAirport,
        departCity: props.departCity,
        arrivalCity: props.arrivalCity,
        departTime: props.departTime,
        arrivalTime: props.arrivalTime,
        departTerminal: props.departTerminal,
        arrivalTerminal: props.arrivalTerminal,
        departDate: props.departDate,
        arrivalDate: props.arrivalDate,
        confNum: props.confNum,
        flightNum: props.flightNum,
        gate: props.gate,
        seat: props.seat,
    });

    const [checkModal, setCheckModal] = useState(false);
    

    const openCheckModal = () => {
        setCheckModal(true);
    };
    const closeCheckModal = () => {
        setCheckModal(false);
    };

    const inputChangedHandler = (event, inputId) => {
        let updatedInputData = inputData;
        updatedInputData[inputId] = event.target.value;
        setInputData(updatedInputData);
    };

    const saveEditedTicket = function() {
        console.log("called saveEditedTicket", inputData);
        let flightData = {};
        flightData.type="flight";
        flightData.id = inputData.id

        if (inputData.airline === "") {
            flightData.airline = "Untitled"
        } else {
            flightData.airline = inputData.airline;
        }
        flightData.flightNum = inputData.flightNum;
        flightData.confNum = inputData.confNum;

        flightData.departCity = inputData.departCity;
        flightData.departAirport = inputData.departAirport;
        flightData.departDate = formatDate(inputData.departDate);
        flightData.departTime = inputData.departTime;
        flightData.departTerminal = inputData.departTerminal;
        flightData.departGate = inputData.gate;
        flightData.departSeat = inputData.seat;

        flightData.arrivalCity = inputData.arrivalCity;
        flightData.arrivalAirport = inputData.arrivalAirport;
        flightData.arrivalDate = formatDate(inputData.arrivalDate);
        flightData.arrivalTime = inputData.arrivalTime;
        flightData.arrivalTerminal = inputData.arrivalTerminal;
        props.onEditTicket(flightData).promise.then(response => {
            props.onFetchTickets();
            props.closeModal();
        });
        // this.props.putDown();
        // this.resetData();
    };


    const formatDate = (date) => {
        let newDate = null;

        if (date == undefined) {
            newDate = moment().format().toString();
        } else {
            newDate = moment(date).format().toString();
        }
        return newDate;
    };

    const deleteTicket = () => {
        props.onDeleteTicket(props.id).promise.then(response => {
            props.onFetchTickets();
            props.closeModal();
        });
    };

    let editFlightForm = (
        <div className="NewTicketModal">

            <div className="itinerarymodaltop">
                <h2 className="itinerarymodalheader">Edit Ticket</h2>
                <b onClick={props.closeModal} className="itinerarymodalexit">X</b>
            </div>

            <input 
                className="TicketInput" 
                type="text" 
                placeholder="Airline"
                defaultValue={inputData.airline}
                onChange={(event) => inputChangedHandler(event, "airline")}
                />
            <div className="TicketHalfInputs">
                <input 
                    className="TicketHalfInput" 
                    type="text" 
                    placeholder="Flight #" 
                    defaultValue={inputData.flightNum}
                    onChange={(event) => inputChangedHandler(event, "flightNum")}
                    />
                <input 
                    className="TicketHalfInput" 
                    type="text" 
                    placeholder="Confirm. #" 
                    defaultValue={inputData.confNum}
                    onChange={(event) => inputChangedHandler(event, "confNum")}
                    />

            </div>

            <h4 className="TicketModalHeader">Departure</h4>
            <div className="TicketHalfInputs">
                <input 
                    className="TicketHalfInput" 
                    type="text" 
                    placeholder="City" 
                    defaultValue={inputData.departCity}
                    onChange={(event) => inputChangedHandler(event, "departCity")}
                    />
                <input 
                    className="TicketHalfInput" 
                    type="text" 
                    placeholder="Airport Code" 
                    defaultValue={inputData.departAirport}
                    onChange={(event) => inputChangedHandler(event, "departAirport")}
                    />

            </div>
            <div className="TicketHalfInputs">
                 <input 
                    className="TicketHalfInput" 
                    type="date" 
                    placeholder="Date" 
                    defaultValue={inputData.departDate}
                    onChange={(event) => inputChangedHandler(event, "departDate")}
                    />
                <input 
                    className="TicketHalfInput" 
                    type="text" 
                    placeholder="Time" 
                    defaultValue={inputData.departTime}
                    onChange={(event) => inputChangedHandler(event, "departTime")}
                    />
            </div>
           
            <div className="TicketThirdInputs">
                <input 
                    className="TicketThirdInput" 
                    type="text" 
                    placeholder="Terminal" 
                    defaultValue={inputData.departTerminal}
                    onChange={(event) => inputChangedHandler(event, "departTerminal")}
                    />
                <input 
                    className="TicketThirdInput" 
                    type="text" 
                    placeholder="Gate" 
                    defaultValue={inputData.gate}
                    onChange={(event) => inputChangedHandler(event, "gate")}
                    />
                <input 
                    className="TicketThirdInput" 
                    type="text" 
                    placeholder="Seat" 
                    defaultValue={inputData.seat}
                    onChange={(event) => inputChangedHandler(event, "seat")}
                    />
            </div>

            <h4 className="TicketModalHeader">Arrival</h4>
            <div className="TicketHalfInputs">
                <input 
                    className="TicketHalfInput" 
                    type="text" 
                    placeholder="City" 
                    defaultValue={inputData.arrivalCity}
                    onChange={(event) => inputChangedHandler(event, "arrivalCity")}
                    />
                <input 
                    className="TicketHalfInput" 
                    type="text" 
                    placeholder="Airport Code" 
                    defaultValue={inputData.arrivalAirport}
                    onChange={(event) => inputChangedHandler(event, "arrivalAirport")}
                    />

            </div>
            <div className="TicketHalfInputs">
                <input 
                    className="TicketHalfInput" 
                    type="date" 
                    placeholder="Date" 
                    defaultValue={inputData.arrivalDate}
                    onChange={(event) => inputChangedHandler(event, "arrivalDate")}
                    />
                <input 
                    className="TicketHalfInput" 
                    type="text" 
                    placeholder="Time" 
                    defaultValue={inputData.arrivalTime}
                    onChange={(event) => inputChangedHandler(event, "arrivalTime")}
                    />
            </div>
            <input 
                className="TicketInput" 
                type="text" 
                placeholder="Terminal" 
                defaultValue={inputData.arrivalTerminal}
                onChange={(event) => inputChangedHandler(event, "arrivalTerminal")}
                />

            <div style={{display: "flex", justifyContent: "space-between"}}>
                <p onClick={openCheckModal} className="delete">Delete</p>
                <h3 onClick={() => saveEditedTicket()} className="save">SAVE</h3>
            </div>
        </div>
    );
    return(
        <div>
            {editFlightForm}
            {checkModal ? 
                <CheckModal 
                    cancel={closeCheckModal}
                    delete={deleteTicket}
                />
                : null }
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
        onEditTicket: (ticketData) => dispatch(actions.editTicket(ticketData)),
        onDeleteTicket: (id) => dispatch(actions.deleteTicket(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditFlightModal);