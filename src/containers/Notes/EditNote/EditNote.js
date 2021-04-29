import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

import CheckModal from '../../../components/UI/Check/checkModal';


const EditNote = (props) => {

    const [checkModal, setCheckModal] = useState(false);
    
    const openCheckModal = () => {
        setCheckModal(true);
    };
    const closeCheckModal = () => {
        setCheckModal(false);
    };

    return (
        <div>
            <input className="NotesAddNoteTitle" type="text" value={props.title} onChange={props.updateTitle}/>
            <textarea className="NotesAddNote" value={props.note} onChange={props.updateNote}/>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <p className="delete" onClick={openCheckModal}>Delete</p>
                <h3 className="save" onClick={props.save}>SAVE</h3>
            </div>
            <p onClick={props.cancel}>Cancel</p>
            {checkModal ? 
                <CheckModal 
                    cancel={closeCheckModal}
                    delete={props.deleteNote}
                />
                : null }
        </div>

    );
    
};

const mapStateToProps = state => {
    return {
        notes: state.notes.notes
    }
    
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchNotes: () => dispatch(actions.fetchNotes()),
        onEditNote: (title, note) => dispatch(actions.addNewNote(title, note)),
        onDeleteNote: (id) => dispatch(actions.deleteNote(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditNote);