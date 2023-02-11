import Vue from 'vue'
import axios from 'axios'

const axiosIns = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  timeout: 10800,
  headers: {
    'X-Custom-Header': 'foobar',
  	'Accept': 'application/json',
    'Authorization' : `Bearer ${localStorage.getItem('jwt')}`,
  }
})

Vue.prototype.$http = axiosIns

export default axiosIns