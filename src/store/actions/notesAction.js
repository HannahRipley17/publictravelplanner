import * as actionTypes from './actionTypes';
import axios from 'axios';


export const fetchNotesSuccess = (fetchedNotes) => {
    return {
        type: actionTypes.FETCH_NOTES_SUCCESS,
        notes: fetchedNotes
    }
};

export const fetchNotes = () => {
    return dispatch => {
        axios.get('https://publictravelplanner-default-rtdb.firebaseio.com/notes.json')
            .then(res => {
                const fetchedNotes = [];
                for (let key in res.data) {
                    fetchedNotes.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchNotesSuccess(fetchedNotes));
            })
        }
};

export const addNewNote = (noteData) => { // id
    let promise = fetch('https://publictravelplanner-default-rtdb.firebaseio.com/notes.json', {
        method: 'POST',
        body: JSON.stringify(noteData),
        headers: { 'Content-Type': 'application/json' }
    })
 
    return {
        type: actionTypes.ADD_NEW_NOTE,
        newNote: noteData,
        promise: promise
    };
};

export const editNote = (noteData) => {
    let promise = fetch(`https://publictravelplanner-default-rtdb.firebaseio.com/notes/${noteData.id}.json?`, {
        method: 'PUT',
        body: JSON.stringify(noteData),
        headers: { 'Content-Type': 'application/json' }
    })
    return {
        type: actionTypes.EDIT_NOTE,
        id: noteData.id,
        newNoteData: noteData,
        promise: promise
    };
};

export const deleteNote = (id) => {
    let promise = fetch(`https://publictravelplanner-default-rtdb.firebaseio.com/notes/${id}.json?`, {
        method: 'DELETE',
        //body: JSON.stringify(transitData),
        headers: { 'Content-Type': 'application/json' }
    })
    return {
        type: actionTypes.DELETE_NOTE,
        id: id,
        promise: promise
    };
};

