import type { LoginResponse } from "@/interfaces/auth-response.interface";
import type { LoginInterface } from "@/interfaces/auth.interface";
import apiService from "@/lib/axios";
import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('auth', () => {

   const auth = ref<LoginResponse|null>(null)
   const errorMesage = ref<null|string>(null)
   const router = useRouter()

   const loadCredentials = () => {
      if(localStorage.getItem('AuthStore')) {
         const payload = JSON.parse(localStorage.getItem('AuthStore')!)
         auth.value = payload
      }
   }

   loadCredentials()

   const login = async (credentials: LoginInterface) => {
      try {
         const {data} = await apiService.post<LoginResponse>('/auth/login', credentials)
         auth.value = data
         localStorage.setItem('AuthStore', JSON.stringify({ ...data }))
      } catch (error) {
         if(error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || 'error desconocido'
            errorMesage.value = errorMessage
         } else {
            errorMesage.value = String(error)
         }
      }
   }

   const logout = async () => {
      localStorage.removeItem('AuthStore')
      auth.value = null
      router.push({ name: 'login' })
   }

   return {
      auth,
      errorMesage,
      login,
      logout
   }
})