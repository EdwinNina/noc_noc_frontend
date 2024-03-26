<script setup lang="ts">
   import { useForm, useField } from 'vee-validate'
   import { loginSchema as validationSchema } from '../validations/loginSchema';
   import { type LoginInterface } from '../interfaces/auth.interface';
   import Swal from 'sweetalert2'
   import { useRouter } from 'vue-router';
   import { useAuthStore } from '../stores/authStore';
   
   const { handleSubmit } = useForm({ validationSchema })
   const { errorMessage: emailError, value: emailValue } = useField('email')
   const { errorMessage: passwordError, value: passwordValue } = useField('password')
   const router = useRouter()
   const store = useAuthStore()

   const submit = handleSubmit(async (values) => {
      const credentials = values as LoginInterface
      await store.login(credentials)

      if(store.errorMesage) {
         Swal.fire({
            title: 'Error!',
            text: store.errorMesage,
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
         })
         return
      }
      router.push({ name: 'admin-tasks' })
   })
</script>

<template>
   <div class="h-screen flex flex-col justify-center items-center">
      <div class="bg-white w-1/3 py-10 rounded shadow">
         <img class="mx-auto w-32" src="/noc_noc_logo.png" alt="Your Company">
         <h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Inicio de Sesión
         </h2>
         <div class="my-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" action="#" method="POST" autocomplete="off">
               <div class="mt-2">
                  <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Correo
                     electronico</label>
                  <input id="email" name="email" type="email"
                     :class="{'border-red-500': emailError}"
                     class="block w-full rounded-md py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 border sm:text-sm sm:leading-6 pl-2"
                     v-model="emailValue"
                  >
                  <small v-if="emailError" class="text-red-500">{{ emailError }}</small>
               </div>
               <div class="mt-2">
                  <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
                  <input id="password" name="password" type="password"
                     :class="{'border-red-500': passwordError}"
                     class="block w-full rounded-md py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 border sm:text-sm sm:leading-6 pl-2"
                     v-model="passwordValue"
                  >
                  <small v-if="passwordError" class="text-red-500">{{ passwordError }}</small>
               </div>
               <button type="submit"
                  class="flex w-full justify-center rounded-md bg-[#F43F5F] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" @click="submit"
               >Iniciar</button>
            </form>
            <a href="#" class="block mt-6 font-semibold text-center text-sm text-indigo-600 hover:text-indigo-500 hover:underline">Forgot password?</a>
         </div>
      </div>
   </div>
</template>