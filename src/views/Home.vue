<template>
  <div v-if="usuario">
    <h1>Hola {{ usuario.username }}</h1>
    <p>Estás logueado en la aplicación</p>
    <p><router-link to="/usuarios">Gestión de usuarios</router-link></p>
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