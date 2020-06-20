// install: npm install --save axios
import axios from 'axios';

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});

// const KEY = 'AIzaSyBWchET5qOsyzMERUUjTBYTjUtrjHXFArw';
// export default axios.create({
//     baseURL: 'https://www.googleapis.com/youtube/v3',
//     params: {
//       part: 'snippet',
//       type: 'video',
//       maxResults: 5,
//       key: `${KEY}`
//   }
// })
