<template>
  <div class="h-full w-64 bg-gray-800 text-white shadow-lg">
    <div class="p-4">
      <h1 class="text-2xl font-semibold">Mi Aplicación</h1>
    </div>
    <nav class="mt-5">
      <ul>
        <li v-for="item in menuItems" :key="item.name" class="my-2">
          <router-link
            :to="item.path"
            class="flex items-center p-2 hover:bg-gray-700 rounded transition duration-200"
            active-class="bg-gray-700"
          >
            <item.icon class="w-6 h-6 mr-3" />
            <span>{{ item.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref } from 'vue';
import { HomeIcon, EventIcon, SettingsIcon } from '@heroicons/vue/outline';

export default {
  setup() {
    const menuItems = ref([
      { name: 'Inicio', path: '/', icon: HomeIcon },
      { name: 'Tipo de evento', path: '/tipo-evento', icon: EventIcon },
      { name: 'Evento', path: '/evento', icon: SettingsIcon },
    ]);

    return {
      menuItems,
    };
  },
};
</script>

<style scoped>
/* Estilos adicionales si es necesario */
</style>
