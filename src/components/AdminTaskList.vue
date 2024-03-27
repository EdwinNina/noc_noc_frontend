<script setup lang="ts">
   import { onMounted, ref } from 'vue';
   import { useTask } from '../composables/useTask';
   import { type Task } from '../interfaces/admin-tasks.interface';
   import { useAuthStore } from '../stores/authStore';
   import { PENDING, COMPLETED, PROGRESS, BLOCKED } from '../constants/index';
   import { tasksStatus } from '@/constants';
   import TaskCard from './TaskCard.vue';
   const { getTaskList } = useTask()

   const store = useAuthStore()

   onMounted(() => getTasks())
   const tasks = ref<Task[]>([])
   const pendingTasks = ref<Task[]>([])
   const completedTasks = ref<Task[]>([])
   const blockedTasks = ref<Task[]>([])
   const progressTasks = ref<Task[]>([])
   const userId = store.auth?.user.id

   async function updateTaskList() {
      await getTasks()
   }

   const getTasks = async () => {
      const response = await getTaskList()
      tasks.value = response!.data
      if(tasks.value) {
         pendingTasks.value = tasks.value.filter(t => t.status === PENDING)
         completedTasks.value = tasks.value.filter(t => t.status === COMPLETED)
         progressTasks.value = tasks.value.filter(t => t.status === PROGRESS)
         blockedTasks.value = tasks.value.filter(t => t.status === BLOCKED)
      }
   }
</script>

<template>
   <div class="flex justify-between items-center">
      <h1 class="font-bold text-2xl my-10">Listado de Tareas</h1>
   </div>

   <div class="grid grid-cols-4 gap-6">
      <div class="text-white bg-green-600 pl-5 py-3 uppercase font-bold shadow" 
         :class="{
            'bg-yellow-600': status.id === PENDING,
            'bg-red-600': status.id === BLOCKED,
            'bg-blue-600': status.id === PROGRESS,
            'bg-green-600': status.id === COMPLETED,
         }"
         v-for="status in tasksStatus"
      >{{ status.title }}</div>
   </div>
   <div class="grid grid-cols-4 gap-6 mt-10">
      <div class="col-span-1 col-start-1 col-end-2 space-y-5 p-4">
         <TaskCard v-for="pending in pendingTasks" :task="pending" :key="pending.id"
            :isMyTask="userId === pending.user.id"
            @updateTaskList="updateTaskList"
         />
      </div>
      <div class="col-span-1 col-start-2 col-end-3 space-y-5 p-4">
         <TaskCard v-for="progress in progressTasks" :task="progress" :key="progress.id"
            :isMyTask="userId === progress.user.id"
            @updateTaskList="updateTaskList"
         />
      </div>
      <div class="col-span-1 col-start-3 col-end-4 space-y-5 p-4">
         <TaskCard v-for="blocked in blockedTasks" :task="blocked" :key="blocked.id"
            :isMyTask="userId === blocked.user.id"
            @updateTaskList="updateTaskList"
         />
      </div>
      <div class="col-span-1 col-start-4 col-end-5 space-y-5 p-4">
         <TaskCard v-for="completed in completedTasks" :task="completed" :key="completed.id"
            :isMyTask="userId === completed.user.id"
            @updateTaskList="updateTaskList"
         />
      </div>
   </div>
</template>