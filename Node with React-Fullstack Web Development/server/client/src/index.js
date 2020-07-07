import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers, {}, applyMiddleware());

// when some new states produced inside of it
// the Provider will inform all children components
ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.getElementById("root")
);