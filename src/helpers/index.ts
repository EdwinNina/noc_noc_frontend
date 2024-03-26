import { Roles } from "@/interfaces/roles.interface"
import { AxiosError } from "axios"
import Swal from "sweetalert2"

export const isAdminUser = (role: string): boolean => {
   return Roles.administrador === role
}

export const isEmployeeUser = (role: string): boolean => {
   return Roles.empleado === role
}

export const requestError = (error: any) => {
   let errorMessage =  null;

   if(error instanceof AxiosError) {
      const errorDataMessage = error.response?.data?.message || 'error desconocido'
      errorMessage = errorDataMessage
   } else {
      errorMessage = String(error)
   }

   return errorMessage
}

export const getSweetAlert = (message: string, isSuccess: boolean = true) => {
   return Swal.fire({
      title: isSuccess ? 'Exito' : 'Error',
      text: message,
      icon: isSuccess ? 'success' : 'error',
      showConfirmButton: false,
      timer: 2000
   })
}