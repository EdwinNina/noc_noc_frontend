<script setup lang="ts">
   import { useModal } from '@/composables/useModal';
   import { onMounted, ref } from 'vue';
   import { useForm, useField } from 'vee-validate'
   import { userSchema as validationSchema} from '../../validations/userSchema';
   import { useUser } from '../../composables/useUser';
   import type { Role, User} from '@/interfaces/users-response.interface'
   import { getSweetAlert } from '@/helpers';
   import { type UserFormInt } from '../../interfaces/user-form.interface';

   onMounted(() => getUsers())
   const users = ref<User[]>([]);
   const roles = ref<Role[]>([]);

   const { closeModal, openModal, isModalOpen } = useModal()
   const userComp = useUser()
   const { handleSubmit } = useForm({validationSchema})
   const { errorMessage: usernameError, value: usernameValue } = useField('name')
   const { errorMessage: emailError, value: emailValue } = useField('email')
   const { errorMessage: roleError, value: roleValue } = useField('role_id')

   const submit = handleSubmit(async(values) => {
      const usersData = values as UserFormInt
      try {
         const response = await userComp.saveUser(usersData)
 
         if(response?.status === 201) {
            getUsers()
            closeModal()
            getSweetAlert(response.data.message)
         }
      } catch (error: any) {
         getSweetAlert(error, false)
      }
   })

   function getUsers() {
      userComp.getAllUsers()
         .then((data) => {
            users.value = data!.users
            roles.value = data!.roles
         })
         .catch((error) => getSweetAlert(error, false))
   }
</script>

<template>
   <div class="bg-white rounded w-full p-6 shadow">
      <div class="flex justify-between">
         <h1 class="text-gray-700 font-bold text-xl">Listado de Usuarios</h1>
         <button class="btn btn-outline btn-primary" @click="openModal">Nuevo</button>
      </div>
      <div class="overflow-x-auto mt-10">
         <table class="table table-zebra">
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Role</th>
               </tr>
            </thead>
            <tbody>
               <tr v-for="user in users">
                  <td>{{ user.id }}</td>
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.role.name }}</td>
               </tr>
            </tbody>
         </table>
      </div>
   </div>
   <input type="checkbox" id="my-modal" class="modal-toggle" :checked="isModalOpen">
   <dialog id="my_modal_4" class="modal" :class="{ 'modal-open': isModalOpen }">
      <div class="modal-box w-11/12 max-w-5xl">
         <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeModal">✕</button>
         <h3 class="font-bold text-lg uppercase">Agregar nuevo usuario</h3>
         <form action="#" method="post" autocomplete="off">
            <label class="form-control w-full my-3">
               <div class="label">
                  <span class="label-text">Nombre de usuario</span>
               </div>
               <input type="text" placeholder="titulo de la tarea" class="input input-bordered w-full"
                  :class="{ 'input-error': usernameError }" v-model="usernameValue" name="title" />
               <small v-if="usernameError" class="text-red-500">{{ usernameError }}</small>
            </label>
            <label class="form-control w-full my-3">
               <div class="label">
                  <span class="label-text">Correo electronico</span>
               </div>
               <input type="email" placeholder="titulo de la tarea" class="input input-bordered w-full"
                  :class="{ 'input-error': emailError }" v-model="emailValue" name="title" />
               <small v-if="emailError" class="text-red-500">{{ emailError }}</small>
            </label>
            <label class="form-control w-full">
               <div class="label">
                  <span class="label-text">Seleccionar role</span>
               </div>
               <select class="select select-bordered w-full" :class="{ 'select-error': roleError }"
                  v-model="roleValue">
                  <option value="" selected>-- Seleccionar --</option>
                  <option v-for="role in roles" :value="role.id">{{ role.name }}</option>
               </select>
               <small v-if="roleError" class="text-red-500">{{ roleError }}</small>
            </label>
            <div class="mt-7 flex justify-end">
               <button type="submit" class="btn btn-outline btn-primary" @click="submit">Guardar</button>
            </div>
         </form>
      </div>
   </dialog>
</template>