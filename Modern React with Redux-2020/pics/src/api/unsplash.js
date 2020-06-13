import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    Authorization: 'Client-ID 0aK0kxtKT6mnZ8Bo-VQrYmQEgC6RSiabI5P6jMSKPKQ'
  }
});
