import React from 'react';
import unplash from '../api/unsplash';
import SearchBar from './SearchBar';
import ImageList from './ImageList';

class App extends React.Component {
  state = {images: []}
  onSearchSubmit = async (term) => {
    const response = await unplash.get('/search/photos', {
      params: {query: term}
    });
    this.setState({ images: response.data.results });
    // we can use then() to process the responded data
    // remove ';'
    // .then((response) => {
    //   console.log(response);
    // });

    // but there is an easier way

  }
  render() {
    return (
      <div className="ui container" style={{ marginTop: '10px'}}>
        <SearchBar onSubmit={this.onSearchSubmit}/>
        <ImageList images={this.state.images}/>
      </div>
    );
  }
}

export default App;
