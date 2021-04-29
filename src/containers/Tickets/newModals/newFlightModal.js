import React from 'react';

import './newTicketModals.css';

const newFlightModal = (props) => {

    let newFlightForm = (
        <div className="NewTicketModal">

            <div className="itinerarymodaltop">
                <h2 className="itinerarymodalheader">New Ticket</h2>
                <b onClick={props.closeModal} className="itinerarymodalexit">X</b>
            </div>

            <input 
                className="TicketInput" 
                type="text" 
                placeholder="Airline"
                //value={props.inputData.airline}
                onChange={(event) => props.inputChangedHandler(event, "airline")}
                />
            <div className="TicketHalfInputs">
                <input 
                    className="TicketHalfInput" 
                    type="text" 
                    placeholder="Flight #" 
                    // value={inputData.flightNum}
                    onChange={(event) => props.inputChangedHandler(event, "flightNum")}
                    />
                <input 
                    className="TicketHalfInput" 
                    type="text" 
                    placeholder="Confirm. #" 
                    // value={inputData.flightNum}
                    onChange={(event) => props.inputChangedHandler(event, "confNum")}
                    />

            </div>

            <h4 className="TicketModalHeader">Departure</h4>
            <div className="TicketHalfInputs">
                <input 
                    className="TicketHalfInput" 
                    type="text" 
                    placeholder="City" 
                    // value={inputData.departAirport}
                    onChange={(event) => props.inputChangedHandler(event, "departCity")}
                    />
                <input 
                    className="TicketHalfInput" 
                    type="text" 
                    placeholder="Airport Code" 
                    // value={inputData.departAirport}
                    onChange={(event) => props.inputChangedHandler(event, "departAirport")}
                    />

            </div>
            <div className="TicketHalfInputs">
                 <input 
                    className="TicketHalfInput" 
                    type="date" 
                    placeholder="Date" 
                    // value={inputData.departDate}
                    onChange={(event) => props.inputChangedHandler(event, "departDate")}
                    />
                <input 
                    className="TicketHalfInput" 
                    type="text" 
                    placeholder="Time" 
                    // value={inputData.departTime}
                    onChange={(event) => props.inputChangedHandler(event, "departTime")}
                    />
            </div>
           
            <div className="TicketThirdInputs">
                <input 
                    className="TicketThirdInput" 
                    type="text" 
                    placeholder="Terminal" 
                    // value={inputData.departTerminal}
                    onChange={(event) => props.inputChangedHandler(event, "departTerminal")}
                    />
                <input 
                    className="TicketThirdInput" 
                    type="text" 
                    placeholder="Gate" 
                    // value={inputData.gate}
                    onChange={(event) => props.inputChangedHandler(event, "gate")}
                    />
                <input 
                    className="TicketThirdInput" 
                    type="text" 
                    placeholder="Seat" 
                    // value={inputData.seat}
                    onChange={(event) => props.inputChangedHandler(event, "seat")}
                    />
            </div>

            <h4 className="TicketModalHeader">Arrival</h4>
            <div className="TicketHalfInputs">
                <input 
                    className="TicketHalfInput" 
                    type="text" 
                    placeholder="City" 
                    // value={inputData.departAirport}
                    onChange={(event) => props.inputChangedHandler(event, "arrivalCity")}
                    />
                <input 
                    className="TicketHalfInput" 
                    type="text" 
                    placeholder="Airport Code" 
                    // value={inputData.arrivalAirport}
                    onChange={(event) => props.inputChangedHandler(event, "arrivalAirport")}
                    />

            </div>
            <div className="TicketHalfInputs">
                <input 
                    className="TicketHalfInput" 
                    type="date" 
                    placeholder="Date" 
                    // value={inputData.arrivalDate}
                    onChange={(event) => props.inputChangedHandler(event, "arrivalDate")}
                    />
                <input 
                    className="TicketHalfInput" 
                    type="text" 
                    placeholder="Time" 
                    // value={inputData.arrivalTime}
                    onChange={(event) => props.inputChangedHandler(event, "arrivalTime")}
                    />
            </div>
            <input 
                className="TicketInput" 
                type="text" 
                placeholder="Terminal" 
                // value={inputData.arrivalTerminal}
                onChange={(event) => props.inputChangedHandler(event, "arrivalTerminal")}
                />

            <h3 onClick={() => props.saveNewTicket("flight")} className="itinerarysave">SAVE</h3>
        </div>
    );
    return(
        <div>
            {newFlightForm}
        </div>
    );
};

export default newFlightModal;