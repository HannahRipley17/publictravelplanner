import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import EditEvent from '../EditEvent/EditEvent';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';

class Transit extends Component {
    state = {
        editMode: false
    }

    openEditMode = () => {
        this.setState({editMode: true})
    }
    closeEditMode = () => {
        this.setState({editMode: false})
    }

    deleteTransit = () => {
        console.log("called delete transit", this.props.id);
        this.props.onDeleteTransit(this.props.id).promise.then(response => {
            this.props.onFetchTransits();
            this.props.onFetchCities();
        });
    };

    render() {

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const date = new Date(this.props.date);
        const dateMonth = months[date.getMonth()];
        const dateDay = date.getDate();

        return(
            <div>
                <div>

                    <div className="ItineraryEventTop">
                        <h2 className="ItineraryEventName">{this.props.method}</h2>
                        <h4 className="ItineraryTransitFromTo">{this.props.from} - {this.props.to}</h4>
                        <FontAwesomeIcon icon={faEdit} onClick={this.openEditMode} color="#213657"/>
                    </div>
                        <h4 className="ItineraryEventHeaderInfo"> {dateMonth} {dateDay}  -  {this.props.time} | ${this.props.price}</h4>
                                
                </div>
                <EditEvent 
                    id={this.props.id}
                    type="transit"
                    method={this.props.method}
                    from={this.props.from}
                    to={this.props.to}
                    date={this.props.date}
                    time={this.props.time}
                    price={this.props.price}
                    editMode={this.state.editMode}
                    closeEditMode={this.closeEditMode}
                    deleteTransit={this.deleteTransit}
                />
            </div>
        );
    }
    
};

const mapStateToProps = state => {
    return {
        transits: state.itinerary.transit
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onDeleteTransit: (id) => dispatch(actions.deleteTransit(id)),
        onFetchTransits: () => dispatch(actions.fetchTransits()),
        onFetchCities: () => dispatch(actions.fetchCities())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Transit);