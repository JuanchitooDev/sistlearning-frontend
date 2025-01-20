<template>
  <div class="w-64 h-screen bg-gray-800 text-white p-4">
    <ul class="space-y-4">
      <li>
        <router-link
          to="/dashboard"
          class="block py-2 px-4 rounded-md hover:bg-gray-700"
        >
          Dashboard
        </router-link>
      </li>
      <li>
        <router-link
          to="/usuarios"
          class="block py-2 px-4 rounded-md hover:bg-gray-700"
        >
          Usuarios
        </router-link>
      </li>
      <li>
        <router-link
          to="/eventos"
          class="block py-2 px-4 rounded-md hover:bg-gray-700"
        >
          Eventos
        </router-link>
      </li>
      <li>
        <router-link
          to="/alumnos"
          class="block py-2 px-4 rounded-md hover:bg-gray-700"
        >
          Alumnos
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
};
</script>

<style scoped></style>