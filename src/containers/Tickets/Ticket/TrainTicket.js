import React, {useState} from 'react';

import EditTrainModal from '../editModals/editTrainModal';


import '../Tickets.css';
import trainImg from '../../../components/UI/train.png';


const TrainTicket = (props) => {

    const [editModalOpen, setEditModalOpen] = useState(false);


    const openEditTicketModal = () => {
        setEditModalOpen(true)
    };
    const closeEditTicketModal = () => {
        setEditModalOpen(false)
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
            <h4 className="TicketH4" onClick={openEditTicketModal}>{props.trainCompany}</h4>
            <div className="TicketTop">
                <div className="TicketFrom">
                    <p className="TicketLightgrey">From</p>
                    <p className="TicketEmphasized">{props.departCity}</p>
                    <p>{props.departStation}</p>
                </div>
                <img src={trainImg}/>
                <div className="TicketTo">
                    <p className="TicketLightgrey">To</p>
                    <p className="TicketEmphasized">{props.arrivalCity}</p>
                    <p>{props.arrivalStation}</p>
                </div>
            </div>
            <hr></hr>
            <div className="TicketMiddle">
                <div className="TicketDeparture">
                    <p className="TicketLightgrey">Departure</p>
                    <p className="TicketEmphasized">{props.departTime}</p>
                    <p>{departMonth} {departDay}</p>
                </div>
                <div className="TicketArrival">
                    <p className="TicketLightgrey">Arrival</p>
                    <p className="TicketEmphasized">{props.arrivalTime}</p>
                    <p>{arrivalMonth} {arrivalDay}</p>
                </div>
            </div>
            <div className="TicketBottom">
                <div>
                    <p className="TicketLightgrey">Train #</p>
                    <p>{props.trainNum}</p>
                </div>
                <div>
                    <p className="TicketLightgrey">Platform</p>
                    <p>{props.departPlatform}</p>
                </div>
                <div>
                    <p className="TicketLightgrey">Seat</p>
                    <p>{props.departSeat}</p>
                </div>
            </div>

            {editModalOpen ? <EditTrainModal 
                closeModal={closeEditTicketModal}
                id={props.id}
                type="train"
                trainCompany={props.trainCompany}
                departCity={props.departCity}
                arrivalCity={props.arrivalCity}
                departStation={props.departStation}
                arrivalStation={props.arrivalStation}
                departTime={props.departTime}
                arrivalTime={props.arrivalTime}
                departDate={props.departDate}
                arrivalDate={props.arrivalDate}
                confNum={props.confNum}
                trainNum={props.trainNum}
                departPlatform={props.departPlatform}
                departSeat={props.departSeat}
            /> : null }

        </div>
    );

};

export default TrainTicket;