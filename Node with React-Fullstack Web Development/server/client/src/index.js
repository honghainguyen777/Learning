import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

// for testing sendgid in browser console - development only
import axios from 'axios';
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// when some new states produced inside of it
// the Provider will inform all children components
ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById("root")
);

// console.log('STRIPE KEY IS ', process.env.REACT_APP_STRIPE_KEY);
// console.log('Environment is ', process.env.NODE_ENV);