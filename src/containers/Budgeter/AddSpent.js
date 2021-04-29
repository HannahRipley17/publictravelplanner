import React from 'react';
import {connect} from 'react-redux';

const AddSpent = (props) => {
    return (
        <div>
            
            <div className={props.addModalOpen ? "showBudgeterAddSpent" : "displayNone"}>
                <div className="BudgeterAddDiv">
                    <input type="text" className="BudgeterAddLabel" onChange={props.updateLabel}/>
                    <input type="text" className="BudgeterAddCost" onChange={props.updateCost}/>
                </div>
                <h3 className="save" onClick={props.save}>SAVE</h3>
                <p className={props.error ? "colorRed" : "displayNone"}>Please fill in all the fields</p>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        cities: state.budgeter.cities,
        transit: state.budgeter.transit
    }
    
}

const mapDispatchToProps = dispatch => {
    return {
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddSpent);