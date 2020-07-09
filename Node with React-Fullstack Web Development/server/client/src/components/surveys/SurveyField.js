// SurveyField contains logic to render a single label and text input
import React from 'react';
// { input } = props.input
// {...input} = onBlur={input.onBlur}... or eventHhandler={input.handler}
export default ({ input, label, meta: { error, touched } }) => {
    // meta including information of the field like validation, touched, etc
    // { touched && error } - ES6 - if touched is true then execute error
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{ marginBottom: '5px' }} />
            <div className="red-text" style={{ marginBottom: '20px' }}>
                {touched && error}
            </div>
        </div>
    );
}