import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import './Nav.css';
import burgerIconLight from '../UI/hamburgerwhite.png';
import burgerIconDark from '../UI/hamburger.png';


class Nav extends Component {
    state = {
        sideDrawerDisplay: false,
        hamburgerdark: true
    }

    sideDrawerClosedHandler = () => {
        this.setState( { sideDrawerDisplay: false, hamburgerdark: true} );
    }

    sideDrawerToggleHandler = () => {
        console.log("clicked");
        this.setState( ( prevState ) => {
            return { sideDrawerDisplay: !prevState.sideDrawerDisplay, hamburgerdark: !prevState.hamburgerdark };
        } );
    }

    render() {
        let Nav = (
            <ul className="navUl">
                <li className="listItem" onClick={this.sideDrawerClosedHandler}><NavLink to="/" exact className="NavLink">Home</NavLink></li>
                <li className="listItem" onClick={this.sideDrawerClosedHandler}><NavLink to="/itinerary" exact className="NavLink">Itinerary</NavLink></li>
                <li className="listItem" onClick={this.sideDrawerClosedHandler}><NavLink to="/budgeter" exact className="NavLink">Budget</NavLink></li>
                {/* <li className="listItem" onClick={this.sideDrawerClosedHandler}><NavLink to="/documents" exact className="NavLink">Documents</NavLink></li> */}
                <li className="listItem" onClick={this.sideDrawerClosedHandler}><NavLink to="/tickets" exact className="NavLink">Tickets</NavLink></li>
                <li className="listItem" onClick={this.sideDrawerClosedHandler}><NavLink to="/notes" exact className="NavLink">Notes</NavLink></li>
                <li className="listItem" onClick={this.sideDrawerClosedHandler}><NavLink to="/todolist" exact className="NavLink">To Do List</NavLink></li>
                <li className="listItem" onClick={this.sideDrawerClosedHandler}><NavLink to="/packinglist" exact className="NavLink">Packing List</NavLink></li>
            </ul>
        );
        return (
            <div className="flex">
                <img src={this.state.hamburgerdark ? burgerIconDark : burgerIconLight} alt="menubtn" onClick={this.sideDrawerToggleHandler} className="togglebtn"/>
                <div className={this.state.sideDrawerDisplay ? "SideDrawer" : "displayNone"}>
                    {Nav}
                </div>
            </div>
        );
    }
}
export default Nav;