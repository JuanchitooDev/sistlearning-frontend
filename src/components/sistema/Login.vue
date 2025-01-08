<template>
  <div>
    <h2>Inicio de Sesión</h2>
    <form @submit.prevent="loginUsuario">
      <div>
        <label for="username">Usuario</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Contraseña</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Iniciar Sesión</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>
  
  <script>
import { ref } from 'vue';
import { useUsuarioStore } from '@/stores/usuarioStore';

const username = ref('');
const password = ref('');
const errorMessage = ref('');
const usuarioStore = useUsuarioStore();

const loginUsuario = async () => {
  try {
    errorMessage.value = '';
    await usuarioStore.login(username.value, password.value);
    alert('Bienvenido');
  } catch (error) {
    errorMessage.value = error.message;
  }
};
</script>
  