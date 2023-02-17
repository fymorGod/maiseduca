import axios from 'axios'

const api = axios.create(
    {
        baseURL: 'http://192.168.6.20:3011'
    }
)

export default api;