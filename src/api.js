import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: process.env.VUE_APP_TOKEN
  }
});

export default instance;
