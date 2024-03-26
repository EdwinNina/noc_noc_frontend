import { requestError } from "@/helpers"
import type { UserFormInt } from "@/interfaces/user-form.interface"
import type { UsersResponse } from "@/interfaces/users-response.interface"
import apiService from "@/lib/axios"
import { ref } from "vue"

export const useUser = () => {
   const errorMesage = ref<null|string>(null)

   const getAllUsers = async (): Promise<UsersResponse|undefined> => {
      try {
         const {data} = await apiService<UsersResponse>('/users')
         return data
      } catch (error) {
         errorMesage.value = requestError(error)
      }
   }

   const saveUser = async(data: UserFormInt) => {
      try {
         return await apiService.post('/users', data)
      } catch (error) {
         errorMesage.value = requestError(error)
      }
   }

   return {
      saveUser,
      getAllUsers,
   }
}