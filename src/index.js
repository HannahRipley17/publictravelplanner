import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import itineraryReducer from './store/reducers/itineraryReducer';
import budgeterReducer from './store/reducers/budgeterReducer';
import documentsReducer from './store/reducers/documentsReducer';
import notesReducer from './store/reducers/notesReducer';
import ticketsReducer from './store/reducers/ticketsReducer';
import todoReducer from './store/reducers/todoReducer';
import packingReducer from './store/reducers/packingReducer';




import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  itinerary: itineraryReducer,
  budgeter: budgeterReducer,
  documents: documentsReducer,
  notes: notesReducer,
  tickets: ticketsReducer,
  todos: todoReducer,
  packing: packingReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
