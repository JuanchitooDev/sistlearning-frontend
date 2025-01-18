<template>
  <div class="w-64 bg-gray-800 text-white min-h-screen p-4">
    <div class="flex flex-col space-y-4">
      <router-link to="/dashboard" class="text-lg hover:text-gray-400">
        Dashboard
      </router-link>
      <router-link to="/usuarios" class="text-lg hover:text-gray-400">
        Usuarios
      </router-link>
      <router-link to="/alumnos" class="text-lg hover:text-gray-400">
        Estudiantes
      </router-link>
      <router-link to="/eventos" class="text-lg hover:text-gray-400">
        Eventos
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
    name: 'Sidebar'
}
</script>

<style scoped></style>