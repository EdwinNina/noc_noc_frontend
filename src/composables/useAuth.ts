import type { LoginResponse } from "@/interfaces/auth-response.interface"
import type { LoginInterface } from "@/interfaces/auth.interface"
import apiService from "@/lib/axios"
import { AxiosError } from "axios"
import { ref } from "vue"

export const useLogin = () => {
   const errors = ref<null|string>(null)
   const result = ref<LoginResponse|null>(null);

   const login = async (credentials: LoginInterface) => {
      try {
         const {data} = await apiService.post<LoginResponse>('/auth/login', credentials)
         result.value = data
         localStorage.setItem('AuthStore', JSON.stringify({ token: data.token }))
      } catch (error) {
         if(error instanceof AxiosError) {
            const errorMessage = error.response?.data?.message || 'error desconocido'
            errors.value = errorMessage
         } else {
            errors.value = String(error)
         }
      }
   }

   return {
      login,
      errors,
      result
   }
}