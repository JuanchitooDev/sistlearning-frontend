<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <input v-model="username" type="text" placeholder="Username" required />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores';

export default {
  setup() {
    const authStore = useAuthStore();
    const username = ref('');
    const password = ref('');
    const errorMessage = ref('');

    const login = async () => {
      try {
        await authStore.login(username.value, password.value);
        console.log('login de usuario exitoso');
      } catch (error) {
        errorMessage.value = 'Error de autenticación: ' + error.message;
      }
    };

    return {
      login
    }
  },
};
</script>
