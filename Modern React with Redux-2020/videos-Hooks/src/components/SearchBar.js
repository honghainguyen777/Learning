import React from 'react';

class SearchBar extends React.Component {
  state = {term: ''};

  onInputChange = (event) => {
    this.setState({ term: event.target.value });
  };

  onFormSubmit = event => {
    event.preventDefault();
    //Make sure we call callback from parent component
    this.props.onFormSubmit(this.onTermSubmit);
  };

  render() {
    return (
      <div className="search-bar ui segment">
        <form onSubmit={this.onFormSubmit} className="ui form">
          <div className="field">
            <label>Video Search</label>
            <input type="text" onChange={this.onInputChange} value={this.state.term}/>
          </div>
        </form>
      </div>
    );
  }
}

export default SearchBar;
