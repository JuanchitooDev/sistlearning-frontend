<template>
  <nav class="bg-gray-800 p-4">
    <ul class="flex space-x-4">
      <li>
        <router-link to="/" class="text-white hover:text-gray-400"
          >Inicio</router-link
        >
      </li>
      <li>
        <router-link to="tipo-evento" class="text-white hover:text-gray-400"
          >Tipo de Evento</router-link
        >
      </li>
      <li>
        <router-link to="cargo" class="text-white hover:text-gray-400"
          >Cargo</router-link
        >
      </li>
      <li>
        <router-link to="trabajador" class="text-white hover:text-gray-400"
          >Trabajador</router-link
        >
      </li>
      <li>
        <router-link to="evento" class="text-white hover:text-gray-400"
          >Evento</router-link
        >
      </li>
      <li>
        <router-link to="alumno" class="text-white hover:text-gray-400"
          >Alumno</router-link
        >
      </li>
      <li>
        <router-link to="/" class="text-white hover:text-gray-400"
          >Pago</router-link
        >
      </li>
      <li>
        <router-link to="/certificado" class="text-white hover:text-gray-400"
          >Certificado</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>