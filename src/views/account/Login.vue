<template>
  <div>
    <h2>Iniciar Sesión</h2>
    <FormLogin />
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores';
import FormLogin from '@/components/sistema/Login.vue';

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
