<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import { ref, onMounted, watch } from 'vue';
import { taskSchema, taskEditSchema } from '../validations/taskSchema';
import { useTask } from '../composables/useTask';
import { type TaskFormInt } from '../interfaces/task-form-interface';
import { useModal } from '../composables/useModal';
import EditIcon from './icons/EditIcon.vue';
import DeleteIcon from './icons/DeleteIcon.vue';
import { tasksStatus, getStatusName } from '../constants/index';
import { getSweetAlert } from '../helpers/index';
import type { Task } from '@/interfaces/admin-tasks.interface';
import type { User } from '@/interfaces/users-response.interface';

const users = ref<User[]>([])
const tasks = ref<Task[]>([])
const idEditTask = ref<number>(0)
let validationSchema = taskSchema

watch(idEditTask, () => {
   validationSchema = taskEditSchema
}, {deep: true})

const { handleSubmit } = useForm({ validationSchema })
const { errorMessage: errorTitle, value: titleValue } = useField('title')
const { errorMessage: errorDescription, value: descriptionValue } = useField<string>('description');
const { errorMessage: errorEmployee, value: userIdValue } = useField('user_id')
const { errorMessage: statusError, value: statusValue } = useField('status')

const taskComp = useTask()
const { closeModal, openModal, isModalOpen } = useModal()

onMounted(() => {
   getTasks()
})

function getTasks() {
   taskComp.getAllTasks()
      .then((data) => {
         users.value = data!.users
         tasks.value = data!.tasks
      })
}

const submit = handleSubmit(async (values) => {
   const taksData = values as TaskFormInt
   let response;

   try {
      const taskId = idEditTask.value
      if (taskId > 0) {
         response = await taskComp.updateTask(idEditTask.value, taksData)
      } else {
         response = await taskComp.saveTask(taksData)
      }
   } catch (error: any) {
      getSweetAlert(error, false)
   }

   if([200, 201].includes(Number(response?.status))) {
      closeModal()
      getTasks()
      getSweetAlert(response?.data.message)
   }
})

   const editTask = (id: number) => {
      taskComp.getTask(id)
         .then(({data}) => {
            titleValue.value = data.title
            descriptionValue.value = data.description
            userIdValue.value = data.user.id
            statusValue.value = data.status
            idEditTask.value = id
            openModal()
         }).catch((error) => console.log(error))
   }

   const deleteTask = (id: number) => {
      taskComp.deleteTask(id)
         .then((response) => {
            getTasks()
            getSweetAlert(response?.data.message)
         })
         .catch((error) => getSweetAlert(error, false))
   }
</script>

<template>
   <div class="bg-white rounded w-full p-6 shadow">
      <div class="flex justify-between">
         <h1 class="text-gray-700 font-bold text-xl">Listado de Tareas</h1>
         <button class="btn btn-outline btn-primary" @click="openModal">Nuevo</button>
      </div>
      <div class="overflow-x-auto mt-10">
         <table class="table table-zebra">
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Titulo</th>
                  <th>Descripcion</th>
                  <th>Empleado</th>
                  <th>Estado</th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="task in tasks">
                  <th>{{ task.id }}</th>
                  <td>{{ task.title }}</td>
                  <td class="truncate">{{ task.description }}</td>
                  <td>{{ task.user.name }}</td>
                  <td>{{ getStatusName(task.status) }}</td>
                  <td class="flex gap-2">
                     <button class="btn btn-outline btn-warning" @click="editTask(task.id)">
                        <EditIcon />
                     </button>
                     <button class="btn btn-outline btn-error" @click="deleteTask(task.id)">
                        <DeleteIcon/>
                     </button>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
   </div>
   <input type="checkbox" id="my-modal" class="modal-toggle" :checked="isModalOpen">
   <dialog id="my_modal_4" class="modal" :class="{ 'modal-open': isModalOpen }">
      <div class="modal-box w-11/12 max-w-5xl">
         <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeModal">✕</button>
         <h3 class="font-bold text-lg uppercase">Agregar nueva tarea</h3>
         <form action="#" method="post" autocomplete="off">
            <label class="form-control w-full my-3">
               <div class="label">
                  <span class="label-text">Titulo</span>
               </div>
               <input type="text" placeholder="titulo de la tarea" class="input input-bordered w-full"
                  :class="{ 'input-error': errorTitle }" v-model="titleValue" name="title" />
               <small v-if="errorTitle" class="text-red-500">{{ errorTitle }}</small>
            </label>
            <label class="form-control w-full my-3">
               <div class="label">
                  <span class="label-text">Descripcion</span>
               </div>
               <textarea class="textarea textarea-bordered" placeholder="Descripcion de la tarea"
                  :class="{ 'textarea-error': errorDescription }" v-model="descriptionValue"></textarea>
               <small v-if="errorDescription" class="text-red-500">{{ errorDescription }}</small>
            </label>
            <label class="form-control w-full">
               <div class="label">
                  <span class="label-text">Seleccionar empleado</span>
               </div>
               <select class="select select-bordered w-full" :class="{ 'select-error': errorEmployee }"
                  v-model="userIdValue">
                  <option value="" selected>-- Seleccionar --</option>
                  <option v-for="user in users" :value="user.id">{{ user.name }}</option>
               </select>
               <small v-if="errorEmployee" class="text-red-500">{{ errorEmployee }}</small>
            </label>
            <label class="form-control w-full" v-if="idEditTask > 0">
               <div class="label">
                  <span class="label-text">Seleccionar estado</span>
               </div>
               <select class="select select-bordered w-full" :class="{ 'select-error': errorEmployee }"
                  v-model="statusValue"
               >
                  <option value="" selected>-- Seleccionar --</option>
                  <option v-for="status in tasksStatus" :value="status.id">{{ status.title }}</option>
               </select>
               <small v-if="statusError" class="text-red-500">{{ statusError }}</small>
            </label>
            <div class="mt-7 flex justify-end">
               <button type="submit" class="btn btn-outline btn-primary" @click="submit">Guardar</button>
            </div>
         </form>
      </div>
   </dialog>
</template>