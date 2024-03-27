import { requestError } from "@/helpers"
import apiService from "@/lib/axios"
import { ref } from "vue"

interface ReportForm {
   dateFrom: string
   dateTo: string
}

export const useReport = () => {

   const errorMesage = ref<null|string>(null)

   const getReport = async(payload: ReportForm) => {
      try {
         const { data } = await apiService.post('/reports', payload)

         return data
      } catch (error) {
         errorMesage.value = requestError(error)
      }
   }

   return {
      getReport,
      errorMesage
   }
}