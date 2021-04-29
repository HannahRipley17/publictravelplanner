import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

import './PackingList.css';

import Pack from './Pack';

import AddButton from '../../components/UI/AddButton/AddButton';
import CheckModal from '../../components/UI/Check/checkModal';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSquare} from '@fortawesome/free-solid-svg-icons';
import {faCheckSquare} from '@fortawesome/free-solid-svg-icons';


const PackingList = (props) => {

    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [pack, setPack] = useState('');
    const [checkModal, setCheckModal] = useState(false);
    

    useEffect(() => {
        props.onFetchPacks();
        props.onFetchPackeds();
    }, []);

    const inputPackChangedHandler = (event) => {
        let newpack = pack;
        newpack = event.target.value;
        setPack(newpack);
    };


    const saveNewPack = () => {
        let packData = pack;
        if (packData !== '') {
            props.onAddPack(packData).promise.then(response => {
                props.onFetchPacks();
                setAddModalOpen(false);
                setPack('');
            });
        }

    };

    const clearPackeds = () => {
        props.onDeleteAllPackeds().promise.then(response => {
            props.onFetchPacks();
            props.onFetchPackeds();
            setCheckModal(false);
        });
    };

    const markPacked = (pack, id) => {
        props.onMarkPacked(pack, id).promise.then(response => {
            props.onFetchPacks();
            props.onFetchPackeds();
        });
    };
    const markNotPacked = (pack, id) => {
        props.onMarkNotPacked(pack, id)
        .promise.then(response => {
            props.onFetchPacks();
            props.onFetchPackeds();
        });
    };



    const openAddModal = () => {
        setAddModalOpen(true);
    };
    const closeAddModal = () => {
        setAddModalOpen(false);
    };

    const openCheckModal = () => {
        setCheckModal(true);
    };
    const closeCheckModal = () => {
        setCheckModal(false);
    };


    const mapPacks = (item, id) => {
        return <Pack 
            key={item.id}
            id={item.id}
            pack={item.pack}
            markPacked={markPacked}
        />
    };
        
    let packsList = (
        <div>
            {props.packs.map((item, id) =>
                mapPacks(item, id)
            )}
        </div>
    );

    const mapPacked = (item, id) => {
        return ( 
            <div key={item.id} className="Pack">
                <FontAwesomeIcon icon={faCheckSquare} color="#213657" onClick={() => markNotPacked(item.pack, item.id)} />
                <p className="PackedP"
                    id={item.id} 
                    pack={item.pack}>{item.pack}</p>
            </div>
        )
    };
        
    let packedList = (
        <div>
            {props.packed.map((item, id) =>
                mapPacked(item, id)
            )}
        </div>
    );

    return (
        <div>
            <h3 className="topheaders">Packing List</h3>
            {packsList}
            {addModalOpen ? <input type="text" className="NewPackInput" placeholder="New Pack" onChange={inputPackChangedHandler}/> : null}
            {addModalOpen ? <p className="save" onClick={saveNewPack}>Save</p> : <AddButton label="New Item" clicked={openAddModal}/>}
            
            <div className="PackedsDivider">
                <hr className=""></hr>
                <p>Packed</p>
                <hr></hr>
            </div>
            {packedList}
            <p className="delete" onClick={openCheckModal}>Clear Packed Items</p>

            {checkModal ? 
                <CheckModal 
                    cancel={closeCheckModal}
                    delete={clearPackeds}
                />
                : null }
        </div>
    );
}

const mapStateToProps = state => {
    return {
        packs: state.packing.packList,
        packed: state.packing.packedList
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchPacks: () => dispatch(actions.fetchPacks()),
        onFetchPackeds: () => dispatch(actions.fetchPackeds()),
        onAddPack: (pack) => dispatch(actions.addNewPack(pack)),
        onMarkPacked: (pack, id) => dispatch(actions.markPacked(pack, id)),
        onMarkNotPacked: (pack, id) => dispatch(actions.markNotPacked(pack, id)),
        onDeleteAllPackeds: () => dispatch(actions.deleteAllPackeds())
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(PackingList);