import React, {useState} from 'react';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import moment from 'moment';

import CheckModal from '../../../components/UI/Check/checkModal';


const EditBusModal = (props) => {

    const [inputData, setInputData] = useState({
        id: props.id,
        busCompany: props.busCompany,
        departCity: props.departCity,
        arrivalCity: props.arrivalCity,
        departStation: props.departStation,
        arrivalStation: props.arrivalStation,
        departTime: props.departTime,
        arrivalTime: props.arrivalTime,
        departDate: props.departDate,
        arrivalDate: props.arrivalDate,
        confNum: props.confNum,
        busNum: props.busNum,
        platform: props.platform,
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
        let busData = {};
        busData.type="bus";
        busData.id = inputData.id

        if (inputData.busCompany === "") {
            busData.busCompany = "Untitled"
        } else {
            busData.busCompany = inputData.busCompany;
        }
        busData.busNum = inputData.busNum;
        busData.confNum = inputData.confNum;

        busData.departCity = inputData.departCity;
        busData.departStation = inputData.departStation;
        busData.departDate = formatDate(inputData.departDate);
        busData.departTime = inputData.departTime;
        busData.platform = inputData.platform;
        busData.seat = inputData.seat;

        busData.arrivalCity = inputData.arrivalCity;
        busData.arrivalStation = inputData.arrivalStation;
        busData.arrivalDate = formatDate(inputData.arrivalDate);
        busData.arrivalTime = inputData.arrivalTime;
        props.onEditTicket(busData).promise.then(response => {
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


    let editBusForm = (
        <div className="NewTicketModal">

            <div className="itinerarymodaltop">
                <h2 className="itinerarymodalheader">Edit Ticket</h2>
                <b onClick={props.closeModal} className="itinerarymodalexit">X</b>
            </div>

            <h4 className="TicketModalHeader">Departure</h4>
            <input 
                className="TicketInput" 
                type="text" 
                placeholder="City" 
                defaultValue={inputData.departCity}
                onChange={(event) => inputChangedHandler(event, "departCity")}
                />
            <input 
                className="TicketInput" 
                type="text" 
                placeholder="Station" 
                defaultValue={inputData.departStation}
                onChange={(event) => inputChangedHandler(event, "departStation")}
                />
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
            
            <h4 className="TicketModalHeader">Arrival</h4>
            <input 
                className="TicketInput" 
                type="text" 
                placeholder="To" 
                defaultValue={inputData.arrivalCity}
                onChange={(event) => inputChangedHandler(event, "arrivalCity")}
                />
            <input 
                className="TicketInput" 
                type="text" 
                placeholder="Station" 
                defaultValue={inputData.arrivalStation}
                onChange={(event) => inputChangedHandler(event, "arrivalStation")}
                />
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

            <h4 className="TicketModalHeader">Other</h4>
            <div className="TicketHalfInputs">
                <input 
                    className="TicketHalfInput" 
                    type="text" 
                    placeholder="Company" 
                    defaultValue={inputData.busCompany}
                    onChange={(event) => inputChangedHandler(event, "busCompany")}
                    />
                <input 
                    className="TicketHalfInput" 
                    type="text" 
                    placeholder="Bus Number" 
                    defaultValue={inputData.busNum}
                    onChange={(event) => inputChangedHandler(event, "busNum")}
                    />
            </div>
            <div className="TicketHalfInputs">
                <input 
                    className="TicketHalfInput" 
                    type="text" 
                    placeholder="Platform" 
                    defaultValue={inputData.platform}
                    onChange={(event) => inputChangedHandler(event, "platform")}
                    />
                <input 
                    className="TicketHalfInput" 
                    type="text" 
                    placeholder="Seat" 
                    defaultValue={inputData.seat}
                    onChange={(event) => inputChangedHandler(event, "seat")}
                    />
            </div>

            <div style={{display: "flex", justifyContent: "space-between"}}>
                <p onClick={openCheckModal} className="delete">Delete</p>
                <h3 onClick={() => saveEditedTicket()} className="save">SAVE</h3>
            </div>
        </div>
    );
    return(
        <div>
            {editBusForm}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditBusModal);