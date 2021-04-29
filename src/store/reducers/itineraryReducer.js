import * as actionTypes from '../actions/actionTypes';

const initialState = {
    testcities: [],
    cities: [
        // {
        //     id: Math.floor(Math.random() * 100000),
        //     type: "city",
        //     name: "Berlin",
        //     date: "June 1",
        //     endDate: "July 1",
        //     cost: {
        //         hotels: 56,
        //         food: 124,
        //         ptrans: 34,
        //         tickets: 65,
        //         misc: 12
        //     },
        //     thingstodo: [
        //         {
        //             title: "thing 1",
        //             cost: 25
        //         },
        //         {
        //             title: "thing 2",
        //             cost: 20
        //         },
        //         {
        //             title: "thing 3",
        //             cost: 10
        //         },
        //         {
        //             title: "thing 4",
        //             cost: 40
        //         },
        //     ],
        //     notes: "museums closed mondays museums closed mondays museums closed mondays museums closed mondays museums closed mondays"
            
        // }
    ], 
    transit: [
        // {   
        //     id: Math.floor(Math.random() * 100000),
        //     type: "transit",
        //     method: "Flight",
        //     date: "July 18",
        //     from: "Berlin",
        //     to: "Munich",
        //     time: "1:15-2:15",
        //     price: 1000
        // },
    ],

};


const saveNewCity = (state, action) => {
    console.log("called saveNewCity, ", action.newCity, action.cityId)
    const newCity = {
        ...action.newCity,
        id: action.cityId
    };
    return {
        ...state,
        cities: state.cities.concat(newCity),
        promise: action.promise
    }
};

const saveNewTransit = (state, action) => {
    console.log("called saveNewTransit reducer ", action.transitId, action.transitId);
    const newTransit = {
        ...action.newTransit,
        id: action.transitId
    };
    return {
        ...state,
        transit: state.transit.concat(newTransit),
        promise: action.promise
    }
};

// const saveNewInputData = (state, action) => {
//     const newInputData = {
//         ...action.newInputData
//         // id: action.cityId
//     };
//     return {
//         ...state,
//         cities: state.newInputData.concat(newInputData)
//     }
// };

const updateCity = (state, action) => {
    // console.log("called updateCity in the reducer", action.id, action.updatedCityData);
    // const updatedCityData = {
    //     ...action.updatedCityData
    // };

    // let somecities = [...state.cities];
    // console.log(somecities);
    // let thecity = somecities.filter(city => city.id == action.id);
    // thecity = thecity[0];
    // console.log(thecity.id, action.id);
    // thecity.title=updatedCityData.title;
    // thecity.date=updatedCityData.date;
    // thecity.endDate=updatedCityData.endDate;
    // thecity.cost.hotels=parseInt(updatedCityData.cost.hotels);
    // thecity.cost.food=parseInt(updatedCityData.cost.food);
    // thecity.cost.ptrans=parseInt(updatedCityData.cost.ptrans);
    // thecity.cost.tickets=parseInt(updatedCityData.cost.tickets);
    // thecity.cost.misc=parseInt(updatedCityData.cost.misc);
    // thecity.notes=updatedCityData.notes;
    // thecity.thingstodo=updatedCityData.thingstodo;
    // console.log(thecity);

    // for (const cityIndex in somecities) {
    //     if (somecities[cityIndex].id == action.id) {
    //         console.log(somecities[cityIndex] );
    //         somecities[cityIndex] = thecity;
    //         console.log(somecities[cityIndex] );
    //     }
    // }
    return {
        ...state,
        promise: action.promise
        //cities: somecities
    }
};

const updateTransit = (state, action) => {
    // const updatedTransitData = {
    //     ...action.updatedTransitData
    // };
    
    // let sometransits = [...state.transit];
    // let thetransit = sometransits[updatedTransitData.index];
    // console.log("thetransit: ", thetransit);
    // thetransit.method=updatedTransitData.method;
    // thetransit.date=updatedTransitData.date;
    // thetransit.time=updatedTransitData.time;
    // thetransit.from=updatedTransitData.from;
    // thetransit.to=updatedTransitData.to;
    // thetransit.price=parseInt(updatedTransitData.price);

    return {
        ...state,
        //transit: sometransits
        promise: action.promise
    }
};

const deleteCity = (state, action) => {
    console.log("called deleteCity");
    // let index = action.index;
    // console.log(index);
    // let somecities = [...state.cities];
    // console.log(somecities[index]);
    // somecities.splice(index, 1);
    // console.log(somecities);
    return {
        ...state,
        promise: action.promise
        // cities: somecities
    }
};

const deletetransit = (state, action) => {
    console.log("called deletetransit", action.id);
    // const index = action.index;
    // let sometransit = [...state.transit];
    // sometransit.pop(index)
    return {
        ...state,
        promise: action.promise
        //transit: sometransit
    }
};


const fetchCities = (state, action) => {
    let newCities = [...action.cities];
    return {
        ...state,
        cities: newCities,
    };
};


const fetchTransits = (state, action) => {
    let newTransits = [...action.transits];
    return {
        ...state,
        transit: newTransits,
    };
};

const itineraryReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CITIES_START:
            return {
                ...state
            }
        case actionTypes.FETCH_CITIES_SUCCESS:
            return fetchCities(state, action);

        case actionTypes.POST_CITY_SUCCESS:
            return {
                ...state,
                testcities: action.cityData,
                loading: false
            };
        case actionTypes.SAVE_NEW_CITY:
            return saveNewCity(state, action);

        case actionTypes.DELETE_CITY_SUCCESS:
            return deleteCity(state, action);

        case actionTypes.UPDATE_CITY_SUCCESS:
            return updateCity(state, action);

        case actionTypes.FETCH_TRANSITS_SUCCESS:
            return fetchTransits(state, action);
        
        case actionTypes.SAVE_NEW_TRANSIT:
            return saveNewTransit(state, action);

        // case actionTypes.SAVE_NEW_INPUT_DATA:
        //     return saveNewInputData(state, action);

        case actionTypes.UPDATE_TRANSIT:
            return updateTransit(state, action);


        case actionTypes.DELETE_TRANSIT:
            return deletetransit(state, action);
        
        default:
            return state;
    }
};

export default itineraryReducer;