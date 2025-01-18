<template>
  <div v-if="usuario">
    <!-- <h1>Hola {{ usuario.username }}</h1>
    <p>Estás logueado en la aplicación</p>
    <p><router-link to="/usuarios">Gestión de usuarios</router-link></p> -->
    <div class="min-h-screen flex flex-col md:flex-row">
      <!-- Sidebar -->
      <div class="w-full md:w-64 bg-gray-800 text-white p-4">
        <h2 class="text-xl font-semibold mb-4">Sidebar</h2>
        <ul>
          <li class="mb-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
            Opción 1
          </li>
          <li class="mb-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
            Opción 2
          </li>
          <li class="mb-2 hover:bg-gray-700 p-2 rounded cursor-pointer">
            Opción 3
          </li>
        </ul>
      </div>

      <!-- Contenedor Principal -->
      <div class="flex-1 p-6 bg-gray-100">
        <h1 class="text-3xl font-bold">Contenedor Principal</h1>
        <p class="mt-4">Aquí se mostrará el contenido principal de la aplicación</p>
      </div>
    </div>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';

export default {
  setup() {
    const authStore = useAuthStore();
    const { usuario } = storeToRefs(authStore);

    return {
      usuario,
    };
  },
};
</script>