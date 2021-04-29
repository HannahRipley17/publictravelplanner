import React, { useState, useEffect } from 'react';
import {Route, Switch} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

import './App.css';

import HomePage from './containers/HomePage/HomePage';
import Itinerary from './containers/Itinerary/Itinerary';
import Budgeter from './containers/Budgeter/Budgeter';
import Documents from './containers/Documents/Documents';
import Tickets from './containers/Tickets/Tickets';
import Notes from './containers/Notes/Notes';
import PackingList from './containers/PackingList/PackingList';
import ToDoList from './containers/ToDoList/ToDoList';
import Nav from './components/Nav/Nav';


// TODO

// set most important note? to be displayed on homepage
// countdown?
// deploy!!!


// 7826 lines of code :)

const App = (props) => {
    const [ready, setReady] = useState(false);

    useEffect(() => {
      props.onFetchNotes();
      props.onFetchCities();
      props.onFetchTransits();
  }, []);

  setTimeout(() => { setReady(true); }, 3000);

  let welcome = (
    <div className="WelcomeScreen">
        <h2>Welcome</h2>
    </div>
  )


  let body = (
    <div>
      <Nav />
      <Switch>
        <Route path="/itinerary" component={Itinerary} />
        <Route path="/budgeter" component={Budgeter} />
        <Route path="/documents" component={Documents} />
        <Route path="/tickets" component={Tickets} />
        <Route path="/packinglist" component={PackingList} />
        <Route path="/todolist" component={ToDoList} />
        <Route path="/notes" component={Notes} />
        <Route path="/" component={HomePage} />
      </Switch>
    </div>
  )


  return (
    <div className="body">
      {ready ? body : welcome}
    </div>
  );
}

  const mapStateToProps = state => {
    return {
        notes: state.notes.notes,

        cities: state.itinerary.cities,
        transit: state.itinerary.transit,

        flights: state.budgeter.flights,
        hotels: state.budgeter.hotels,
        food: state.budgeter.food,
        ptrans: state.budgeter.ptrans,
        tickets: state.budgeter.tickets,
        misc: state.budgeter.misc,

    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchNotes: () => dispatch(actions.fetchNotes()),

        onFetchCities: (category) => dispatch(actions.fetchCities(category)),
        onFetchTransits: () => dispatch(actions.fetchTransits()),

        onFetchSpents: () => dispatch(actions.fetchSpents()),

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);