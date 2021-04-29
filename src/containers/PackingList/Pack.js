import React, {useState} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import './PackingList.css';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSquare} from '@fortawesome/free-solid-svg-icons';

const Pack = (props) => {

    const [editMode, setEditMode] = useState(false);
    const [pack, setPack] = useState(props.pack);
    
    const inputPackChangedHandler = (event) => {
        let newpack = pack;
        newpack = event.target.value;
        setPack(newpack);
    };

    const openEditModal = () => {
        setEditMode(true);
    }
    const saveEditedPack = () => {
        if (pack !== '') {
            props.onEditPack(pack, props.id).promise.then(response => {
                props.onFetchPacks();
                props.onFetchPackeds();
            });
            setEditMode(false);
        };
    };

    let body = (
        <div className="Pack" key={props.id}>
            <FontAwesomeIcon icon={faSquare} color="#213657" onClick={() => props.markPacked(props.pack, props.id)}/>
            <p className="PackP" onClick={openEditModal}
                key={props.id} 
                id={props.id} 
                pack={props.pack}>{props.pack}</p>
        </div>
    );

    let edit = (
        <div>
            <div style={{display: "flex"}}>
                <FontAwesomeIcon icon={faSquare} color="#213657"/>
                <input type="text" className="editPackInput" defaultValue={pack} onChange={inputPackChangedHandler}/>
            </div>
            <p className="save" onClick={saveEditedPack}>Save</p>
        </div>
    )

    return(
        <div>
            { editMode ? edit : body}
        </div>
    );
};
const mapStateToProps = state => {
    return {
        packs: state.packing.packList,
        completed: state.packing.packedList
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPacks: () => dispatch(actions.fetchPacks()),
        onFetchPackeds: () => dispatch(actions.fetchPackeds()),
        onEditPack: (pack, id) => dispatch(actions.editPack(pack, id))
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Pack);