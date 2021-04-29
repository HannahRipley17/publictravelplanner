import React from 'react';

const newBusModal = (props) => {

    let newBusForm = (
        <div className="NewTicketModal">

            <div className="itinerarymodaltop">
                <h2 className="itinerarymodalheader">New Ticket</h2>
                <b onClick={props.closeModal} className="itinerarymodalexit">X</b>
            </div>

            <input 
                className="TicketInput" 
                type="text" 
                placeholder="Company" 
                // value={inputData.departTerminal}
                onChange={(event) => props.inputChangedHandler(event, "busCompany")}
                />
            <div className="TicketHalfInputs">
                <input 
                    className="TicketHalfInput" 
                    type="text" 
                    placeholder="Conf. Num" 
                    // value={inputData.departTerminal}
                    onChange={(event) => props.inputChangedHandler(event, "confNum")}
                    />
                <input 
                    className="TicketHalfInput" 
                    type="text" 
                    placeholder="Bus Number" 
                    // value={inputData.busNum}
                    onChange={(event) => props.inputChangedHandler(event, "busNum")}
                    />
            </div>
            <h4 className="TicketModalHeader">Departure</h4>
            <input 
                className="TicketInput" 
                type="text" 
                placeholder="City" 
                // value={inputData.departAirport}
                onChange={(event) => props.inputChangedHandler(event, "departCity")}
                />
            <input 
                className="TicketInput" 
                type="text" 
                placeholder="Station" 
                // value={inputData.departAirport}
                onChange={(event) => props.inputChangedHandler(event, "departStation")}
                />
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
            
            <h4 className="TicketModalHeader">Arrival</h4>
            <input 
                className="TicketInput" 
                type="text" 
                placeholder="To" 
                // value={inputData.arrivalAirport}
                onChange={(event) => props.inputChangedHandler(event, "arrivalCity")}
                />
            <input 
                className="TicketInput" 
                type="text" 
                placeholder="Station" 
                // value={inputData.arrivalAirport}
                onChange={(event) => props.inputChangedHandler(event, "arrivalStation")}
                />
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

            <h4 className="TicketModalHeader">Other</h4>
            
            <div className="TicketHalfInputs">
                <input 
                    className="TicketHalfInput" 
                    type="text" 
                    placeholder="Platform" 
                    // value={inputData.seat}
                    onChange={(event) => props.inputChangedHandler(event, "platform")}
                    />
                <input 
                    className="TicketHalfInput" 
                    type="text" 
                    placeholder="Seat" 
                    // value={inputData.seat}
                    onChange={(event) => props.inputChangedHandler(event, "seat")}
                    />
            </div>

            <h3 onClick={() => props.saveNewTicket("bus")} className="itinerarysave">SAVE</h3>
        </div>
    );
    return(
        <div>
            {newBusForm}
        </div>
    );
};

export default newBusModal;