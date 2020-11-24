import axios from 'axios'

// fill your server side api
const instance = axios.create({
  baseURL: 'https://aarsandi-kanband.herokuapp.com'
})

export default instance
