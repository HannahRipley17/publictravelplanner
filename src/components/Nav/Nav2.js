import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Nav.css';
import burgerIconLight from '../UI/hamburgerwhite.png';
import burgerIconDark from '../UI/hamburger.png';


class Nav2 extends Component {
    state = {
        sideDrawerDisplay: false,
        hamburgersrc: true
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        console.log("clicked");
        this.setState( ( prevState ) => {
            return { sideDrawerDisplay: !prevState.sideDrawerDisplay, hamburgersrc: !prevState.hamburgersrc };
        } );
    }

    render() {
        let Nav = (
            <ul className="navUl">
                    <li className="listItem"><NavLink to="/" exact className="NavLink">Home</NavLink></li>
                    <li className="listItem"><NavLink to="/itinerary" exact className="NavLink">Itinerary</NavLink></li>
                    <li className="listItem"><NavLink to="/budgeter" exact className="NavLink">Budgeter</NavLink></li>
                    <li className="listItem"><NavLink to="/documents" exact className="NavLink">Documents</NavLink></li>
                    <li className="listItem"><NavLink to="/notes" exact className="NavLink">Notes</NavLink></li>
                    <li className="listItem"><NavLink to="/packinglist" exact className="NavLink">Packing List</NavLink></li>
                    <li className="listItem"><NavLink to="/todolist" exact className="NavLink">To Do List</NavLink></li>
                </ul>
        );
        return (
            <div>
                <img src={this.state.hamburgersrc ? burgerIconDark : burgerIconLight} alt="menubtn" onClick={this.sideDrawerToggleHandler} className="togglebtn"/>
                <div className={this.state.sideDrawerDisplay ? "SideDrawer" : "displayNone"}>
                    {Nav}
                </div>
            </div>
        );
    }
}
export default Nav2;