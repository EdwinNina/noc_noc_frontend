<script setup lang="ts">
   import { useForm, useField } from 'vee-validate'
   import { forgotPasswordSchema as validationSchema } from '../validations/forgotPasswordSchema';
   import { useForgotPassword } from '../composables/useForgotPassword';
   import { getSweetAlert } from '@/helpers';

   const { handleSubmit } = useForm({ validationSchema })
   const { errorMessage: emailError, value: emailValue } = useField('email')
   const forgotPasswordComp = useForgotPassword()

   const submit = handleSubmit(async (values) => {
      try {
         const response = await forgotPasswordComp.forgotPassword(values as {email: string})
         getSweetAlert(response.message)
      } catch (error: any) {
         getSweetAlert(forgotPasswordComp.errorMesage.value!, false)
      }
   })
</script>

<template>
   <div class="h-screen flex flex-col justify-center items-center">
      <div class="bg-white w-1/3 py-10 rounded shadow">
         <img class="mx-auto w-32" src="/noc_noc_logo.png" alt="Your Company">
         <h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Recuperar mi Contraseña
         </h2>
         <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
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
               <button type="submit"
                  class="flex w-full justify-center rounded-md bg-[#F43F5F] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2" @click="submit"
               >Enviar correo</button>
            </form>
         </div>
      </div>
   </div>
</template>