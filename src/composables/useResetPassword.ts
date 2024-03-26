import { requestError } from "@/helpers"
import type { LoginInterface } from "@/interfaces/auth.interface"
import apiService from "@/lib/axios"
import { ref } from "vue"

export const useResetPassword = () => {

   const errorMesage = ref<null|string>(null)

   const updatePassword = async(credentials: LoginInterface) =>{
      try {
         const {data} = await apiService.post('/reset-password', credentials);
         return data 
      } catch (error) {
         errorMesage.value = requestError(error)
      }
   }

   return {
      updatePassword,
      errorMesage
   }
}