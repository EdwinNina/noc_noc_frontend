<script setup lang="ts">
   import { reactive } from 'vue'
   import { useReport } from '@/composables/useReport';
import { getSweetAlert } from '../../helpers/index';
   
   const initialData = {
      dateFrom: '',
      dateTo: ''
   }
   const forms = reactive({...initialData})
   const { errorMesage, getReport } = useReport()

   const generateReport = async () => {
      if(!forms.dateFrom || !forms.dateTo) {
         getSweetAlert('Los campos son obligatorios para la generacion del reporte', false)
         return
      }
      const response = await getReport({...forms})

      if(errorMesage.value) {
         return getSweetAlert(errorMesage.value, false)
      }
      getSweetAlert(response.message)
   }
</script>

<template>
   <div class="bg-white rounded w-full p-6 shadow">
      <div class="px-20">
         <h1 class="text-gray-700 font-bold text-xl border-b-2 pb-2">Reportes de Tareas</h1>
         <div class="grid grid-cols-5 gap-5 my-12">
            <div class="col-span-2">
               <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                  Fecha de Inicio
               </label>
               <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username" type="date" v-model="forms.dateFrom">
            </div>
            <div class="col-span-2">
               <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
                  Username
               </label>
               <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username" type="date" v-model="forms.dateTo">
            </div>
            <div class="col-span-1">
               <button class="btn btn-outline btn-primary" @click="generateReport">Generar</button>
            </div>
         </div>
      </div>
   </div>
</template>