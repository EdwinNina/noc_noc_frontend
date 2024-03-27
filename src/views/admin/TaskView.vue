<script setup lang="ts">
   import { useRoute } from 'vue-router';
   import { useTask } from '../../composables/useTask';
   import { onMounted, ref, watch } from 'vue';
   import type { Task, File as FileInt} from '../../interfaces/admin-tasks.interface';
   import { getStatusName } from '../../constants/index';
   import { useComments } from '../../composables/useComments';
   import { getSweetAlert } from '../../helpers/index';
   import { type Comment } from '../../interfaces/comment.interface';
   import DeleteIcon from '@/components/icons/DeleteIcon.vue';
   import { useModal } from '@/composables/useModal';
   import { useUploadFile } from '../../composables/useUploadFile';
   import Swal from 'sweetalert2';

   const { params } = useRoute()
   const { id } = params
   const { getTask } = useTask()
   const task = ref<Task>()
   const comments = ref<Comment[]>([])
   const comment = ref('')
   const errorComment = ref('')
   const flleError = ref('')
   const file = ref<File|null>()
   const files = ref<FileInt[]>()
   const updateData = ref<boolean>(false)
   const { errorMesage, saveComment } = useComments()
   const { closeModal, isModalOpen, openModal } = useModal()
   const {errorMesage: errorMessageFile, upload, deleteFile} = useUploadFile()
   onMounted(() => getTaskData())

   const getTaskData = async () => {
      const response = await getTask(+id)
      task.value = response.data
      comments.value = response.data.comments
      files.value = response.data.files
   }

   const submit = async () => {
      if(!comment.value) {
         errorComment.value = 'Este campo es requerido'
         return
      }
      await saveComment({content: comment.value, task_id: Number(id)})
      errorComment.value = ''
      if(errorMesage.value) {
         return getSweetAlert(errorMesage.value, false)
      }
      updateData.value = !updateData.value
      comment.value = ''
   }

   const uploadFile = async() => {
      if(!file.value) {
         flleError.value = 'Este campo es requerido'
         return
      }
      const response = await upload({ task_id: Number(id), file: file.value })
      if(errorMessageFile.value) {
         return getSweetAlert(errorMessageFile.value, false)
      }
      getSweetAlert(response.message)
      file.value = null
      updateData.value = !updateData.value
      closeModal()
   }

   const fileSelected = ($event: Event) => {
      const target = $event.target as HTMLInputElement
      if(target && target.files) {
         file.value = target.files[0]
      }
   }

   watch(updateData, () => {
      getTaskData()
   })

   const deleteTaskFile = async (id: number) => {
      Swal.fire({
         title: "Estas seguro?",
         text: "Ya no podras recuperar este archivo",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: "Si"
         }).then(async (result) => {
         if (result.isConfirmed) {
            const response = await deleteFile(id)
            if(errorMessageFile.value) {
               return getSweetAlert(errorMessageFile.value, false)
            }
            updateData.value = !updateData.value
            getSweetAlert(response.message)
         }
      });
   } 
</script>

<template>
   <div class="bg-white rounded w-full p-6 shadow">
      <div class="overflow-x-auto">
         <h1 class="text-2xl font-bold uppercase border-b-2 mb-5">Detalles de la Tarea</h1>
         <div class="flex gap-4 items-end">
            <h2 class="text-xl font-medium">Titulo:</h2>
            <p>{{ task?.title }}</p>
         </div>
         <div class="flex gap-4 items-end">
            <h2 class="text-xl font-medium">Description:</h2>
            <p>{{ task?.description }}</p>
         </div>
         <div class="flex gap-4 items-end">
            <h2 class="text-xl font-medium">Estado:</h2>
            <p>{{ getStatusName(Number(task?.status)) }}</p>
         </div>
         <div class="flex gap-4 items-end">
            <h2 class="text-xl font-medium">Propietario:</h2>
            <p>{{ task?.user.name }}</p>
         </div>
      </div>
      <div class="flex justify-between items-end">
         <h1 class="text-2xl font-bold uppercase border-b-2 mt-5">Archivos adjuntos</h1>
         <button class="btn btn-outline btn-primary" @click="openModal">Subir archivo</button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-7">
         <div class="col-span-1" v-for="file in files">
            <div class="bg-gray-100 shadow rounded py-2 px-3 flex justify-between items-center">
               <div class="flex gap-5 items-center">
                  <a :href="file.url" class="w-8 h-8 text-white hover:underline rounded-full bg-gray-600 flex justify-center items-center"target="_blank" rel="noopener noreferrer">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
   <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
   </svg>
                  </a>
                  <div class="text-sm">
                     <p>Subido por: {{ file.user.name }}</p>
                     <p class="text-gray-400">{{ file.created_at }}</p>
                  </div>
               </div>
               <div class="rounded h-5 w-5 text-red-500 cursor-pointer hover:text-red-600"
                  @click="deleteTaskFile(file.id)"
               >
                  <DeleteIcon />
               </div>
            </div>
         </div>
      </div>
   </div>
   <div class="grid grid-cols-5 gap-5 mt-5">
      <div class="col-span-1 flex justify-center items-center">
         <div class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
               <img alt="Tailwind CSS Navbar component" :src="'https://ui-avatars.com/api/?name='+task?.user.name" />
            </div>
         </div>
      </div>
      <div class="col-span-4 flex gap-5">
         <div class="w-full">
            <input type="text" placeholder="Agregar comentario" class="input input-bordered w-full" :class="{'input-error': errorComment}" v-model="comment" />
            <span v-if="errorComment" class="text-red-500">{{ errorComment }}</span>
         </div>
         <button class="btn btn-outline btn-secondary" @click="submit">Comentar</button>
      </div>
   </div>
   <h3 class="my-8">Comentarios</h3>
   <div class="grid grid-cols-12 space-y-5" v-for="comment in comments">
      <div class="col-span-2 flex justify-center items-center">
         <div class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
               <img alt="Tailwind CSS Navbar component" :src="'https://ui-avatars.com/api/?name='+comment.user.name" />
            </div>
         </div>
      </div>
      <div class="col-span-5">
         <div class="flex space-x-2 items-end">
            <h3 class="text-xl">{{ comment.user.name }}</h3>
            <p class="text-sm text-gray-600">{{ comment.created_at }}</p>
         </div>
         <p class="text-gray-400 text-md">{{ comment?.content }}</p>
      </div>
   </div>
   <input type="checkbox" id="my-modal" class="modal-toggle" :checked="isModalOpen">
   <dialog id="my_modal_4" class="modal" :class="{ 'modal-open': isModalOpen }">
      <div class="modal-box">
         <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeModal">✕</button>
         <h3 class="font-bold text-lg uppercase text-center border-b-2 mb-4">Subir Archivo</h3>
         <p class="text-center text-md text-gray-400">Debe seleccionar un archivo para adjuntarlo a la tarea</p>
         <form autocomplete="off" class="mt-5" @submit.prevent="uploadFile">
            <input type="file" class="file-input file-input-bordered w-full"
               @change="fileSelected($event)" :class="{'file-input-error': flleError}"
            />
            <small class="text-red-500" v-if="flleError">{{ flleError }}</small>
            <button type="submit" class="btn w-full mt-5 btn-outline btn-primary">Subir</button>
         </form>
      </div>
   </dialog>
</template>