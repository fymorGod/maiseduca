import axios from 'axios'

const api = axios.create(
    {
        baseURL: 'http://35.199.114.75:3010/'
    }
)

export default api;