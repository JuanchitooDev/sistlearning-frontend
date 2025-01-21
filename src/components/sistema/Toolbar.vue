<template>
  <div class="bg-gray-800 text-white flex justify-between items-center p-4">
    <div class="flex items-center space-x-4">
      <button @click="toggleSidebar" class="lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="h-6 w-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
      <span class="text-xl">Mi Aplicación</span>
    </div>
    <!-- Puedes agregar más acciones globales aquí -->
  </div>
</template>
  
  <script>
export default {
  name: 'Toolbar',
  props: {
    toggleSidebar: Function,
  },
};
</script>
  
  <style scoped>
/* Estilos adicionales si los necesitas */
</style>
  