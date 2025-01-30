<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold text-center text-gray-800 mb-6">
        Iniciar Sesión
      </h2>
      <FormLogin />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores';
import FormLogin from '@/components/Sistema/Login.vue';

export default {
  name: 'Login',
  components: {
    FormLogin,
  },
  setup() {
    const authStore = useAuthStore();
    const usuario = ref({
      username: '',
      password: '',
    });

    const login = async () => {
      try {
        await authStore.login(usuario.value.username, usuario.value.password);
        console.log('Login exitoso');
      } catch (error) {
        console.error(error);
        // errorMessage.value = 'Credenciales incorrectas. Por favor, intente de nuevo.';
      }
    };

    return {
      usuario,
      login,
    };
  },
};
</script>

<style scoped>
/* Puedes agregar estilos personalizados si es necesario */
</style>
