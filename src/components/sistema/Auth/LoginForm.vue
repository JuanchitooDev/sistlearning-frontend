<template>
  <div class="flex items-center justify-center">
    <div class="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
      <!-- Logo -->
      <div class="flex justify-center mb-8">
        <img src="@/assets/images/logo_transparente_small.png" alt="PERÚAGRO" class="h-20 w-auto" />
      </div>
      <!-- Formulario -->
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="username" class="block text-gray-700 font-medium">Username</label>
          <input v-model="usuario.username" id="username" type="text" placeholder="Tu usuario" autocomplete="off"
            required
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div class="mb-6">
          <label for="password" class="block text-gray-700">Contraseña</label>
          <input v-model="usuario.password" id="password" type="password" placeholder="Tu contraseña" autocomplete="off"
            required
            class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <button type="submit" :disabled="loading"
          class="w-full bg-greenwhite-600 text-white py-2 rounded-lg hover:bg-greenwhite-700 transition duration-300 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed flex justify-center items-center">
          <svg v-if="loading" class="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          <span v-if="!loading">Iniciar Sesión</span>
          <span v-else>Verificando...</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore, useToastStore } from '@/stores';

export default {
  name: 'LoginForm',
  setup() {
    const authStore = useAuthStore()
    const toastStore = useToastStore()

    const usuario = ref({
      username: '',
      password: '',
    });

    const loading = ref(false)

    const login = async () => {
      loading.value = true

      try {
        await authStore.login(usuario.value.username, usuario.value.password);
        const classToast = (authStore.result) ? 'success' : 'error'
        toastStore.addToast(authStore.message, classToast)
      } catch (error) {
        const message = error.message || "Credenciales incorrectas"
        toastStore.addToast(message, "error")
      } finally {
        loading.value = false
      }
    };

    return {
      usuario,
      login,
      loading
    };
  },
};
</script>

<style scoped>
/* Puedes agregar estilos personalizados aquí si lo deseas */
</style>
