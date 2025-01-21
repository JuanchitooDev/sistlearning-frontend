<template>
  <aside class="w-64 h-screen bg-gray-800 text-white p-5">
    <h2 class="text-2xl font-semibold mb-5">Menú</h2>
    <ul>
      <li class="mb-4">
        <router-link
          to="/tipo-evento"
          class="hover:text-blue-400"
          active-class="text-blue-400"
        >
          Tipo de Evento
        </router-link>
      </li>
      <li class="mb-4">
        <router-link
          to="/evento"
          class="hover:text-blue-400"
          active-class="text-blue-400"
        >
          Evento
        </router-link>
      </li>
      <li class="mb-4">
        <router-link
          to="/alumno"
          class="hover:text-blue-400"
          active-class="text-blue-400"
        >
          Alumno
        </router-link>
      </li>
      <li class="mb-4">
        <router-link
          to="/certificado"
          class="hover:text-blue-400"
          active-class="text-blue-400"
        >
          Certificado
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script setup>
</script>

<style scoped>
</style>
