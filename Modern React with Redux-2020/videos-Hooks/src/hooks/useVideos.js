import { useState, useEffect } from 'react';
import youtube from '../apis/youtube';

const KEY = 'AIzaSyBWchET5qOsyzMERUUjTBYTjUtrjHXFArw';
// useEffect = componentDidMount

const useVideos = (defaultSearchTerm) => {
  const [videos, setVideos] = useState([]);

  // run one time by providing empty array []
  useEffect(() => {
    search(defaultSearchTerm);
  }, [defaultSearchTerm]);

  const search = async term => {
    const response = await youtube.get("/search", {
      params: {
        q: term,
        part: "snippet",
        maxResults: 25,
        type: 'video',
        key: KEY
      }
    });

    setVideos(response.data.items);

  };

  return [ videos, search ];
};

export default useVideos;
