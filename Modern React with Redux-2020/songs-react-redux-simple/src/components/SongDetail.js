import React from 'react';
import { connect } from 'react-redux';

// we can use functional component
const SongDetail = ({ song }) => {
  // first render, song will be null
  if (!song) {
    return <div>Select a song</div>;
  }
  return (
    <div>
      <h3>Details for: </h3>
      <p>
        Title: {song.title}
        <br />
        Duration: {song.duration}
      </p>
    </div>)
};

// map the state to props to the above component
const mapStateToProps = (state) => {
  return {song: state.selectedSong};
};

export default connect( mapStateToProps )(SongDetail);
