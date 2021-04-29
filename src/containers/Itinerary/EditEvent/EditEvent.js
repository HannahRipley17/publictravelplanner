import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../Itinerary.css';
import * as actions from '../../../store/actions/index';

import AddButton from '../../../components/UI/AddButton/AddButton';
import CheckModal from '../../../components/UI/Check/checkModal';

import moment from 'moment';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';


// TODO
// clear empty todos mostly working? seems to be skipping some


class EditEvent extends Component {
    state = {
        cityInputData: {
            type: 'city',
            citytitle: '',
            citydate: '',
            cityenddate: '',
            cityhotels: '',
            cityfood: '',
            cityptrans: '',
            citytickets: '',
            citymisc: '',
            thingstodo: [],
            citynotes: ''
        },
        transitInputData: {
            type: 'transit',
            transitfrom: '',
            transitto: '',
            transitdate: {},
            transittime: '',
            transitmethod: '',
            transitprice: 0
        },
        editMode: null,
        rerender: true,
        checkModal: false,
        idToDelete: '',
        markedForDeletion: false
    }

    componentDidMount () {
        this.resetData();
    }; 

    resetData = () => {
        if (this.props.type === "city") {
            let newcityInputData = {}
            newcityInputData.cityTitle= this.props.cityTitle
            newcityInputData.citydate= this.props.startDate;
            newcityInputData.cityenddate= this.props.endDate;
            newcityInputData.cityhotels= this.props.hotels;
            newcityInputData.cityfood= this.props.food;
            newcityInputData.cityptrans= this.props.ptrans;
            newcityInputData.citytickets= this.props.tickets;
            newcityInputData.citymisc= this.props.misc;
            newcityInputData.thingstodo = this.props.thingstodo;
            newcityInputData.citynotes= this.props.notes;
            this.setState({cityInputData: newcityInputData});

        } else if (this.props.type === "transit") {
            let newtransitInputData = {}
            newtransitInputData.transitfrom= this.props.from;
            newtransitInputData.transitto= this.props.to;
            newtransitInputData.transitdate= this.props.date;
            newtransitInputData.transittime= this.props.time;
            newtransitInputData.transitmethod=this.props.method;
            newtransitInputData.transitprice=this.props.price;

            this.setState({transitInputData: newtransitInputData})
        }
        this.setState({editMode: this.props.editMode});
        this.setState({copycityInputData: this.state.cityInputData, copytransitInputData: this.state.transitInputData});
    };

    openCheckModal = () => {
        this.setState({checkModal: true});
    };
    closeCheckModal = () => {
        this.setState({checkModal: false});
    };


