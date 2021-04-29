import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

import CheckModal from '../../../components/UI/Check/checkModal';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';

class EditSpent extends Component {

    state = {
        flights: [],
        hotels: [],
        food: [],
        ptrans: [],
        tickets: [],
        misc: [],
        list: [],
        editedId: '',
        checkModal: false,
        idToDelete: null,
        changed: false
    }

    // todo

    // get the value in the input tags working

    componentDidMount () {
        let newflights = [...this.props.flights];
        let newhotels = [...this.props.hotels];
        let newfood = [...this.props.food];
        let newtickets = [...this.props.tickets];
        let newptrans = [...this.props.ptrans];
        let newmisc = [...this.props.misc];
        this.setState({flights: newflights, hotels: newhotels, food: newfood, ptrans: newptrans, tickets: newtickets, misc: newmisc,});
    };

    openCheckModal = () => {
        this.setState({checkModal: true});
    };
    closeCheckModal = () => {
        this.setState({checkModal: false});
    };

    inputSpentsChangedHandler = (event, spentId, inputId, labelorcost) => {
        console.log(spentId);
        let newInputData = null;
        if (this.props.category === "Flights") {
            newInputData = [...this.state.flights];
        } else if (this.props.category === "Hotels") {
            newInputData = [...this.state.hotels];
        } else if (this.props.category === "Food") {
            newInputData = [...this.state.food];
        } else if (this.props.category === "Public Trans.") {
            newInputData = [...this.state.ptrans];
        } else if (this.props.category === "Tickets") {
            newInputData = [...this.state.tickets];
        } else if (this.props.category === "Misc.") {
            newInputData = [...this.state.misc];
        }

        console.log(newInputData);

        let updatedInputObject = newInputData[inputId]
        console.log(updatedInputObject);

        // let neweditedLabel = this.state.editedLabel;
        // let neweditedCost = this.state.editedCost;
        if (labelorcost === "label") {
            let updatedInputObjectKey = updatedInputObject.label;
            updatedInputObjectKey = event.target.value;
            updatedInputObject.label = updatedInputObjectKey;
            //neweditedLabel = event.target.value;
            //console.log(neweditedLabel);

        } else if (labelorcost === "cost") {
            let updatedInputObjectKey = updatedInputObject.cost;
            updatedInputObjectKey = parseInt(event.target.value);
            updatedInputObject.cost = updatedInputObjectKey;

            // neweditedCost = event.target.value;
            // console.log(neweditedCost);
        }
        
        newInputData[inputId] = updatedInputObject;

        if (this.props.category === "Flights") {
            this.setState({flights: newInputData, editedId: spentId});
        } else if (this.props.category === "Hotels") {
            this.setState({hotels: newInputData, editedId: spentId});
        } else if (this.props.category === "Food") {
            this.setState({food: newInputData, editedId: spentId});
        } else if (this.props.category === "Public Trans.") {
            this.setState({ptrans: newInputData, editedId: spentId});
        } else if (this.props.category === "Tickets") {
            this.setState({tickets: newInputData, editedId: spentId});
        } else if (this.props.category === "Misc.") {
            this.setState({misc: newInputData, editedId: spentId});
        }
        this.setState({changed: true});
        
    };

    saveEdited = () => {
        let spentData = null;
        if (this.props.category === "Flights") {
            spentData = this.state.flights.filter(flight => flight.id === this.state.editedId);
            spentData = spentData[0];
        } else if (this.props.category === "Hotels") {
            spentData = this.state.hotels.filter(hotel => hotel.id === this.state.editedId);
            spentData = spentData[0];
        } else if (this.props.category === "Food") {
            spentData = this.state.food.filter(morsel => morsel.id === this.state.editedId);
            spentData = spentData[0];
        } else if (this.props.category === "Public Trans.") {
            spentData = this.state.ptrans.filter(tran => tran.id === this.state.editedId);
            spentData = spentData[0];
        } else if (this.props.category === "Tickets") {
            spentData = this.state.tickets.filter(ticket => ticket.id === this.state.editedId);
            spentData = spentData[0];
        } else if (this.props.category === "Misc.") {
            spentData = this.state.misc.filter(item => item.id === this.state.editedId);
            spentData = spentData[0];
        };

        console.log(spentData);

        if (this.state.changed === true) {
            this.props.onEditSpent(spentData, this.props.category).promise.then(response => {
                this.props.onFetchSpents(this.props.category);
                this.props.addCosts(); 
                this.props.closeEditMode();
            });
        } else {
            this.props.addCosts(); 
            this.props.closeEditMode();
        }
    };

