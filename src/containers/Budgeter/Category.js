import React, {Component} from 'react';
import { connect } from 'react-redux';
import './Budgeter.css';
import * as actions from '../../store/actions/index';

import CategoryItems from './CategoryItems/CategoryItems';
import AddSpent from './AddSpent';
import EditSpent from './CategoryItems/EditSpent';
import AddButton from '../../components/UI/AddButton/AddButton';


import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {faCaretDown} from '@fortawesome/free-solid-svg-icons';



class Category extends Component {
    state = {
        label: '',
        cost: '',
        budgetedcost: 0,
        totalCost: 0,
        inBudget: true,
        update: true,
        bodyOpen: false,
        addModalOpen: false,
        editMode: false,
        error: false,
    }

    componentDidMount () {
        this.props.onFetchSpents("Flights");
        this.props.onFetchSpents("Hotels");
        this.props.onFetchSpents("Food");
        this.props.onFetchSpents("Public Trans.");
        this.props.onFetchSpents("Tickets");
        this.props.onFetchSpents("Misc.");
        setTimeout(() => { 
            this.addCosts(); 
        }, 300); 
    };
    inputLabelChangedHandler = (event) => {
        let newLabel = this.state.label;
        newLabel = event.target.value;
        this.setState({label: newLabel});
    };

    inputCostChangedHandler = (event) => {
        let newcost = this.state.cost;
        newcost = event.target.value;
        this.setState({cost: newcost});
    };

    saveNewSpent = () => {
        let spentData = {};
        spentData["label"] = this.state.label;
        spentData["cost"] = this.state.cost;
        if (spentData.cost !== '' || spentData.cost !== '') {
            spentData["category"] = this.props.category;
            console.log(this.props.category);
            this.props.onAddSpent(spentData).promise.then(response => {
                this.props.onFetchSpents(this.props.category);
            });
            this.setState({update: !this.state.update, addModalOpen: false, error: false});
        } else {
            this.setState({error: true});
        };

        setTimeout(() => { this.addCosts(); }, 50);

    };

    addCosts = () => {
        console.log("category.js addCosts");
        let newtotalCost = 0;

        if (this.props.category === "Flights") {
            for (let flight in this.props.flights) {
                newtotalCost += parseInt(this.props.flights[flight].cost);
            }
        };
        if (this.props.category === "Hotels") {
            for (let hotel in this.props.hotels) {
                newtotalCost += parseInt(this.props.hotels[hotel].cost);
            }
        };
        if (this.props.category === "Food") {
            for (let item in this.props.food) {
                newtotalCost += parseInt(this.props.food[item].cost);
            }
        };
        if (this.props.category === "Public Trans.") {
            for (let tran in this.props.ptrans) {
                newtotalCost += parseInt(this.props.ptrans[tran].cost);
            }
        };
        if (this.props.category === "Tickets") {
            for (let ticket in this.props.tickets) {
                newtotalCost += parseInt(this.props.tickets[ticket].cost);
            }
        };
        if (this.props.category === "Misc.") {
            for (let item in this.props.misc) {
                newtotalCost += parseInt(this.props.misc[item].cost);
            }
        };
        
        this.setState({totalCost: newtotalCost});

        setTimeout(() => { this.props.addCosts(); }, 50);
        // this.forceUpdate();
    };


    openAddModal = () => {
        this.setState({addModalOpen: true});
    };
    closeAddModal = () => {
        this.setState({addModalOpen: false});
    };
    openEditMode = () => {
        console.log("openEditMode");
        this.setState({editMode: true, bodyOpen: false});
    };
    closeEditMode = () => {
        this.setState({editMode: false, bodyOpen: true});
    };
    toggleOpenBody = () => {
        this.setState({bodyOpen: !this.state.bodyOpen});

    }


    render() {
        let editSpent = null;
        if (this.state.editMode) {
            editSpent = (
                <EditSpent 
                    closeEditMode={this.closeEditMode}
                    category={this.props.category}
                    addCosts={this.addCosts}/>
            )
        };

        let addSpent = null;
        if (this.state.addModalOpen) {
            addSpent = (
                <AddSpent 
                    updateLabel={this.inputLabelChangedHandler} 
                    updateCost={this.inputCostChangedHandler}
                    save={this.saveNewSpent}
                    openAddModal={this.openAddModal}
                    addModalOpen={this.state.addModalOpen}
                    error={this.state.error}
                />
            )
        };

        
        return(
            <div>
                <div>
                    <h4 className="BudgeterCategoryHeader" onClick={this.toggleOpenBody}>{this.props.category} - ${this.props.budgetedcost} <FontAwesomeIcon icon={faCaretDown} color="#213657" /></h4>
                </div>
                
                <div className={this.state.bodyOpen ? "BudgeterCategoryBody" : "displayNone"}>
                    <FontAwesomeIcon icon={faEdit} onClick={this.openEditMode} color="#213657"/>
                    <CategoryItems 
                        categoryLabel={this.props.category} 
                    />
                    <AddButton clicked={this.openAddModal}/>
                    {addSpent}
                </div>
                <div className={this.state.editMode ? "showBudgeterEdit" : "displayNone"}>
                    {/* <EditSpent 
                    closeEditMode={this.closeEditMode}
                    category={this.props.category}
                    addCosts={this.addCosts}/> */}
                    {editSpent}
                </div>
                
                <h3 className="BudgeterCategoryTotalSpent">Total Spent - <span className={this.state.totalCost > this.props.budgetedcost ? "colorRed" : "SpentCostInBudget"}>${this.state.totalCost}</span></h3>
                {/* <h3 className="BudgeterCategoryTotalSpent">Total Spent - <span className={this.state.inBudget ? "SpentCostInBudget" : "colorRed"}>${this.state.totalCost}</span></h3> */}
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
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchCities: () => dispatch(actions.fetchCities()),
        onFetchTransits: () => dispatch(actions.fetchTransits()),
        onFetchSpents: (category) => dispatch(actions.fetchSpents(category)),
        onAddSpent: (spentData) => dispatch(actions.addNewSpent(spentData))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);