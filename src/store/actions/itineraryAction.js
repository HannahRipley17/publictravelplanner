import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchTransits = () => {
    return dispatch => {
        axios.get('https://publictravelplanner-default-rtdb.firebaseio.com/transits.json')
            .then(res => {
                const fetchedTransits = [];
                for (let key in res.data) {
                    fetchedTransits.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchTransitsSuccess(fetchedTransits));
            })
            // .catch(err => {
            //     console.log(err);
            // });
    }
};

export const fetchTransitsSuccess = (transits) => {
    return {
        type: actionTypes.FETCH_TRANSITS_SUCCESS,
        transits: transits
    }
};

export const saveNewTransit = (transitData) => {
    let id = "";
    let promise = fetch('https://publictravelplanner-default-rtdb.firebaseio.com/transits.json', {
        method: 'POST',
        body: JSON.stringify(transitData),
        headers: { 'Content-Type': 'application/json' }
    })
        // .then(response => {
        //     return response.json();
        // })
        // .then(responseData => {
        //     id = responseData.name;
        // });
    return {
        type: actionTypes.SAVE_NEW_TRANSIT,
        newTransit: transitData,
        transitId: id,
        promise: promise
    };
};

// export const saveNewTransit = (transitData) => { // id
//     return {
//         type: actionTypes.SAVE_NEW_TRANSIT,
//         newTransit: transitData
//         // cityId: id
//     };
// };



export const updateTransit = (transitData, id) => {
    let promise = fetch(`https://publictravelplanner-default-rtdb.firebaseio.com/transits/${id}.json?`, {
        method: 'PUT',
        body: JSON.stringify(transitData),
        headers: { 'Content-Type': 'application/json' }
    })
        // .then(response => {
        //     dispatch(updateTransitSuccess(id, transitData, promise));
        // .catch(error => { 
        //     dispatch(purchaseBurgerFail(error));
        // } ) 
    return {
        type: actionTypes.UPDATE_TRANSIT_SUCCESS,
        updatedTransitData: transitData,
        id: id,
        promise: promise
    }
};


export const deleteTransit = (id) => {
    let promise = fetch(`https://publictravelplanner-default-rtdb.firebaseio.com/transits/${id}.json?`, {
        method: 'DELETE',
        //body: JSON.stringify(transitData),
        headers: { 'Content-Type': 'application/json' }
    })
    //     .then(response => {
    //         dispatch(deleteCitySuccess(id));
    //    })
        // .catch(error => { 
        //     dispatch(purchaseBurgerFail(error));
        // } ) 
    return {
        type: actionTypes.DELETE_TRANSIT_SUCCESS,
        id: id,
        promise: promise
    }
};




export const fetchCitiesSuccess = (cities) => {
    return {
        type: actionTypes.FETCH_CITIES_SUCCESS,
        cities: cities
    }
};

export const fetchCities = () => {
    return dispatch => {
        // dispatch(fetchCitiesStart());
        // const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('https://publictravelplanner-default-rtdb.firebaseio.com/cities.json')
            .then(res => {
                const fetchedCities = [];
                for (let key in res.data) {
                    fetchedCities.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchCitiesSuccess(fetchedCities));
            })
            // .catch(err => {
            //     console.log(err);
            // });
    }
};

export const saveNewCity = (cityData) => {
    let id = "";
    let promise = fetch('https://publictravelplanner-default-rtdb.firebaseio.com/cities.json', {
        method: 'POST',
        body: JSON.stringify(cityData),
        headers: { 'Content-Type': 'application/json' }
    })
        // .then(response => {
        //     return response.json();
        // })
        // .then(responseData => {
        //     id = responseData.name;
        // });
    return {
        type: actionTypes.SAVE_NEW_CITY,
        newCity: cityData,
        cityId: id,
        promise: promise
    };
};

export const updateCity = (cityData, id) => {
    let promise = fetch(`https://publictravelplanner-default-rtdb.firebaseio.com/cities/${id}.json?`, {
        method: 'PUT',
        body: JSON.stringify(cityData),
        headers: { 'Content-Type': 'application/json' }
    })
    //     .then(response => {
    //         dispatch(updateCitySuccess(id, cityData, promise));
    //    })
        // .catch(error => { 
        //     dispatch(purchaseBurgerFail(error));
        // } ) 
    return {
        type: actionTypes.UPDATE_CITY_SUCCESS,
        updatedCityData: cityData,
        id: id,
        promise: promise
    }
};

// export const updateCitySuccess = (id, cityData, promise) => {
//     return {
//         type: actionTypes.UPDATE_CITY_SUCCESS,
//         updatedCityData: cityData,
//         id: id,
//         promise: promise
//     }
// };


export const deleteCity = (id) => {
    let promise = fetch(`https://publictravelplanner-default-rtdb.firebaseio.com/cities/${id}.json?`, {
        method: 'DELETE',
        //body: JSON.stringify(transitData),
        headers: { 'Content-Type': 'application/json' }
    })
    //     .then(response => {
    //         dispatch(deleteCitySuccess(id));
    //    })
        // .catch(error => { 
        //     dispatch(purchaseBurgerFail(error));
        // } ) 
    return {
        type: actionTypes.DELETE_CITY,
        id: id,
        promise: promise
    }
};

export const deleteCitySuccess = (id) => {
};


// export const saveNewInputData = (inputData) => {
//     return {
//         type: actionTypes.SAVE_NEW_INPUT_DATA,
//         newInputData: inputData
//     }
// };
