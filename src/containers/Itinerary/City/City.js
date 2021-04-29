import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';

import moment from 'moment';
import '../Itinerary.css';

import CityCost from './CityCost';
import CityThings from './CityThings';
import CityNote from './CityNote';

import EditEvent from '../EditEvent/EditEvent';

class City extends Component {
    state = {
        editMode: false,
        costsDiv: false,
        eventDiv: false,
        render: true,
    }

    openEditMode = () => {
        this.setState({editMode: true, eventDiv: false})
    }
    closeEditMode = () => {
        this.setState({editMode: false, eventDiv: true})
    }

    toggleExpandCosts = () => {
        this.setState({ costsDiv: !this.state.costsDiv })
    }
    toggleExpandEvent = () => {
        this.setState({ eventDiv: !this.state.eventDiv })
    }

    deleteCity = () => {
        this.props.onDeleteCity(this.props.id).promise.then(response => {
            this.props.onFetchTransits();
            this.props.onFetchCities();
        });
    };

    
    render () {        
        const addCostTotal = parseInt(this.props.hotels) + parseInt(this.props.food) + parseInt(this.props.ptrans) + parseInt(this.props.tickets) + parseInt(this.props.misc);
        


        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const startDate = new Date(this.props.startdate);
        const endDate = new Date(this.props.enddate);

        const startMonth = months[startDate.getMonth()];
        const startDay = startDate.getDate();

        const endMonth = months[endDate.getMonth()];
        const endDay = endDate.getDate();

        const numDates = Math.floor((endDate - startDate) / (1000*60*60*24))+1;
        
        let avgperday = Math.floor(addCostTotal / numDates);

        let body = (
            <div className={this.state.eventDiv ? "ItineraryEventBody" : "displayNone"}>
                <h3 className="ItineraryEventDetailsHeader" onClick={this.toggleExpandCosts}>{numDates} Days - ${addCostTotal} <FontAwesomeIcon icon={faCaretDown} color="#213657" /></h3>
                <h5 className="ItineraryEventDetailsHeaderAvg"> Avg. ${avgperday}/day</h5>
                <div className={this.state.costsDiv ? "costsExpanded" : "displayNone" }>
                    <p>Hotels: <b>${this.props.hotels}</b></p>
                    <p>Food: <b>${this.props.food}</b></p>
                    <p>Transportation: <b>${this.props.ptrans}</b></p>
                    <p>Tickets: <b>${this.props.tickets}</b></p>
                    <p>Misc: <b>${this.props.misc}</b></p>
                </div>

                <h3 className="ItineraryEventDetailsHeader">Things</h3>
                <CityThings id={this.props.id} key={this.props.id}/>

                <h3 className="ItineraryEventDetailsHeader">Notes</h3>
                <CityNote className="ItineraryNote" note={this.props.notes} itinerary/>
               
                
            </div>
        );

        return(
            <div>
                <div>
                    <div>
                        <h2 className="ItineraryEventName" onClick={this.toggleExpandEvent}>{this.props.cityTitle} <FontAwesomeIcon icon={faCaretDown} color="#213657" /> </h2>
                        <FontAwesomeIcon icon={faEdit} onClick={this.openEditMode} color="#213657"/>
                        <p className="ItineraryEventHeaderInfo">{startMonth} {startDay} - {endMonth} {endDay}</p>
                        {/* <p>{this.props.id}</p> */}
                    </div>
                    <div>
                        {body}
                    </div>
                            
                    
                </div>
                <EditEvent 
                    type="city"
                    id={this.props.id}
                    cityTitle={this.props.cityTitle}
                    startDate={this.props.startdate}
                    endDate={this.props.enddate}
                    hotels={this.props.hotels}
                    food={this.props.food}
                    ptrans={this.props.ptrans}
                    tickets={this.props.tickets}
                    misc={this.props.misc}
                    notes={this.props.notes}
                    thingstodo={this.props.thingstodo}
                    editMode={this.state.editMode}
                    closeEditMode={this.closeEditMode}
                    openEditMode={this.openEditMode}
                    deleteCity={this.deleteCity}
                />

            </div>
        );

    
    };
}

const mapStateToProps = state => {
    return {
        cities: state.itinerary.cities
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onDeleteCity: (id) => dispatch(actions.deleteCity(id)),
        onDeleteTransit: (id) => dispatch(actions.deleteTransit(id)),
        onFetchCities: () => dispatch(actions.fetchCities()),
        onFetchTransits: () => dispatch(actions.fetchTransits())


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(City);