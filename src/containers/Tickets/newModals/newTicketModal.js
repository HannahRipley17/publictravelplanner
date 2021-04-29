import React, {useState} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

import moment from 'moment';

import NewFlightModal from './newFlightModal';
import NewTrainModal from './newTrainModal';
import NewBusModal from './newBusModal';
import TopButton from '../../../components/UI/Button/TopButton';


const NewTicketModal = (props) => {

    const [whichModal, setWhichModal] = useState('');
    const [inputData, setInputData] = useState({});


    const inputChangedHandler = (event, inputId) => {
        let updatedInputData = inputData;
        updatedInputData[inputId] = event.target.value;
        setInputData(updatedInputData);
    };

    console.log(inputData.departDate, inputData.arrivalDate);
    const saveNewTicket = function(type) {
        if (type === "flight") {
            let flightData = {};
            flightData.type="flight";

            if (inputData.airline == undefined) {
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
            props.onSaveNewTicket(flightData).promise.then(response => {
                props.onFetchTickets();
                props.closeModal();
            });

        } else if (type === "train") {
            let trainData = {};
            trainData.type="train";

            if (inputData.trainCompany == undefined) {
                trainData.trainCompany = "Untitled"
            } else {
                trainData.trainCompany = inputData.trainCompany;
            }
            trainData.trainNum = inputData.trainNum;
            // trainData.confNum = inputData.confNum;

            trainData.departCity = inputData.departCity;
            trainData.departStation = inputData.departStation;
            trainData.departDate = formatDate(inputData.departDate);
            trainData.departTime = inputData.departTime;
            trainData.platform = inputData.platform;
            trainData.seat = inputData.seat;

            trainData.arrivalCity = inputData.arrivalCity;
            trainData.arrivalStation = inputData.arrivalStation;
            trainData.arrivalDate = formatDate(inputData.arrivalDate);
            trainData.arrivalTime = inputData.arrivalTime;
            props.onSaveNewTicket(trainData).promise.then(response => {
                props.onFetchTickets();
                props.closeModal();
            });

        } else if (type === "bus") {
            let busData = {};
            busData.type="bus";

            if (inputData.busCompany == undefined) {
                busData.busCompany = "Untitled"
            } else {
                busData.busCompany = inputData.busCompany;
            }
            busData.busNum = inputData.busNum;
            // busData.confNum = inputData.confNum;

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
            props.onSaveNewTicket(busData).promise.then(response => {
                props.onFetchTickets();
                props.closeModal();
            });

        }
        // this.props.putDown();
        // this.resetData();
    };


    const formatDate = (date) => {
        //console.log(date);
        let newDate = null;

        if (date == undefined) {
            newDate = moment().format().toString();
        } else {
            newDate = moment(date).format().toString();
        }
        //console.log(newDate);
        // const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        // const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        // //let day = days[newDate.getDay()];
        // let month = months[newDate.getMonth()];
        // let thedate = newDate.getDate();
        // // let year = newDate.getFullYear();

        // let stringDate = month + " " + thedate;
        // day + ", " + 
        return newDate;
    };


    let startOptions = (
        <div className="NewTicketModal">
            <div className="itinerarymodaltop">
                <h2 className="itinerarymodalheader">New Ticket</h2>
                <b onClick={props.closeModal} className="itinerarymodalexit">X</b>
            </div>
            <button 
                className="NewModalStartButtons"
                onClick={() => {setWhichModal("flight")}}
            >FLIGHT</button>
            <button 
                className="NewModalStartButtons"
                onClick={() => {setWhichModal("train")}}
            >TRAIN</button>
            <button 
                className="NewModalStartButtons"
                onClick={() => {setWhichModal("bus")}}
            >BUS</button>
        </div>
    )
    return(
        <div>
            {whichModal == '' ? startOptions :

            whichModal == 'flight' ? 
            <NewFlightModal 
                closeModal={props.closeModal}
                inputChangedHandler={inputChangedHandler}
                saveNewTicket={saveNewTicket}
                /> :

            whichModal == 'train' ? 
            <NewTrainModal 
                closeModal={props.closeModal}
                inputChangedHandler={inputChangedHandler}
                saveNewTicket={saveNewTicket}
                /> :

            <NewBusModal 
                closeModal={props.closeModal}
                inputChangedHandler={inputChangedHandler}
                saveNewTicket={saveNewTicket}/> 
            }

            

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
        onSaveNewTicket: (ticketData) => dispatch(actions.saveNewTicket(ticketData)),
        // onEditTicket: (ticketData) => dispatch(actions.editTicket(ticketData)),
        // onDeleteTicket: (id) => dispatch(actions.deleteTicket(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewTicketModal);