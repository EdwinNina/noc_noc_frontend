import axios from 'axios'

const backendServiceUrl = import.meta.env.VITE_BACKEND_SERVICE_URL

const apiService = axios.create({
   baseURL: backendServiceUrl
})

export default apiService