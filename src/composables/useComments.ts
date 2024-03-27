import { requestError } from "@/helpers"
import type { CommentForm } from "@/interfaces/comment-form.interface"
import apiService from "@/lib/axios"
import { ref } from "vue"

export const useComments = () => {
   const errorMesage = ref<null|string>(null)

   const saveComment = async (payload: CommentForm) => {
      try {
         const { data } = await apiService.post('/comments', payload)
         return data
      } catch (error) {
         errorMesage.value = requestError(error)
      }
   }

   const getComments = async (id: string) => {
      try {
         const {data}= await apiService.get(`/comments/task/${id}`)
         return data
      } catch (error) {
         errorMesage.value = requestError(error)
      }
   }

   return {
      errorMesage,
      saveComment,
      getComments
   }
}