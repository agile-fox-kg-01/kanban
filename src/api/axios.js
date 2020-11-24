import axios from 'axios'

// fill your server side api
const instance = axios.create({
  baseURL: 'https://localhost:3000'
})

export default instance