    preDelete = (id) => {
        this.setState({idToDelete: id});
        this.openCheckModal();
    }

    deleteSpent = () => {
        console.log(this.props.category, this.state.idToDelete);
        this.props.onDeleteSpent(this.state.idToDelete, this.props.category).promise.then(response => {
            this.props.onFetchSpents(this.props.category);
            setTimeout(() => { this.props.addCosts(); }, 100);
            this.props.closeEditMode();
        });
    };

    render() {        
        // something in here is getting the id messed up when it sends it to action and reducer, changing ID from response.data.name to the index
        const mapSpents = (spent, index) => {
            //console.log(spent);
            let spentEdit = (
                <div className="itinerarythingtitleandcost" key={spent.id}>
                    <input 
                        type="text"
                        value={spent.label} className="itinerarythingtitleinput"
                        onChange={(event) => this.inputSpentsChangedHandler(event, spent.id, index, "label")}
                        />
                    <input 
                        type="text"
                        value={spent.cost} className="itinerarythingcostinput"
                        onChange={(event) => this.inputSpentsChangedHandler(event, spent.id, index, "cost")}
                        />
                    <FontAwesomeIcon icon={faTrash} color="#213657" onClick={() => this.preDelete(spent.id)}/>
                </div>
                
            );
            return spentEdit;
        };
    
        let flights = [...this.state.flights];
        let flightsSpentEditList = (
            <div>
                {flights.map((spent, index) =>
                    mapSpents(spent, index)
                )}
            </div>
        );

        let hotels = [...this.state.hotels];
        let hotelsSpentEditList = (
            <div>
                {hotels.map((spent, index) =>
                    mapSpents(spent, index)
                )}
            </div>
        );

        let food = [...this.state.food];
        let foodSpentEditList = (
            <div>
                {food.map((spent, index) =>
                    mapSpents(spent, index)
                )}
            </div>
        );

        let ptrans = [...this.state.ptrans];
        let ptransSpentEditList = (
            <div>
                {ptrans.map((spent, index) =>
                    mapSpents(spent, index)
                )}
            </div>
        );

        let tickets = [...this.state.tickets];
        let ticketsSpentEditList = (
            <div>
                {tickets.map((spent, index) =>
                    mapSpents(spent, index)
                )}
            </div>
        );

        let misc = [...this.state.misc];
        let miscSpentEditList = (
            <div>
                {misc.map((spent, index) =>
                    mapSpents(spent, index)
                )}
            </div>
        );

        let editform = null;
        if (this.props.category === "Flights") {
            editform = flightsSpentEditList;
        } else if (this.props.category === "Hotels") {
            editform = hotelsSpentEditList;
        } else if (this.props.category === "Food") {
            editform = foodSpentEditList;
        } else if (this.props.category === "Public Trans.") {
            editform = ptransSpentEditList;
        } else if (this.props.category === "Tickets") {
            editform = ticketsSpentEditList;
        } else if (this.props.category === "Misc.") {
            editform = miscSpentEditList;
        }


        // when i hit save it send all of the spents in that category instead of just the one we edited
        return (
            <div >
                {editform}
                <h3 onClick={() => this.saveEdited()} className="save">SAVE</h3>
                {this.state.checkModal ? 
                <CheckModal 
                    cancel={this.closeCheckModal}
                    delete={this.deleteSpent}
                />
                : null }
            </div>
        );
    }
};



const mapStateToProps = state => {
    return {
        flights: state.budgeter.flights,
        hotels: state.budgeter.hotels,
        food: state.budgeter.food,
        ptrans: state.budgeter.ptrans,
        tickets: state.budgeter.tickets,
        misc: state.budgeter.misc,
    }
    
}

const mapDispatchToProps = dispatch => {
    return {
        onEditSpent: (data, category) => dispatch(actions.editSpent(data, category)),
        onDeleteSpent: (id, category) => dispatch(actions.deleteSpent(id, category)),
        onFetchSpents: (category) => dispatch(actions.fetchSpents(category)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSpent);