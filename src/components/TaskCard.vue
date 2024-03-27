<script setup lang="ts">
   import { ref } from 'vue'
   import { useModal } from '@/composables/useModal';
   import { BLOCKED, COMPLETED, PENDING, PROGRESS, tasksStatus } from '@/constants';
   import { useTask } from '../composables/useTask';
   import { getSweetAlert } from '@/helpers';
   import { useRouter } from 'vue-router';

   const { closeModal, openModal, isModalOpen } = useModal()
   const {updateStatusTask, errorMesage} = useTask()
   const props = defineProps({
      task: {
         type: Object,
         required: true,
      },
      isMyTask: {
         type: Boolean,
      }
   })
   const statusId = props.task.status
   const statusForm = ref(statusId)
   const errorForm = ref('')
   const emit= defineEmits(["updateTaskList"])
   const router = useRouter()

   const submit = async () => {
      if(!statusForm.value) {
         errorForm.value = 'Debes seleccionar un estado'
         return
      }
      errorForm.value = ''
      const response = await updateStatusTask(props.task.id, statusForm.value)

      if(errorMesage.value) {
         getSweetAlert(errorMesage.value, false)
         closeModal()
         return
      }
      getSweetAlert(response.message!)
      closeModal()
      emit('updateTaskList');
   }

   const openTask = () => {
      const taskId = props.task.id
      router.push({ name: 'admin-task', params: { id: taskId }})
   }
</script>

<template>
   <div class="relative mx-auto border-l-4 rounded-md"
      :class="{
         'border-yellow-200 border-l-yellow-500': task.status === PENDING,
         'border-red-200 border-l-red-500': task.status === BLOCKED,
         'border-blue-200 border-l-blue-500': task.status === PROGRESS,
         'border-green-200 border-l-green-500': task.status === COMPLETED,
      }"
   >
      <div class="absolute -top-4 -right-4 z-10">
         <details class="dropdown dropdown-end">
            <summary class="btn bg-gray-50">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                     d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
               </svg>
            </summary>
            <ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
               <li><a @click="openTask">Ver tarea</a></li>
               <li v-if="isMyTask"><a @click="openModal">Cambiar estado</a></li>
            </ul>
         </details>
      </div>
      <div class="px-8 py-8 bg-base-100 shadow" :class="{'opacity-60': !isMyTask}">
         <h2 class="card-title text-md uppercase">{{ task.title }}</h2>
         <p class="truncate text-sm mt-2">{{ task.description }}</p>
      </div>
   </div>
   <input type="checkbox" id="my-modal" class="modal-toggle" :checked="isModalOpen">
   <dialog id="my_modal_4" class="modal" :class="{ 'modal-open': isModalOpen }">
      <div class="modal-box">
         <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeModal">✕</button>
         <h3 class="font-bold text-lg uppercase text-center border-b-2 mb-4">Actualizar estado</h3>
         <h1 class="font-bold text-md">Titulo:</h1>
         <p>{{ task.title }}</p>
         <h1 class="font-bold text-md mt-1">Descripcion:</h1>
         <p>{{ task.description }}</p>
         <form autocomplete="off" class="mt-2" @submit.prevent="submit">
            <label class="form-control w-full">
               <div class="label">
                  <span class="label-text text-md">Seleccionar estado</span>
               </div>
               <select class="select select-bordered w-full"
                  v-model="statusForm"
                  :class="{ 'select-error': errorForm }"
               >
                  <option value="" selected>-- Seleccionar --</option>
                  <option v-for="status in tasksStatus" :value="status.id">{{ status.title }}</option>
               </select>
               <small v-if="errorForm" class="text-red-500">{{ errorForm }}</small>
            </label>
            <button type="submit" class="btn w-full mt-10 btn-outline btn-primary">Cambiar</button>
         </form>
      </div>
   </dialog>
</template>

