<script setup lang="ts">
import { isAdminUser } from '@/helpers';
import { useAuthStore } from '@/stores/authStore';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
const store = useAuthStore()
const imageUrl = ref("https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg")
const isAdmin = isAdminUser(store.auth?.user.role.name!)

if (store.auth) {
   imageUrl.value = `https://ui-avatars.com/api/?name=${store.auth.user.name}`
}

</script>

<template>
   <div class="navbar bg-base-100 px-10">
      <div class="flex-1 gap-4">
         <img src="/noc_noc_logo.png" alt="Noc Noc Tasks" class="object-cover w-20 h-22" />
         <h2 class="text-2xl text-[#F43F5F] font-bold uppercase">Noc Noc Tasks</h2>
      </div>
      <div class="flex-none gap-2">
         <ul class="menu menu-horizontal px-1">
            <li>
               <RouterLink :to="{name: 'admin-tasks'}">Tareas</RouterLink>
            </li>
            <li v-if="isAdmin">
               <RouterLink :to="{name: 'admin-users'}">Usuarios</RouterLink>
            </li>
         </ul>
         <div class="dropdown dropdown-end">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
               <div class="w-10 rounded-full">
                  <img alt="Tailwind CSS Navbar component" :src="imageUrl" />
               </div>
            </div>
            <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
               <li><a @click="store.logout">Logout</a></li>
            </ul>
         </div>
      </div>
   </div>
   <main class="container w-2/2 mt-11 mx-auto h-screen">
      <RouterView />
   </main>
</template>