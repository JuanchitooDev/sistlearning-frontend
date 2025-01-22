<template>
  <div
    :class="[
      'fixed',
      'top-0',
      'left-0',
      'h-full',
      'bg-gray-800',
      { 'w-16': isCollapsed, 'w-64': !isCollapsed },
    ]"
  >
    <div class="flex flex-col items-center py-6">
      <!-- Toggler -->
      <button @click="toggleSidebar" class="text-white mb-4">
        <svg
          v-if="isCollapsed"
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
            d="M6 9l6 6 6-6"
          ></path>
        </svg>
        <svg
          v-else
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

      <!-- Menú de opciones -->
      <nav>
        <ul class="space-y-4">
          <li>
            <router-link
              to="/event-types"
              class="text-white flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 8h10M7 12h10M7 16h10"
                ></path>
              </svg>
              <span v-if="!isCollapsed">Tipos de Evento</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/events"
              class="text-white flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 12l-7 7-7-7"
                ></path>
              </svg>
              <span v-if="!isCollapsed">Eventos</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/students"
              class="text-white flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 14c4 0 7-2 7-5s-3-5-7-5-7 2-7 5 3 5 7 5z"
                ></path>
              </svg>
              <span v-if="!isCollapsed">Alumnos</span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/certificates"
              class="text-white flex items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                class="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v8m4-4H8"
                ></path>
              </svg>
              <span v-if="!isCollapsed">Certificados</span>
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
  
<script>
import { ref } from 'vue';

export default {
  name: 'Sidebar',
  setup() {
    const isCollapsed = ref(false);

    const toggleSidebar = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    return {
      isCollapsed,
      toggleSidebar,
    };
  },
};
</script>
  
  <style scoped>
/* Puedes personalizar estilos aquí si es necesario */
</style>
  