import { requestError } from "@/helpers"
import type { AdminTasksResponse } from "@/interfaces/admin-tasks.interface"
import type { TaskFormInt } from "@/interfaces/task-form-interface"
import type { TasksResponse } from "@/interfaces/task-list.interface"
import apiService from "@/lib/axios"
import { ref } from "vue"

export const useTask = () => {
   const errorMesage = ref<null|string>(null)

   const getTaskList = async () => {
      try {
         const {data} = await apiService<TasksResponse>('/tasks')
         return data
      } catch (error) {
         errorMesage.value = requestError(error)
      }
   }

   const getAllTasks = async (): Promise<AdminTasksResponse|undefined> => {
      try {
         const {data} = await apiService<AdminTasksResponse>('/tasks/get-all')
         return data
      } catch (error) {
         errorMesage.value = requestError(error)
      }
   }

   const saveTask = async(data: TaskFormInt) => {
      try {
         return await apiService.post('/tasks', data)
      } catch (error) {
         errorMesage.value = requestError(error)
      }
   }

   const getTask = async(id: number) => {
      try {
         const {data} = await apiService.get(`/tasks/${id}`)
         return data
      } catch (error) {
         errorMesage.value = requestError(error)
      }
   }

   const updateTask = async(id: number, data: TaskFormInt) => {
      try {
         return await apiService.put(`/tasks/${id}`, data)
      } catch (error) {
         errorMesage.value = requestError(error)
      }
   }

   const deleteTask = async(id: number) => {
      try {
         return await apiService.delete(`/tasks/${id}`)
      } catch (error) {
         errorMesage.value = requestError(error)
      }
   }

   const updateStatusTask = async(id: number, status: number) => {
      try {
         const {data} = await apiService.put(`/tasks/update-status/${id}`, {status})
         return data
      } catch (error) {
         errorMesage.value = requestError(error)
      }
   }

   return {
      saveTask,
      getAllTasks,
      getTask,
      updateTask,
      deleteTask,
      getTaskList,
      errorMesage,
      updateStatusTask,
   }
}