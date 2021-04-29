import React, {useState} from 'react';

import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

import moment from 'moment';

import CheckModal from '../../../components/UI/Check/checkModal';


const EditTrainModal = (props) => {

    const [inputData, setInputData] = useState({
        id: props.id,
        type: "train",
        trainCompany: props.trainCompany,
        departCity: props.departCity,
        arrivalCity: props.arrivalCity,
        departStation: props.departStation,
        arrivalStation: props.arrivalStation,
        departTime: props.departTime,
        arrivalTime: props.arrivalTime,
        departDate: props.departDate,
        arrivalDate: props.arrivalDate,
        confNum: props.confNum,
        trainNum: props.trainNum,
        departPlatform: props.departPlatform,
        departSeat: props.departSeat,
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
        let trainData = {};
        trainData.type="train";
        trainData.id = inputData.id

        if (inputData.trainCompany === "") {
            trainData.trainCompany = "Untitled"
        } else {
            trainData.trainCompany = inputData.trainCompany;
        }
        trainData.trainNum = inputData.trainNum;
        trainData.confNum = inputData.confNum;

        trainData.departCity = inputData.departCity;
        trainData.departStation = inputData.departStation;
        trainData.departDate = formatDate(inputData.departDate);
        trainData.departTime = inputData.departTime;
        trainData.departPlatform = inputData.departPlatform;
        trainData.departSeat = inputData.departSeat;

        trainData.arrivalCity = inputData.arrivalCity;
        trainData.arrivalStation = inputData.arrivalStation;
        trainData.arrivalDate = formatDate(inputData.arrivalDate);
        trainData.arrivalTime = inputData.arrivalTime;
        props.onEditTicket(trainData).promise.then(response => {
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

    let editTrainForm = (
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
                    defaultValue={inputData.trainCompany}
                    onChange={(event) => inputChangedHandler(event, "trainCompany")}
                    />
                <input 
                    className="TicketHalfInput" 
                    type="text" 
                    placeholder="Train Number" 
                    defaultValue={inputData.trainNum}
                    onChange={(event) => inputChangedHandler(event, "trainNum")}
                    />

            </div>
            <div className="TicketHalfInputs">
                <input 
                    className="TicketHalfInput" 
                    type="text" 
                    placeholder="Platform" 
                    defaultValue={inputData.departPlatform}
                    onChange={(event) => inputChangedHandler(event, "departPlatform")}
                    />
                <input 
                    className="TicketHalfInput" 
                    type="text" 
                    placeholder="Seat" 
                    defaultValue={inputData.departSeat}
                    onChange={(event) => inputChangedHandler(event, "departSeat")}
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
            {editTrainForm}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditTrainModal);