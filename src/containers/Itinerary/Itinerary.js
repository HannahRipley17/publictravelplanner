import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Itinerary.css';
import * as actions from '../../store/actions/index';


import TopButton from '../../components/UI/Button/TopButton';
import City from './City/City';
import Transit from './Transit/Transit';
import NewModal from './newModal/newModal';


// TODO LIST
 
// delete things to do thing

// dates are a day off -_- but randomly and inconsistently
// transit time not updating?????
// edit dates showing mm/dd/yy
// calendar?

class Itinerary extends Component {
    state = {
        cityModalUp: false,
        transitModalUp: false,
        numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9 ],
        isCity: true,
        tripCostTotal: 0 // get from reducer
    }
    componentDidMount() {
        this.props.onFetchCities();
        this.props.onFetchTransits();
        // it does seem to be successfully getting the -M18fsow9rfwo93 type ids from the database but it only registers on rerender which is fun
    }

    putCityModalUp = () => {
        this.putModalsDown();
        this.setState( { cityModalUp: true} );
    };

    putTransitModalUp = () => {
        this.putModalsDown();
        this.setState( { transitModalUp: true} );
    };

    putModalsDown = () => {
        this.setState( { cityModalUp: false} );
        this.setState( { transitModalUp: false} );
    };

    putTransitModalDown = () => {
        this.setState( { transitModalUp: false} );
    };

    render() {
        const mapEvents = (cityortransit) => {
            if (cityortransit.type === "city") {
                const hotels = cityortransit.cost.hotels;
                const food = cityortransit.cost.food;
                const ptrans = cityortransit.cost.ptrans;
                const tickets = cityortransit.cost.tickets;
                const misc = cityortransit.cost.misc;
    
            
                const priceList = [hotels, food, ptrans, tickets, misc];
                for (let item in priceList) {
                    if (priceList[item] === '') {
                        priceList[item] = 0
                    }
                };

                return <City 
                    id={cityortransit.id}
                    key={cityortransit.id}
                    cityTitle={cityortransit.title} 
                    startdate={cityortransit.date} 
                    enddate={cityortransit.endDate} 
                    hotels={priceList[0]}
                    food={priceList[1]}
                    ptrans={priceList[2]}
                    tickets={priceList[3]}
                    misc={priceList[4]}
                    notes={cityortransit.notes}
                    thingstodo={cityortransit.thingstodo}
                />
            } else if (cityortransit.type === "transit") {
                return <Transit 
                        id={cityortransit.id}
                        key={cityortransit.id}
                        method={cityortransit.method}
                        price={cityortransit.price}
                        from={cityortransit.from} 
                        to={cityortransit.to}
                        date={cityortransit.date} 
                        time={cityortransit.time}
                    />
            }
            
        }

        let citiesandtransits = [...this.props.citiesandtransits];
        // new cities are being included in this list...
        // citiesandtransits.sort(); // idk what this does but i'll leave it here
        let citiesandtransitsList = (
            <div>
                {citiesandtransits.map((cityortransit) => 
                    mapEvents(cityortransit)
                )}
            </div>     
        );


        return (
            <div>
                <h3 className="topheaders">Itinerary</h3>
                <TopButton clicked={this.putCityModalUp}>Add New City</TopButton>
                <TopButton clicked={this.putTransitModalUp}>Add New Transit</TopButton>

                {citiesandtransitsList}

                <NewModal type="city" className={this.state.cityModalUp ? "modal" : "displayNone"} putDown={this.putModalsDown} type="city" />
                <NewModal type="transit" className={this.state.transitModalUp ? "modal" : "displayNone"} putDown={this.putModalsDown} type="transit" />
            </div>
        );
    }
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
        cities: state.itinerary.cities,
        transit: state.itinerary.transit,
        citiesandtransits: citiesandtransits,
        testcities: state.itinerary.testcities
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onSaveNewCity: (cityData) => dispatch(actions.saveNewCity(cityData)),
        //onPostCity: (cityData) => dispatch(actions.postCity(cityData)),
        onFetchCities: () => dispatch(actions.fetchCities()),
        onFetchTransits: () => dispatch(actions.fetchTransits())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);