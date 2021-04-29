import * as actionTypes from './actionTypes';
import axios from 'axios';


export const fetchPacksSuccess = (fetchedPacks) => {
    return {
        type: actionTypes.FETCH_PACKS_SUCCESS,
        packs: fetchedPacks,
        id: fetchedPacks.id
    }
};

export const fetchPacks = () => {
    return dispatch => {
        axios.get('https://publictravelplanner-default-rtdb.firebaseio.com/packs.json').then(res => {
                const fetchedPacks = [];
                for (let key in res.data) {
                    fetchedPacks.push({
                        pack: res.data[key],
                        id: key
                    });
                }
                dispatch(fetchPacksSuccess(fetchedPacks));
            })
        }
};


export const fetchPackedsSuccess = (fetchedPackeds) => {
    return {
        type: actionTypes.FETCH_PACKEDS_SUCCESS,
        packeds: fetchedPackeds,
        id: fetchedPackeds.id
    }
};

export const fetchPackeds = () => {
    return dispatch => {
        axios.get('https://publictravelplanner-default-rtdb.firebaseio.com/packeds.json').then(res => {
                const fetchedPackeds = [];
                for (let key in res.data) {
                    fetchedPackeds.push({
                        pack: res.data[key],
                        id: key
                    });
                }
                dispatch(fetchPackedsSuccess(fetchedPackeds));
            })
        }
};

export const addNewPack = (packData) => { // id
    let promise = fetch('https://publictravelplanner-default-rtdb.firebaseio.com/packs.json', {
        method: 'POST',
        body: JSON.stringify(packData),
        headers: { 'Content-Type': 'application/json' }
    })
 
    return {
        type: actionTypes.ADD_NEW_PACK,
        newPack: packData,
        promise: promise
    };
};

export const editPack = (pack, id) => {
    let promise = fetch(`https://publictravelplanner-default-rtdb.firebaseio.com/packs/${id}.json`, {
        method: 'PUT',
        body: JSON.stringify(pack),
        headers: { 'Content-Type': 'application/json' }
    })
    return {
        type: actionTypes.EDIT_PACK,
        promise: promise
    };
};

export const deleteAllPackeds = () => {
    let promise = fetch(`https://publictravelplanner-default-rtdb.firebaseio.com/packeds.json?`, {
        method: 'DELETE',
        //body: JSON.stringify(transitData),
        headers: { 'Content-Type': 'application/json' }
    })
    return {
        type: actionTypes.DELETE_ALL_PACKEDS,
        promise: promise
    };
};

export const deletePack = (id) => {
    let promise = fetch(`https://publictravelplanner-default-rtdb.firebaseio.com/packs/${id}.json?`, {
        method: 'DELETE',
        //body: JSON.stringify(transitData),
        headers: { 'Content-Type': 'application/json' }
    })
    return {
        type: actionTypes.DELETE_PACK,
        id: id,
        promise: promise
    };
};

export const deletePacked = (id) => {
    let promise = fetch(`https://publictravelplanner-default-rtdb.firebaseio.com/packeds/${id}.json?`, {
        method: 'DELETE',
        //body: JSON.stringify(transitData),
        headers: { 'Content-Type': 'application/json' }
    })
    return {
        type: actionTypes.DELETE_PACKED,
        id: id,
        promise: promise
    };
};


export const markPacked = (pack, id) => {
    deletePack(id);
    // epiphany moment - all these things have to return something. either return a call to the reducer or the dispatch. if you just do a console.log, it'll say something about being a plain object
    let promise = fetch('https://publictravelplanner-default-rtdb.firebaseio.com/packeds.json', {
        method: 'POST',
        body: JSON.stringify(pack),
        headers: { 'Content-Type': 'application/json' }
    })

    return {
        type: actionTypes.MARK_PACKED,
        promise: promise
    };
    
};

export const addPackBackToPackList = (pack) => {
    let promise = fetch('https://publictravelplanner-default-rtdb.firebaseio.com/packs.json', {
        method: 'POST',
        body: JSON.stringify(pack),
        headers: { 'Content-Type': 'application/json' }
    })

    return {
        type: actionTypes.MARK_NOT_PACKED,
        promise: promise
    };
};

export const markNotPacked = (pack, id) => {
    deletePacked(id);
    // epiphany moment - all these things have to return something. either return a call to the reducer or the dispatch. if you just do a console.log, it'll say something about being a plain object
    let promise = fetch('https://publictravelplanner-default-rtdb.firebaseio.com/packs.json', {
        method: 'POST',
        body: JSON.stringify(pack),
        headers: { 'Content-Type': 'application/json' }
    })

    return {
        type: actionTypes.MARK_NOT_PACKED,
        promise: promise
    };
    
};
