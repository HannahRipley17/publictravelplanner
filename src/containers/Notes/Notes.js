import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import Note from './Note/Note';
import AddNote from './AddNote/AddNote';
import EditNote from './EditNote/EditNote';

import AddButton from '../../components/UI/AddButton/AddButton';
import './Notes.css';

// TODO

// try to get it to recognize new lines



const Notes = (props) => {

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [note, setNote] = useState('');
    const [expandedNote, setExpandedNote] = useState(false);
    const [error, setError] = useState(false);
    const [currentNote, setCurrentNote] = useState({});

    useEffect(() => {
        props.onFetchNotes();
    }, []);

    const inputTitleChangedHandler = (event) => {
        let newtitle = title;
        newtitle = event.target.value;
        setTitle(newtitle);
    };

    const inputNoteChangedHandler = (event) => {
        let newnote = note;
        newnote = event.target.value;
        setNote(newnote);
    };

    const saveNewNote = () => {
        let noteData = {};
        noteData["title"] = title;
        noteData["note"] = note;
        if (noteData.title !== '' || noteData.note !== '') {
            props.onAddNote(noteData).promise.then(response => {
                props.onFetchNotes();
            });
            setAddModalOpen(false);
            setError(false);
            setNote('');
            setTitle('');
        } else {
            setError(true);
        };
    };

    const saveEditedNote = () => {
        let noteData = {};
        noteData["title"] = title;
        noteData["note"] = note;
        noteData["id"] = currentNote.id;
        if (noteData.title !== '' || noteData.note !== '') {
            props.onEditNote(noteData).promise.then(response => {
                props.onFetchNotes();
            });
            setEditModalOpen(false);
            setError(false);
            setNote('');
            setTitle('');
        } else {
            setError(true);
        };
    };

    const deleteNote = () => {
        props.onDeleteNote(currentNote.id).promise.then(response => {
            props.onFetchNotes();
            closeEditModal();
        })
    };

    const openAddModal = () => {
        setAddModalOpen(true);
    };
    const closeAddModal = () => {
        setAddModalOpen(false);
    };

    const openEditModal = (item) => {
        setTitle(item.title);
        setNote(item.note);
        setCurrentNote(item);
        setEditModalOpen(true);
        // setState({editModalOpen: true, currentID: id});
    };
    const closeEditModal = () => {
        setEditModalOpen(false);
    }

    const cancel = () => {
        closeEditModal();
        closeAddModal();

    }
    const resetNote = () => {
        setNote('');
        setTitle('');
    }

    const mapNotes = (item, index) => {
        return <Note 
            item={item}
            key={item.id}
            index={index}
            className="MainNotesPageNote" 
            openEditModal={openEditModal}/>
    };
        
    let notesList = (
        <div>
            {props.notes.map((item, index) =>
                mapNotes(item, index)
            )}
        </div>
    );

    let body = ( addModalOpen ? 
        <AddNote 
            updateTitle={inputTitleChangedHandler} 
            updateNote={inputNoteChangedHandler}
            save={saveNewNote}
            openAddModal={openAddModal}
            addModalOpen={addModalOpen}
            cancel={cancel}/> 
        : editModalOpen ? 
        <EditNote 
            updateTitle={inputTitleChangedHandler} 
            updateNote={inputNoteChangedHandler}
            title={title}
            note={note}
            save={saveEditedNote}
            deleteNote={deleteNote}
            id={currentNote.id}
            cancel={cancel}/> 
            // let it be noted that I was able to pass the whole 'item' from mapEvents to the Note, back here as currentNote, and then here as currentNote.title/note/id, but for inputchangedhandler purposes, we have to do separate titles and notes
        :<div>
            {notesList}
            <AddButton label="New Note" clicked={openAddModal}/>
        </div>
    );

    return (
        <div>
            <h3 className="topheaders">Notes</h3>
            {body}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        notes: state.notes.notes
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchNotes: () => dispatch(actions.fetchNotes()),
        onAddNote: (title, note) => dispatch(actions.addNewNote(title, note)),
        onEditNote: (noteData) => dispatch(actions.editNote(noteData)),
        onDeleteNote: (id) => dispatch(actions.deleteNote(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);