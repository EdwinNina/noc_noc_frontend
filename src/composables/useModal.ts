import { ref } from "vue"

export const useModal = () => {
   const isModalOpen = ref<boolean>(false)

   const openModal = () => {
      isModalOpen.value = true
   }

   const closeModal = () => {
      isModalOpen.value = false
   }

   return {
      isModalOpen,
      openModal,
      closeModal
   }
}