import React from 'react';

const Spinner = props => {
  return (
    <div className="ui active dimmer">
      <div className="ui big text loader">{props.message}</div>
    </div>
  );
};

// provide default properties if the message prop is not provided in the parent component
Spinner.defaultProps = {
  message: 'Loading...'
};

export default Spinner;
