<script setup lang="ts">
   import { useAuthStore } from '@/stores/authStore';
   import { isAdminUser } from '../../helpers/index';
   import EmployeeTaskList from '@/components/EmployeeTaskList.vue';
   import AdminTaskList from '@/components/AdminTaskList.vue';
   const store = useAuthStore()
   const isAdmin = isAdminUser(store.auth?.user.role.name!)
</script>

<template>
   <template v-if="isAdmin">
      <AdminTaskList/>
   </template>
   <template v-else>
      <EmployeeTaskList />
   </template>
</template>