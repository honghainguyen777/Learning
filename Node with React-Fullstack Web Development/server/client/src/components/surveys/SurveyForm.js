// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
// reduxForm allows Redux Form to communicate with redux store
// Field is a redux-form function that generates any types of html form elements
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validateEmail from '../../utils/validateEmail';
import formFields from './formFields';

class SurveyForm extends Component {
    renderFields() {
        return _.map(formFields, ({ label, name }) => {
            return <Field key={name} component={SurveyField} type="text" label={label} name={name} />
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                        Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    errors.recipients = validateEmail(values.recipients || '');

    _.each(formFields, ({ name }) => {
        if (!values[name]) {
            errors[name] = `You must provide a ${name}`;
        }
    });

    return errors;
}

// using redux form helper
export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);