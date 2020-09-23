import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import VideoDetail from './VideoDetail';
import VideoList from './VideoList';
import useVideos from '../hooks/useVideos';

const App = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, search] = useVideos('building');

  // anytime we receive a new list of videos, we run the below function
  useEffect(() => {
    setSelectedVideo(videos[0]);
  }, [videos]);


  // below onVideoSelect={video => setSelectedVideo(video)}
  // equals to: onVideoSelect={setSelectedVideo}
  return (
    <div className = "ui container">
      <SearchBar onFormSubmit={search}/>
      <div className="ui grid">
        <div className="ui row">
          <div className="eleven wide column">
            <VideoDetail video={selectedVideo}/>
          </div>
          <div className="five wide column">
            <VideoList
              videos={videos}
              onVideoSelect={setSelectedVideo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
