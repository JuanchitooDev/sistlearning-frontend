<template>
  <div>
    <h2 class="text-2xl font-semibold text-center mb-4">Iniciar Sesión</h2>
    <form @submit.prevent="login">
      <div class="mb-4">
        <label for="username" class="block text-gray-700">Username</label>
        <input
          v-model="usuario.username"
          id="username"
          type="text"
          placeholder="Tu usuario"
          required
          class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div class="mb-6">
        <label for="password" class="block text-gray-700">Contraseña</label>
        <input
          v-model="usuario.password"
          id="password"
          type="password"
          placeholder="Tu contraseña"
          required
          class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
      >
        Iniciar Sesión
      </button>
    </form>

    <p v-if="errorMessage" class="mt-4 text-center text-red-500">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores';

export default {
  setup() {
    const authStore = useAuthStore();
    const usuario = ref({
      username: '',
      password: '',
    });
    const errorMessage = ref('');

    const login = async () => {
      try {
        await authStore.login(usuario.value.username, usuario.value.password);
        console.log('Login exitoso');
      } catch (error) {
        errorMessage.value = 'Error de autenticación: ' + error.message;
      }
    };

    return {
      usuario,
      errorMessage,
      login,
    };
  },
};
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si lo deseas */
</style>

