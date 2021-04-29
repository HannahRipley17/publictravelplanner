import * as actionTypes from '../actions/actionTypes.js';

const initialState = {
    packList: [],
    packedList: []
};

const fetchPacks = (state, action) => {
    let newPacks = [...action.packs];
    return {
        ...state,
        packList: newPacks,
    };
};

const fetchPackeds = (state, action) => {
    let newPackeds = [...action.packeds];
    return {
        ...state,
        packedList: newPackeds,
    };
};


const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_PACKS_SUCCESS:
            return fetchPacks(state, action);
        case actionTypes.FETCH_PACKEDS_SUCCESS:
            return fetchPackeds(state, action);
        case actionTypes.ADD_NEW_PACK:
            return {...state};
        case actionTypes.EDIT_PACK:
            return {...state};
        case actionTypes.DELETE_PACK:
            return {...state};
        case actionTypes.MARK_PACKED:
            return {...state}
        case actionTypes.MARK_NOT_PACKED:
            return {...state}
        default:
            return state;
    }
};

export default todoReducer;