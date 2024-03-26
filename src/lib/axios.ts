import { useAuthStore } from '@/stores/authStore'
import axios from 'axios'

const backendServiceUrl = import.meta.env.VITE_BACKEND_SERVICE_URL

const apiService = axios.create({
   baseURL: backendServiceUrl
})

apiService.interceptors.request.use( response => {
   const store = useAuthStore()

   if(store.auth?.token) {
      const {token} = store.auth
      response.headers.Authorization = `Bearer ${token}`
   }

   return response
})

export default apiService