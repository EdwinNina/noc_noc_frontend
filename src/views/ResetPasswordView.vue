<script setup lang="ts">
   import { useForm, useField } from 'vee-validate'
   import { type LoginInterface } from '../interfaces/auth.interface';
   import { resetPasswordSchema as validationSchema} from '../validations/resetPasswordSchema';
   import { useResetPassword } from '../composables/useResetPassword';
   import { getSweetAlert } from '@/helpers';
   import { useAuthStore } from '../stores/authStore';

   const { handleSubmit } = useForm({ validationSchema })
   const { errorMessage: passwordError, value: passwordValue } = useField('password')
   const store = useAuthStore()
   const { errorMesage, updatePassword } = useResetPassword()

   const submit = handleSubmit(async (values) => {
      values.email = store.auth?.user.email
      const credentials = values as LoginInterface
      const response = await updatePassword(credentials)

      if(errorMesage.value) {
         return getSweetAlert(errorMesage.value, false)
      }
      getSweetAlert(response.message);
      store.deleteLocalStorage()
   })
</script>

<template>
   <div class="h-screen flex flex-col justify-center items-center">
      <div class="bg-white w-1/3 pt-10 rounded shadow">
         <img class="mx-auto w-32" src="/noc_noc_logo.png" alt="Your Company">
         <h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Actualizar la contraseña</h2>
         <div class="my-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <p class="text-sm text-gray-500 text-center mb-5">Para una mejor experiencia se le pide que actualice su contraseña para el acceso al sistema</p>
            <form class="space-y-6" action="#" method="POST" autocomplete="off">
               <div class="mt-2">
                  <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Nueva Contraseña</label>
                  <input id="password" name="password" type="password"
                     :class="{'border-red-500': passwordError}"
                     class="block w-full rounded-md py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 border sm:text-sm sm:leading-6 pl-2"
                     v-model="passwordValue"
                  >
                  <small v-if="passwordError" class="text-red-500">{{ passwordError }}</small>
               </div>
               <button type="submit"
                  class="flex w-full justify-center rounded-md bg-[#F43F5F] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" @click="submit"
               >Actualizar</button>
            </form>
         </div>
      </div>
   </div>
</template>