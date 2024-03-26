<script setup lang="ts">
   import { useAuthStore } from '@/stores/authStore';
   import { isAdminUser } from '../../helpers/index';
   import TaskList from '@/components/TaskList.vue';
   const store = useAuthStore()
   const isAdmin = isAdminUser(store.auth?.user.role.name!)
</script>

<template>
   <template v-if="isAdmin">
      <TaskList />
   </template>
   <template v-else>
      <h1>Employee Panel</h1>
   </template>
</template>