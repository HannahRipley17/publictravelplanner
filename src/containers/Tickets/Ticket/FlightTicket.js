import React, {useState} from 'react';

import EditFlightModal from '../editModals/editFlightModal';

import '../Tickets.css';
import airplaneImg from '../../../components/UI/airplane.png';


const FlightTicket = (props) => {

    const [editModalOpen, setEditModalOpen] = useState(false);


    const openEditTicketModal = () => {
        setEditModalOpen(true);
    };
    const closeEditTicketModal = () => {
        setEditModalOpen(false);
    };

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const departDate = new Date(props.departDate);
    const arrivalDate = new Date(props.arrivalDate);

    const departMonth = months[departDate.getMonth()];
    const departDay = departDate.getDate();

    const arrivalMonth = months[arrivalDate.getMonth()];
    const arrivalDay = arrivalDate.getDate();

    return (
        <div className="Ticket">
            <h4 className="TicketH4" onClick={openEditTicketModal}>{props.airline}</h4>
            <p>Confirmation # {props.confNum}</p>
            <div className="TicketTop">
                <div className="TicketFrom">
                    <p className="TicketLightgrey">From</p>
                    <p className="TicketEmphasized">{props.departAirport}</p>
                    <p>{props.departCity}</p>
                </div>
                <img src={airplaneImg}/>
                <div className="TicketTo">
                    <p className="TicketLightgrey">To</p>
                    <p className="TicketEmphasized">{props.arrivalAirport}</p>
                    <p>{props.arrivalCity}</p>
                </div>
            </div>
            <hr></hr>
            <div className="TicketMiddle">
                <div className="TicketDeparture">
                    <p className="TicketLightgrey">Departure</p>
                    <p className="TicketEmphasized">{props.departTime}</p>
                    <p>{departMonth} {departDay}</p>
                    <p>Terminal {props.departTerminal}</p>
                </div>
                <div className="TicketArrival">
                    <p className="TicketLightgrey">Arrival</p>
                    <p className="TicketEmphasized">{props.arrivalTime}</p>
                    <p>{arrivalMonth} {arrivalDay}</p>
                    <p>Terminal {props.arrivalTerminal}</p>
                </div>
            </div>
            <div className="TicketBottom">
                <div>
                    <p className="TicketLightgrey">Flight #</p>
                    <p>{props.flightNum}</p>
                </div>
                <div>
                    <p className="TicketLightgrey">Gate</p>
                    <p>{props.gate}</p>
                </div>
                <div>
                    <p className="TicketLightgrey">Seat</p>
                    <p>{props.seat}</p>
                </div>
            </div>

            {editModalOpen ? <EditFlightModal 
                closeModal={closeEditTicketModal}
                id={props.id}
                type="flight"
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
            /> : null }

        </div>
    );

};

export default FlightTicket;