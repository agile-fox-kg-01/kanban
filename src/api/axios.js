import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://aarsandi-kanband.herokuapp.com/'
})

export default instance
