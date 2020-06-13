import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectSong } from '../actions';

class SongList extends Component {
  renderList() {
    return this.props.songs.map((song) => {
      return (
        <div className="item" key={song.title}>
          <div className="right floated content">
            <button
              className="ui button primary"
              onClick={() => this.props.selectSong(song)}
            >
              Select
            </button>
          </div>
          <div className="content">{song.title}</div>
        </div>
      );
    });
  }

  render() {
    return <div className="ui divided list">{this.renderList()}</div>;
  }
}

// this is always return objects
const mapStateToProps = (state) => {
  return {songs: state.songs};
};


// connect return a function --> ()(value) to invoke the value
// if we have multiple function to pass to the second agurment of the connect
// then connect(mapStateToProps, {selectSong, function1, function2,...})
export default connect(mapStateToProps, {selectSong})(SongList);


// Story here is:
// - import connect from the top
// - create component
// - always define mapStateToProps that always get the first agurment of state and return an object
// - The mapStateToProps is the function to be called in connect and the SongList is called in the second ()
// --> For all React-Redux project
