import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';


import EditFlightModal from './editFlightModal';
import EditTrainModal from './editTrainModal';
import EditBusModal from './editBusModal';
// import TopButton from '../../../components/UI/Button/TopButton';


const EditTicketModal = (props) => {

    const [inputData, setInputData] = useState({});

    const inputChangedHandler = (event, inputId) => {
        console.log(event.target.value);
        let updatedInputData = inputData;
        updatedInputData[inputId] = event.target.value;
        setInputData(updatedInputData);
    };


    return(
        <div>
            {props.type == 'flight' ? 
            <EditFlightModal 
                closeModal={props.closeModal}
                inputChangedHandler={inputChangedHandler}
                // saveNewTicket={saveNewTicket}
                id={props.id}
                airline={props.airline}
                confNum={props.confNum}
                departAirport={props.departAirport}
                arrivalAirport={props.arrivalAirport}
                departCity={props.departCity}
                arrivalCity={props.arrivalCity}
                departTime={props.departTime}
                arrivalTime={props.arrivalTime}
                departTerminal={props.departTerminal}
                arrivalTerminal={props.arrivalTerminal}
                departDate={props.departDate}
                arrivalDate={props.arrivalDate}
                confNum={props.confNum}
                flightNum={props.flightNum}
                gate={props.gate}
                seat={props.seat}
                /> :

            props.type == 'train' ? 
            <EditTrainModal 
                closeModal={props.closeModal}
                inputChangedHandler={inputChangedHandler}
                // saveNewTicket={saveNewTicket}
                /> :

            <EditBusModal 
                closeModal={props.closeModal}
                inputChangedHandler={inputChangedHandler}
                // saveNewTicket={saveNewTicket}
                /> 
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

export default connect(mapStateToProps, mapDispatchToProps)(EditTicketModal);