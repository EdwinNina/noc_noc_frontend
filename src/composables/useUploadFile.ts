import { requestError } from "@/helpers"
import type { FilesFormInt } from "@/interfaces/files-form.interface"
import apiService from "@/lib/axios"
import { ref } from "vue"

export const useUploadFile = () => {
   const errorMesage = ref<null|string>(null)

   const upload = async(payload: FilesFormInt) => {
      const formData = new FormData()
      formData.append('file', payload.file)
      formData.append('task_id', payload.task_id.toString())

      try {
         const {data} = await apiService.post('/files', formData)
         return data
      } catch (error) {
         errorMesage.value = requestError(error)
      }
   }

   const getFiles = async (id: number) => {
      try {
         const {data}= await apiService.get(`/files/task/${id}`)
         return data
      } catch (error) {
         errorMesage.value = requestError(error)
      }
   }

   const deleteFile = async (id: number) => {
      try {
         const {data}= await apiService.delete(`/files/${id}`)
         return data
      } catch (error) {
         errorMesage.value = requestError(error)
      }
   }

   return {
      upload,
      errorMesage,
      getFiles,
      deleteFile
   }
}