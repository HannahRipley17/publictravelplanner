import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Budgeter.css';
import * as actions from '../../store/actions/index';
import Category from './Category';

import Chart from '../../components/UI/Chart/Chart';


// TODO

// if you backspace the numbers it changes to NaN so that's kinda annoying
// edit works but you can only do one at a time
// fix addCosts - needs to update on every fetchSpents - if it's blank it should be a 0
// make sure all the numbers are adding integers not strings
// chart doing infinite loops?
// error handling for if you hit save on edit when there's no things

// setTimeout(() => { this.addCosts(); }, 50); is really helpful!


class Budgeter extends Component {
    state = {
        addedFlights: 0,
        addedHotels: 0,
        addedFood: 0,
        addedPtrans: 0,
        addedTickets: 0,
        addedMisc: 0,
        totalCost: 0,
        bigtotalCost: 0,
        addedSpentFlights: 0,
        addedSpentHotels: 0,
        addedSpentFood: 0,
        addedSpentPtrans: 0,
        addedSpentTickets: 0,
        addedSpentMisc: 0,
        gotData: false
    }
    
    componentDidMount = () => {
        this.props.onFetchCities();
        this.props.onFetchTransits();
        //this.props.onFetchSpents();
        setTimeout(() => { 
            this.setValues();
            this.addCosts(); 
        }, 300); 
        this.loadChart();
    };

    setValues = () => {
        let newaddedFlights = 0;
        let newaddedHotels = 0;
        let newaddedFood = 0;
        let newaddedPtrans = 0;
        let newaddedTickets = 0;
        let newaddedMisc = 0;
        let newtotalCost = 0;    
        for (let city in this.props.cities) {
            let hotels = this.props.cities[city].cost.hotels;
            let food = this.props.cities[city].cost.food;
            let ptrans = this.props.cities[city].cost.ptrans;
            let tickets = this.props.cities[city].cost.tickets;
            let misc = this.props.cities[city].cost.misc;

            newaddedHotels += hotels ? parseInt(hotels) : 0;

            newaddedFood += food ? parseInt(food) : 0;

            newaddedPtrans += ptrans ? parseInt(ptrans) : 0;

            newaddedTickets += tickets ? parseInt(tickets) : 0;

            newaddedMisc += misc ? parseInt(misc) : 0;
        };
        for (let transit in this.props.transit){
            let method = this.props.transit[transit].method;

            if (method == "Flight" || method == "flight") {
                newaddedFlights += parseInt(this.props.transit[transit].price);
            }
            if (method == "Train" || method == "train" || method == "Bus" || method == "bus") {
                newaddedPtrans += parseInt(this.props.transit[transit].price);
            }
        };
        newtotalCost += newaddedFlights + newaddedHotels + newaddedFood + newaddedPtrans + newaddedTickets + newaddedMisc;
        
        this.setState({addedFlights: newaddedFlights,addedHotels: newaddedHotels, addedFood: newaddedFood, addedPtrans: newaddedPtrans, addedTickets: newaddedTickets, addedMisc: newaddedMisc, totalCost: newtotalCost, gotData: true});
    };

    addCosts = () => {
        let newbigtotalCost = 0;  
        let newaddedSpentFlights = 0;
        let newaddedSpentHotels = 0;
        let newaddedSpentFood = 0;
        let newaddedSpentPtrans = 0;
        let newaddedSpentTickets = 0;
        let newaddedSpentMisc = 0;     
        

        for (let flight in this.props.flights) {
            newaddedSpentFlights += parseInt(this.props.flights[flight].cost);
            newbigtotalCost += parseInt(this.props.flights[flight].cost);
        };
        for (let hotel in this.props.hotels) {
            newaddedSpentHotels += parseInt(this.props.hotels[hotel].cost);
            newbigtotalCost += parseInt(this.props.hotels[hotel].cost);
        };
        for (let item in this.props.food) {
            newaddedSpentFood += parseInt(this.props.food[item].cost);
            newbigtotalCost += parseInt(this.props.food[item].cost);
        };
        for (let tran in this.props.ptrans) {
            newaddedSpentPtrans += parseInt(this.props.ptrans[tran].cost);
            newbigtotalCost += parseInt(this.props.ptrans[tran].cost);
        };
        for (let ticket in this.props.tickets) {
            newaddedSpentTickets += parseInt(this.props.tickets[ticket].cost);
            newbigtotalCost += parseInt(this.props.tickets[ticket].cost);

        };
        for (let misc in this.props.misc) {
            newaddedSpentMisc += parseInt(this.props.misc[misc].cost);
            newbigtotalCost += parseInt(this.props.misc[misc].cost);

        };  

        this.setState({addedSpentFlights: newaddedSpentFlights, addedSpentHotels: newaddedSpentHotels, addedSpentFood: newaddedSpentFood, addedSpentPtrans: newaddedSpentPtrans, addedSpentTickets: newaddedSpentTickets, addedSpentMisc: newaddedSpentMisc, bigtotalCost: newbigtotalCost});
        this.loadChart();
    };

    loadChart = () => {
        let chart = (
            <Chart 
                flights={this.state.addedSpentFlights}
                hotels={this.state.addedSpentHotels}
                food={this.state.addedSpentFood}
                ptrans={this.state.addedSpentPtrans}
                tickets={this.state.addedSpentTickets}
                misc={this.state.addedSpentMisc}
                totalCost={this.state.bigtotalCost}
            />
        );
        return chart;
    }

    
    testAddSpent = () => {
        let spentData = {};
        spentData["label"] = "test1";
        spentData["cost"] = 100;
        if (spentData.cost !== '' || spentData.cost !== '') {
            spentData["category"] = "Hotels";
            this.props.onAddSpent(spentData);
        };
    }

    render() {

        
        //console.log(this.props.hotels, this.props.food, this.props.ptrans);
        
        if (!this.state.gotData) {
            return null;
        };

        let myChart = this.loadChart();

        return (
            <div>
                <h3 className="topheaders">Budget</h3>
                {myChart}
                <h3 className="BudgeterBudgetedTotal">${this.state.totalCost} budgeted total</h3>
                <Category category="Flights" budgetedcost={this.state.addedFlights} addCosts={this.addCosts}/>
                <Category category="Hotels" budgetedcost={this.state.addedHotels} addCosts={this.addCosts}/>
                <Category category="Food" budgetedcost={this.state.addedFood} addCosts={this.addCosts}/>
                <Category category="Public Trans." budgetedcost={this.state.addedPtrans} addCosts={this.addCosts}/>
                <Category category="Tickets" budgetedcost={this.state.addedTickets} addCosts={this.addCosts}/>
                <Category category="Misc." budgetedcost={this.state.addedMisc} addCosts={this.addCosts}/>
                
            </div>
        );
    }
};


const mapStateToProps = state => {
    return {
        cities: state.itinerary.cities,
        transit: state.itinerary.transit,
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
        onFetchCities: (category) => dispatch(actions.fetchCities(category)),
        onFetchTransits: () => dispatch(actions.fetchTransits()),
        onFetchSpents: () => dispatch(actions.fetchSpents()),
        onAddSpent: (spentData) => dispatch(actions.addNewSpent(spentData))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Budgeter);