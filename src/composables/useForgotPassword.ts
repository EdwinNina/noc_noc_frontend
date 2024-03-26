import { requestError } from "@/helpers"
import type { LoginInterface } from "@/interfaces/auth.interface"
import apiService from "@/lib/axios"
import { ref } from "vue"

export const useForgotPassword = () => {

   const errorMesage = ref<null|string>(null)

   const forgotPassword = async(credentials: {email: string}) =>{
      try {
         const {data} = await apiService.post('/forgot-password', credentials);
         return data 
      } catch (error) {
         errorMesage.value = requestError(error)
      }
   }

   const updatePassword = async(credentials: LoginInterface, token: string) =>{
      try {
         const {data} = await apiService.post('/update-password', {...credentials, token});
         return data 
      } catch (error) {
         errorMesage.value = requestError(error)
      }
   }

   return {
      forgotPassword,
      updatePassword,
      errorMesage
   }
}