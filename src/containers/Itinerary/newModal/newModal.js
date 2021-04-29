import React, {Component} from 'react';
import {connect} from 'react-redux';
import './newModal.css';
import * as actions from '../../../store/actions/index';

import moment from 'moment';


class newModal extends Component {
    state = {
        inputData: {
            type: '',
            citytitle: '',
            citydate: '',
            cityenddate: '',
            transitfrom: '',
            transitto: '',
            transitdate: '',
            transittime: '',
            transitmethod: '',
            transitprice: ''
        }
    };

    resetData = () => {
        {this.props.putDown()};
        let newInputData = {
            type: '',
            citytitle: '',
            citydate: '',
            cityenddate: '',
            transitfrom: '',
            transitto: '',
            transitdate: '',
            transittime: '',
            transitmethod: '',
            transitprice: ''
        };
        this.setState({inputData: newInputData});
    }

    inputChangedHandler = (event, inputId) => {
        let updatedInputData = {...this.state.inputData}

        let updatedInputElement = { ...updatedInputData[inputId]};

        updatedInputElement = event.target.value;

        updatedInputData[inputId] = updatedInputElement;

        this.setState({inputData: updatedInputData});
    };


    saveNew = (type) => {

        if (type === "city") {
            let cityData = {};
            //cityData.id = Math.floor(Math.random() * 100000);
            cityData.type="city";
            let title = this.state.inputData.citytitle;
            if (title === '') {
                title = "Untitled"
            }
            cityData.title = (title);
            cityData.date = this.formatDate(this.state.inputData.citydate);
            cityData.endDate = this.formatDate(this.state.inputData.cityenddate);
            cityData.cost = {};
            cityData.cost.hotels = "";
            cityData.cost.food = "";
            cityData.cost.ptrans = "";
            cityData.cost.tickets = "";
            cityData.cost.misc = "";
            cityData.thingstodo = [{title: "", cost: 0}];
            cityData.notes = "";
            this.props.onSaveNewCity(cityData).promise.then(response => {
                this.props.onFetchTransits();
                this.props.onFetchCities();
            });

        } else if (type === "transit") {
            let transitData = {};
            //transitData.id = Math.floor(Math.random() * 100000);
            transitData.type="transit";

            let method = this.state.inputData.transitmethod;
            if (method === '') {
                method = "Transit"
            };

            let from = this.state.inputData.transitfrom;
            if (from === '') {
                from = "Here"
            };

            let to = this.state.inputData.transitto;
            if (to === '') {
                to = "There"
            };
            transitData.method = (method);
            transitData.date = this.formatDate(this.state.inputData.transitdate);
            transitData.from = (from);
            transitData.to = (to);
            transitData.time = (this.state.inputData.transittime);
            transitData.price = (this.state.inputData.transitprice);
            this.props.onSaveNewTransit(transitData).promise.then(response => {
                this.props.onFetchTransits();
                this.props.onFetchCities();
            });
        }
        this.props.putDown();
        this.resetData();
    };

    formatDate = (date) => {
        let newDate = null;

        if (!date) {
            newDate = moment().format().toString();
        } else {
            newDate = moment(date).format().toString();
        }
        return newDate;
    };

    // formatDate = (date) => {
    //     let newDate = null;

    //     if (date === '') {
    //         newDate = new Date();
    //     } else {
    //         newDate = new Date(date);
    //     }
    //     const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //     const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //     //let day = days[newDate.getDay()];
    //     let month = months[newDate.getMonth()];
    //     let thedate = newDate.getDate() + 1;
    //     // let year = newDate.getFullYear();

    //     let stringDate = month + " " + thedate;
    //     // day + ", " + 
    //     return stringDate;
    // };

    putCityModalUp = () => {
        this.putTransitModalDown();
        this.setState( { cityModalUp: true} );
    }

    putTransitModalUp = () => {
        this.putCityModalDown();
        this.setState( { transitModalUp: true} );
    }

    putCityModalDown = () => {
        this.setState( { cityModalUp: false} );
    }

    putTransitModalDown = () => {
        this.setState( { transitModalUp: false} );
    }


    render() {
      
        let newForm = (
        <div className={this.props.className}>

            <div className="itinerarymodaltop">
                <h2 className="itinerarymodalheader">New City</h2>
                <b onClick={this.resetData} className="itinerarymodalexit">X</b>
            </div>

            <input 
                className="itineraryinput" 
                type="text" 
                placeholder="City"
                value={this.state.inputData.citytitle}
                onChange={(event) => this.inputChangedHandler(event, "citytitle")}/>
            <input 
                className="itineraryinput" 
                type="date" 
                placeholder="Dates" 
                value={this.state.inputData.citydate}
                onChange={(event) => this.inputChangedHandler(event, "citydate")}/>
            <input 
                className="itineraryinput" 
                type="date" 
                placeholder="Dates" 
                value={this.state.inputData.cityenddate}
                onChange={(event) => this.inputChangedHandler(event, "cityenddate")}/>

            <h3 onClick={() => this.saveNew("city")} className="itinerarysave">SAVE</h3>
        </div>
    );

    if (this.props.type === "transit") {
        newForm = (
            <div className={this.props.className}>

                <div className="itinerarymodaltop">
                    <h2 className="itinerarymodalheader">New Transit</h2>
                    <b onClick={this.resetData} className="itinerarymodalexit">X</b>
                </div>
                

                <input 
                    className="itineraryinput" 
                    type="text" 
                    placeholder="Method (Flight, train, etc)" 
                    value={this.state.inputData.transitmethod}
                    onChange={(event) => this.inputChangedHandler(event, "transitmethod")}/>
                <input 
                    className="itineraryinput" 
                    type="text" 
                    placeholder="From"
                    value={this.state.inputData.transitfrom}
                    onChange={(event) => this.inputChangedHandler(event, "transitfrom")}/>
                <input 
                    className="itineraryinput" 
                    type="text" 
                    placeholder="To"
                    value={this.state.inputData.transitto}
                    onChange={(event) => this.inputChangedHandler(event, "transitto")}/>
                <input 
                    className="itineraryinput" 
                    type="date" 
                    placeholder="Date"
                    value={this.state.inputData.transitdate}
                    onChange={(event) => this.inputChangedHandler(event, "transitdate")}/>
                <input 
                    className="itineraryinput" 
                    type="text" 
                    placeholder="Time"
                    value={this.state.inputData.transittime}
                    onChange={(event) => this.inputChangedHandler(event, "transittime")}/>
                <input 
                    className="itineraryinput" 
                    type="text" 
                    placeholder="Price"
                    value={this.state.inputData.transitprice}
                    onChange={(event) => this.inputChangedHandler(event, "transitprice")}/>
                

                <h3 onClick={() => this.saveNew("transit")} className="itinerarysave">SAVE</h3>

            </div>
        )
    };

    return (
        <div>
            {newForm}
        </div>
        
    );
    }
}

const mapStateToProps = state => {
    return {
        newInputData: state.itinerary.newInputData,
        cities: state.itinerary.cities,
        transit: state.itinerary.transit
    }
    
}

const mapDispatchToProps = dispatch => {
    return {
        onSaveNewCity: (cityData) => dispatch(actions.saveNewCity(cityData)),
        onSaveNewTransit: (transitData) => dispatch(actions.saveNewTransit(transitData)),
        onFetchCities: () => dispatch(actions.fetchCities()),
        onFetchTransits: () => dispatch(actions.fetchTransits())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(newModal);