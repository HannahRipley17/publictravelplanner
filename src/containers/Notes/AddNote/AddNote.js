import React from 'react';
import {connect} from 'react-redux';

const AddNote = (props) => {
    return (
        <div>
            <input className="NotesAddNoteTitle" type="text" placeholder="Untitled" onChange={props.updateTitle}/>
            <textarea className="NotesAddNote" placeholder="Type your note here" onChange={props.updateNote}/>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <p onClick={props.cancel}>Cancel</p>
                <h3 className="save" onClick={props.save}>SAVE</h3>
            </div>

        </div>

    );
};

const mapStateToProps = state => {
    return {
        
    }
    
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNote);