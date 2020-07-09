import React, { Component } from 'react';
// BrowserRouter tell browser how to behave
// Route is used to set-up a rule between a certain route that user may visit inside the app
import { BrowserRouter, Route } from 'react-router-dom';
// connect function to give certain components the ability to call function creators
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Header />
                    <Route exact path="/" component={Landing} />
                    <Route exact path="/surveys" component={Dashboard} />
                    <Route path="/surveys/new" component={SurveyNew} />
                </div>            
            </BrowserRouter>

        );
    }
};

// when we pass in actions they are assigned to the app component as props
export default connect(null, actions)(App);