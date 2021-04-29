import * as actionTypes from '../actions/actionTypes.js';

const initialState = {
    notes: []
};

const fetchNotes = (state, action) => {
    let newNotes = [...action.notes];
    return {
        ...state,
        notes: newNotes,
    };
};

const addNote = (state, action) => {
    const newNote = {
        ...action.newNote
    };
    return {
        ...state,
        notes: state.notes.concat(newNote)
    }
};


const deleteNote = (state, action) => {
    let newnotes = state.notes;
    newnotes.splice(action.id, 1);
    return {
        ...state,
        notes: newnotes
    }
};


const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_NOTES_SUCCESS:
            return fetchNotes(state, action);
        case actionTypes.ADD_NEW_NOTE:
                return {...state};
        case actionTypes.EDIT_NOTE:
            return {...state};
        default:
            return state;
    }
};

export default notesReducer;