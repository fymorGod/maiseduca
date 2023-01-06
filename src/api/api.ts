import axios from 'axios'

const api = axios.create(
    {
        baseURL: 'http://192.168.4.52:3010'
    }
)

export default api;