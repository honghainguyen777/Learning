import React, { useState } from 'react';

const SearchBar = ({ onFormSubmit }) => {
  const [term, setTerm] = useState('');

  const onSubmit = event => {
    event.preventDefault();
    //Make sure we call callback from parent component
    onFormSubmit(term);
  };

  return (
    <div className="search-bar ui segment">
      <form onSubmit={onSubmit} className="ui form">
        <div className="field">
          <label>Video Search</label>
          <input
            type="text"
            onChange={(event) => setTerm(event.target.value)}
            value={term}/>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