    inputCityChangedHandler = (event, inputId) => {
        let updatedInputData = {...this.state.cityInputData}

        let updatedInputElement = { ...updatedInputData[inputId]};

        updatedInputElement = event.target.value;

        updatedInputData[inputId] = updatedInputElement;

        this.setState({cityInputData: updatedInputData});
    };
    inputTransitChangedHandler = (event, inputId) => {
        let updatedInputData = {...this.state.transitInputData}

        let updatedInputElement = { ...updatedInputData[inputId]};

        updatedInputElement = event.target.value;

        updatedInputData[inputId] = updatedInputElement;

        this.setState({transitInputData: updatedInputData});
    };
    inputThingsChangedHandler = (event, inputId, titleorcost) => {
        let newcityInputData = {...this.state.cityInputData};
        let updatedInputData = [...this.state.cityInputData.thingstodo];

        let updatedInputObject = { ...updatedInputData[inputId]};

        if (titleorcost === "title") {
            let updatedInputObjectKey = updatedInputObject.title;
            updatedInputObjectKey = event.target.value;
            updatedInputObject.title = updatedInputObjectKey;
        } else if (titleorcost === "cost") {
            let updatedInputObjectKey = updatedInputObject.cost;
            updatedInputObjectKey = event.target.value;
            updatedInputObject.cost = updatedInputObjectKey;
        }
        
        updatedInputData[inputId] = updatedInputObject;

        newcityInputData.thingstodo = updatedInputData;

        this.setState({cityInputData: newcityInputData});
    };

    
    saveEdited = (type) => {
        if (type === "city") {
            for (const city in this.props.cities) {
                if (this.props.cities[city].id === this.props.id){
                    let cityData = {};
                    cityData.index = city;
                    cityData.type = "city";
                    let title = this.state.cityInputData.cityTitle;
                    if (this.state.cityInputData.cityTitle === "" || this.state.cityInputData.cityTitle === " ") {
                        title = "Untitled"
                    };
                    cityData.title = title;
                    cityData.date = this.formatDate(this.state.cityInputData.citydate);
                    cityData.endDate = this.formatDate(this.state.cityInputData.cityenddate);
                    cityData.cost = {};
                    cityData.cost.hotels = (this.state.cityInputData.cityhotels !== '' ? this.state.cityInputData.cityhotels : '0');
                    cityData.cost.food = (this.state.cityInputData.cityfood !== '' ? this.state.cityInputData.cityfood : '0');
                    cityData.cost.ptrans = (this.state.cityInputData.cityptrans !== '' ? this.state.cityInputData.cityptrans : '0');
                    cityData.cost.tickets = (this.state.cityInputData.citytickets !== '' ? this.state.cityInputData.citytickets : '0');;
                    cityData.cost.misc = (this.state.cityInputData.citymisc !== '' ? this.state.cityInputData.citymisc : '0');;
                    this.clearEmptyToDos();
                    if (this.state.cityInputData.thingstodo === []) {
                        cityData.thingstodo = [{title: '', cost: 0}]
                    } else {
                        cityData.thingstodo = this.state.cityInputData.thingstodo;
                    }
                    cityData.notes = (this.state.cityInputData.citynotes);

                    this.props.onUpdateCity(cityData, this.props.id).promise.then(response => {
                        this.props.onFetchTransits();
                        this.props.onFetchCities();
                    });
                }
            }
            
        }
        if (type === "transit") {
            for (const thetransit in this.props.transit) {
                if (this.props.transit[thetransit].id === this.props.id) {
                    let transitData = {};
                    transitData.index = thetransit;
                    transitData.type="transit";
                    transitData.method = (this.state.transitInputData.transitmethod);
                    transitData.date = moment(this.state.transitInputData.transitdate).format().toString();
                    transitData.from = (this.state.transitInputData.transitfrom);
                    transitData.to = (this.state.transitInputData.transitto);
                    transitData.time = (this.state.transitInputData.transittime);
                    transitData.price = (this.state.transitInputData.transitprice);

                    this.props.onUpdateTransit(transitData, this.props.id).promise.then(response => {
                        this.props.onFetchTransits();
                        this.props.onFetchCities();
                    });
                    
                }
            }
        };
        {this.props.closeEditMode()}

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
    //     let testdate = moment(date);
    //     let newDate = new Date(date);
    //     const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    //     //const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //     //let day = days[newDate.getDay()];
    //     let month = months[newDate.getMonth()];
    //     let thedate = newDate.getDate() + 1;

    //     let stringDate = month + " " + thedate;
    //     return stringDate;
    // };

    clearEmptyToDos = () => {
        let newcityInputData = {...this.state.cityInputData};
        for (const i in this.state.cityInputData.thingstodo) {
            if (!this.state.cityInputData.thingstodo[i].title && !this.state.cityInputData.thingstodo[i].cost == "") {
                console.log("this object empty, YEET");
                newcityInputData.thingstodo.splice(i, 1);
            } 
        };
        this.setState({cityInputData: newcityInputData});
        this.setState({test: false});
    };

    preDelete = (id) => {
        this.setState({idToDelete: id});
        this.openCheckModal();
    }

    deleteThing = (id) => {
        let newCityInputData = {...this.state.cityInputData};
        let newThings = [...newCityInputData.thingstodo];
        newThings.splice(id, 1);
        newCityInputData.thingstodo = newThings;
        this.setState({cityInputData: newCityInputData});
    };

    mapEvents = (thing, id) => {
        let thingsEdit = (
            <div className="itinerarythingtitleandcost" key={id}>
                <input 
                    type="text"
                    value={thing.title} className="itinerarythingtitleinput"
                    placeholder="Thing"
                    onChange={(event) => this.inputThingsChangedHandler(event, id, "title")}/>
                <input 
                    type="text"
                    value={thing.cost} className="itinerarythingcostinput"
                    placeholder="$"
                    onChange={(event) => this.inputThingsChangedHandler(event, id, "cost")}/>
                <FontAwesomeIcon icon={faTrash} color="#213657" onClick={() => {this.deleteThing(id)}} style={{marginTop: '10px', marginLeft: '5px'}}/>
            </div>
            
        );
        return thingsEdit;
    };
    
    render() {
        
    
        let thingsEditList = (
            <div>
                {this.state.cityInputData.thingstodo.map((thing, id) =>
                    this.mapEvents(thing, id)
                )}
            </div>
        );

        const addThing = () => {
            this.state.cityInputData.thingstodo.push({});
            thingsEditList = (
            <div>
                {this.state.cityInputData.thingstodo.map((thing, id) =>
                    this.mapEvents(thing, id)
                    )}
                </div>
            );
            this.setState({rerender: !this.state.rerender}); // this is a total hack 

            {this.props.openEditMode()}
        }
        
        
        let editForm = null;
        if (this.props.type === "city") {
            editForm = (
                <div>
                    <div className="itineraryeditlabelandinput">
                        <label className="itineraryeditlabel">City</label>
                        <input 
                            className="itineraryeditinput" 
                            type="text" 
                            value={this.state.cityInputData.cityTitle}
                            onChange={(event) => this.inputCityChangedHandler(event, "cityTitle")}/>
                            <br></br>
                    </div>
                    
                    <div className="itineraryeditlabelandinput">
                        <label className="itineraryeditlabel">Start</label>
                        <input 
                            className="itineraryeditinput" 
                            type="date" 
                            value={this.state.cityInputData.citydate} 
                            onChange={(event) => this.inputCityChangedHandler(event, "citydate")}/>
                            <br></br>
                    </div>

                    <div className="itineraryeditlabelandinput">
                        <label className="itineraryeditlabel">Leave</label>
                        <input 
                            className="itineraryeditinput" 
                            type="date" 
                            value={this.state.cityInputData.cityenddate}
                            onChange={(event) => this.inputCityChangedHandler(event, "cityenddate")}/>
                            <br></br>
                    </div>

                    <h3>Costs Per Day</h3>
                    <div className="itineraryeditlabelandinput">
                        <label className="itineraryeditlabel">Hotels</label>
                        <input 
                            className="itineraryeditinput" 
                            type="text" 
                            value={this.state.cityInputData.cityhotels}
                            onChange={(event) => this.inputCityChangedHandler(event, "cityhotels")}/>
                            <br></br>
                    </div>

                    <div className="itineraryeditlabelandinput">
                        <label className="itineraryeditlabel">Food</label>
                        <input 
                            className="itineraryeditinput" 
                            type="text" 
                            value={this.state.cityInputData.cityfood} 
                            onChange={(event) => this.inputCityChangedHandler(event, "cityfood")}/>
                            <br></br>
                    </div>

                    <div className="itineraryeditlabelandinput">
                        <label className="itineraryeditlabel">Trans.</label>
                        <input 
                            className="itineraryeditinput" 
                            type="text" 
                            value={this.state.cityInputData.cityptrans}
                            onChange={(event) => this.inputCityChangedHandler(event, "cityptrans")}/>
                        <br></br>
                    </div>

                    <div className="itineraryeditlabelandinput">
                        <label className="itineraryeditlabel">Tickets</label>
                        <input 
                            className="itineraryeditinput" 
                            type="text" 
                            value={this.state.cityInputData.citytickets} 
                            onChange={(event) => this.inputCityChangedHandler(event, "citytickets")}/>
                        <br></br>
                    </div>

                    <div className="itineraryeditlabelandinput">
                        <label className="itineraryeditlabel">Misc.</label>
                        <input 
                            className="itineraryeditinput" 
                            type="text" 
                            value={this.state.cityInputData.citymisc}
                            onChange={(event) => this.inputCityChangedHandler(event, "citymisc")}/>
                            <br></br>
                    </div>

                    <h3>Things to do</h3>
                    {thingsEditList}
                    <AddButton clicked={addThing} label="Add Thing To Do"/>

                    <h3>Notes</h3>
                    <textarea className="ItineraryEditNote"
                        value={this.state.cityInputData.citynotes}
                        onChange={(event) => this.inputCityChangedHandler(event, "citynotes")}/>

                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <p className="delete" onClick={this.openCheckModal}>Delete City</p>
                        <h3 onClick={() => this.saveEdited("city")} className="save">SAVE</h3>
                    </div>
                </div>
            );
        } else if (this.props.type === "transit") {
            editForm = (
                <div className={this.props.className}>
                    <div className="itineraryeditlabelandinput">
                        <label className="itineraryeditlabel">Mode</label>
                        <input 
                            className="itineraryeditinput" 
                            type="text" 
                            value={this.state.transitInputData.transitmethod}
                            onChange={(event) => this.inputTransitChangedHandler(event, "transitmethod")}/>
                    </div>
                    <div className="itineraryeditlabelandinput">
                        <label className="itineraryeditlabel">From</label>
                        <input 
                            className="itineraryeditinput" 
                            type="text" 
                            value={this.state.transitInputData.transitfrom}
                            onChange={(event) => this.inputTransitChangedHandler(event, "transitfrom")}/>
                    </div>
                    <div className="itineraryeditlabelandinput">
                        <label className="itineraryeditlabel">To</label>
                        <input 
                            className="itineraryeditinput" 
                            type="text" 
                            value={this.state.transitInputData.transitto}
                            onChange={(event) => this.inputTransitChangedHandler(event, "transitto")}/>
                    </div>
                    <div className="itineraryeditlabelandinput">
                        <label className="itineraryeditlabel">Date</label>
                        <input 
                            className="itineraryeditinput" 
                            type="date" 
                            value={this.state.transitInputData.transitdate}
                            onChange={(event) => this.inputTransitChangedHandler(event, "transitdate")}/>
                    </div>
                    <div className="itineraryeditlabelandinput">
                        <label className="itineraryeditlabel">Time</label>
                        <input 
                            className="itineraryeditinput" 
                            type="text" 
                            value={this.state.transitInputData.transittime}
                            onChange={(event) => this.inputTransitChangedHandler(event, "transittime")}/>
                    </div>
                    <div className="itineraryeditlabelandinput">
                        <label className="itineraryeditlabel">Price</label>
                        <input 
                            className="itineraryeditinput" 
                            type="text" 
                            value={this.state.transitInputData.transitprice}
                            onChange={(event) => this.inputTransitChangedHandler(event, "transitprice")}/>
                    </div>
                    <h3  onClick={() => this.saveEdited("transit")} className="save">SAVE</h3>
                    <p className="delete" onClick={this.openCheckModal}>Delete Transit</p>

                
                </div>
            )
        }



        const cancelEdit = () => {
            // it's re-rendering every time, what I actually need to do is reset the state but resetData() doesn't do anything. 
            // tried re-rendering City but turns out it was already doing that but it didn't do anything
            this.clearEmptyToDos();
            this.resetData();
            {this.props.closeEditMode()};
            //{this.props.render()};
            this.setState({rerender: !this.state.rerender});
        }
        

        return (
            <div className={this.props.editMode ? "showItineraryEdit" : "displayNone"}>
                <p onClick={cancelEdit}>Cancel</p>
                {editForm}
            {this.state.checkModal ? 
                <CheckModal 
                    cancel={this.closeCheckModal}
                    delete={this.props.type === "city" ? this.props.deleteCity : this.props.deleteTransit}
                />
                : null }
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
        onUpdateCity: (cityData, id) => dispatch(actions.updateCity(cityData, id)),
        onUpdateTransit: (transitData, id) => dispatch(actions.updateTransit(transitData, id)),
        onFetchCities: () => dispatch(actions.fetchCities()),
        onFetchTransits: () => dispatch(actions.fetchTransits()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditEvent);