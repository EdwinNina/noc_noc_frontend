<script setup lang="ts">
   import { useRoute } from 'vue-router';
   import { useTask } from '../../composables/useTask';
   import { onMounted, ref } from 'vue';
   import { type Task } from '../../interfaces/admin-tasks.interface';
   import { getStatusName } from '../../constants/index';
   import { useComments } from '../../composables/useComments';
   import { getSweetAlert } from '../../helpers/index';
   import { type Comment } from '../../interfaces/comment.interface';

   const { params } = useRoute()
   const { id } = params
   const { getTask } = useTask()
   const task = ref<Task>()
   const comments = ref<Comment[]>([])
   const comment = ref('')
   const errorComment = ref('')
   const { errorMesage, saveComment, getComments } = useComments()
   onMounted(() => getTaskData())

   const getTaskData = async () => {
      const response = await getTask(+id)
      task.value = response.data
      comments.value = response.data.comments
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
      const {data} = await getComments(id as string)
      comments.value = data
      comment.value = ''
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
</template>