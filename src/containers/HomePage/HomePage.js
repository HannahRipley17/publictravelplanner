import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import './HomePage.css';

import Note from '../Notes/Note/Note';

import ticketImg from '../../components/UI/ticket.png';
import packinglistImg from '../../components/UI/packinglist.png';
import todolistImg from '../../components/UI/todolist.png';
import moment from 'moment';


const HomePage = (props) => {

    const [ready, setReady] = useState(false);

    const [addedFlights, setAddedFlights] = useState(0);
    const [addedHotels, setAddedHotels] = useState(0);
    const [addedFood, setAddedFood] = useState(0);
    const [addedPtrans, setAddedPtrans] = useState(0);
    const [addedTickets, setAddedTickets] = useState(0);
    const [addedMisc, setAddedMisc] = useState(0);
    const [totalBudget, setTotalBudget] = useState(0);

    useEffect(() => {
        props.onFetchNotes();
        props.onFetchCities();
        props.onFetchTransits();
        setBudgeterValues();
    }, []);

    // setTimeout(() => { setReady(true); }, 1000);
    // console.log(props.notes[0]);


    // const countDownDate = new Date(props.citiesandtransits[0].date).getTime();
    // console.log(countDownDate);
    // let countdown = null;
    // // Update the count down every 1 second
    // setInterval(function() {
    //     console.log("countdown: ", countdown);

    //     // Get today's date and time
    //     let now = new Date().getTime();
    //     // console.log(now);

    //     // Find the distance between now and the count down date
    //     let distance = countDownDate - now;
    //     console.log(distance);

    //     // Time calculations for days, hours, minutes and seconds
    //     let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //     let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //     let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //     let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    //     // Display the result in the element with id="demo"
    //     countdown = days + "d " + hours + "h "
    //     + minutes + "m " + seconds + "s ";

    //     // If the count down is finished, write some text
    //     // if (distance < 0) {
    //     //     // clearInterval(x);
    //     //     countdown = "Have fun!!!";
    //     // }
    // }, 5000);



    const setBudgeterValues = () => {
        let newaddedFlights = 0;
        let newaddedHotels = 0;
        let newaddedFood = 0;
        let newaddedPtrans = 0;
        let newaddedTickets = 0;
        let newaddedMisc = 0;
        let newtotalCost = 0;    
        for (let city in props.cities) {
            let hotels = props.cities[city].cost.hotels;
            let food = props.cities[city].cost.food;
            let ptrans = props.cities[city].cost.ptrans;
            let tickets = props.cities[city].cost.tickets;
            let misc = props.cities[city].cost.misc;

            newaddedHotels += hotels ? parseInt(hotels) : 0;
            setAddedHotels(newaddedHotels);

            newaddedFood += food ? parseInt(food) : 0;
            setAddedFood(newaddedFood);

            newaddedPtrans += ptrans ? parseInt(ptrans) : 0;
            setAddedPtrans(newaddedPtrans);

            newaddedTickets += tickets ? parseInt(tickets) : 0;
            setAddedTickets(newaddedTickets);

            newaddedMisc += misc ? parseInt(misc) : 0;
            setAddedMisc(newaddedMisc);

        };
        for (let transit in props.transit){
            let method = props.transit[transit].method;

            if (method == "Flight" || method == "flight") {
                newaddedFlights += parseInt(props.transit[transit].price);
                setAddedFlights(newaddedFlights)
            }
            if (method == "Train" || method == "train" || method == "Bus" || method == "bus") {
                newaddedPtrans += parseInt(props.transit[transit].price);
                setAddedPtrans(newaddedPtrans);
            }
        };
        newtotalCost += newaddedFlights + newaddedHotels + newaddedFood + newaddedPtrans + newaddedTickets + newaddedMisc;
        setTotalBudget(newtotalCost);
        
    };

    
    const mapEvents = (cityortransit) => {
        if (cityortransit.type === "city") {
            let totalCost = parseInt(cityortransit.cost.hotels) + parseInt(cityortransit.cost.food) + parseInt(cityortransit.cost.ptrans) + parseInt(cityortransit.cost.tickets) + parseInt(cityortransit.cost.misc);

            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            const endDate = new Date(cityortransit.endDate);
            const date = new Date(cityortransit.date);

            const startMonth = months[date.getMonth()];
            const startDay = date.getDate();

            const endMonth = months[endDate.getMonth()];
            const endDay = endDate.getDate();

            // let numDates = Math.floor((new Date(cityortransit.endDate) - new Date(cityortransit.date)) / (1000*60*60*24))+1;
            let numDates = Math.floor((endDate - date) / (1000*60*60*24))+1;

            return (
                <div key={cityortransit.id}>
                    <h3 className="HomePageItineraryHeaders" >{cityortransit.title}</h3>
                    <p className="HomePageItineraryTopLineInfo">{startMonth} {startDay} - {endMonth} {endDay}</p>
                    <p className="HomePageItineraryEventHeaderInfo">{numDates} days - ${totalCost}</p>
                </div>
            )
        } else if (cityortransit.type === "transit") {
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            const date = new Date(cityortransit.date);

            const dateMonth = months[date.getMonth()];
            const dateDay = date.getDate();
            return (
                <div key={cityortransit.id}>
                    <h3 className="HomePageItineraryHeaders">{cityortransit.method}</h3>
                    <h4 className="HomePageItineraryTopLineInfo">{cityortransit.from} - {cityortransit.to}</h4>
                    <h4 className="HomePageItineraryEventHeaderInfo"> {dateMonth} {dateDay}  -  {cityortransit.time} | ${cityortransit.price}</h4>
                </div>
            )
        }
        
    }

    let citiesandtransits = [...props.citiesandtransits];
    let citiesandtransitsList = (
        <div>
            {citiesandtransits.map((cityortransit) => 
                mapEvents(cityortransit)
            )}
        </div>     
    );
    

    let placeholderNote = {
        "title": "Welcome!", 
        "note": "This is a placeholder note. Go to the Notes page and add your own!"
    }


    let body = (
        <div>
            
            {props.notes[0] ? 
                <Note item={props.notes[0]} className="MainNotesPageNote" homepage/> : 
                <Note item={placeholderNote} className="MainNotesPageNote" homepage/> }
            
            <div className="HomePageButtonsDiv">
                <Link to="/tickets" className="HomePageButtons">
                    <img src={ticketImg} />
                    Tickets
                </Link>
                <Link to="/packinglist" className="HomePageButtons">
                    <img src={packinglistImg} />
                    Packing List
                </Link>
                <Link to="/todolist" className="HomePageButtons">
                    <img src={todolistImg} />
                    To-Do List
                </Link>
            </div>

            <div className="HomePageItinerary">
                <Link to="/itinerary" className="HomePageLinkHeader">Itinerary</Link>
                {citiesandtransitsList}
            </div>

            <div className="HomePageBudgeter">
                <Link to="/budgeter" className="HomePageLinkHeader">Budget - $<span>{totalBudget}</span></Link>
                <p>Flights - <span>${addedFlights}</span></p>
                <p>Hotels - <span>${addedHotels}</span></p>
                <p>Food - <span>${addedFood}</span></p>
                <p>Public trans. - <span>${addedPtrans}</span></p>
                <p>Tickets - <span>${addedTickets}</span></p>
                <p>Misc. - <span>${addedMisc}</span></p>
            </div>

            
        </div>

    )
    return (
        <div>
            <h3 className="topheaders">Travel Planner</h3>
            {body}

        </div>
    );
}

const mapStateToProps = state => {
    var citiesandtransits = state.itinerary.cities.concat(state.itinerary.transit);
    citiesandtransits.sort((a, b) => {
        let sortedValue = new Date(a.date) - new Date(b.date);
        if (sortedValue === 0) {
            if (a.type !== b.type){
                return -1
            } else if (a.type === b.type){
                if (new Date(a.endDate) - new Date(b.endDate) > 1) {
                    return 1
                } else {
                    return -1
                }
            }
        }
        return sortedValue
    });

    return {
        notes: state.notes.notes,

        cities: state.itinerary.cities,
        transit: state.itinerary.transit,
        citiesandtransits: citiesandtransits,

        flights: state.budgeter.flights,
        hotels: state.budgeter.hotels,
        food: state.budgeter.food,
        ptrans: state.budgeter.ptrans,
        tickets: state.budgeter.tickets,
        misc: state.budgeter.misc,

    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchNotes: () => dispatch(actions.fetchNotes()),

        onFetchCities: (category) => dispatch(actions.fetchCities(category)),
        onFetchTransits: () => dispatch(actions.fetchTransits()),

        onFetchSpents: () => dispatch(actions.fetchSpents()),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);