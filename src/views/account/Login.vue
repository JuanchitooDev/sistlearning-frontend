<template>
  <div class="login-background min-h-screen flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <h2 class="text-2xl font-semibold text-center text-white mb-6">INICIAR SESIÓN</h2>
      <p v-if="reasonMessage" class="error">{{ reasonMessage }}</p>
      <LoginForm />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import LoginForm from '@/components/Sistema/Auth/LoginForm.vue';
import { useRoute } from 'vue-router'

export default {
  name: 'Login',
  components: {
    LoginForm,
  },
  setup() {
    const route = useRoute()

    const reasonMessage = computed(() => {
      if (route.query.reason === 'Token expirado') return 'Tu sesión ha expirado. Por favor inicia sesión nuevamente.'
      if (route.query.reason === 'Token inválido') return 'Tu token es inválido. Por favor inicia sesión nuevamente.'
      return ''
    })

    return {
      reasonMessage
    }
  }
};
</script>

<style scoped>
.login-background {
  background: url('@/assets/images/login-background.jpg') no-repeat center center;
  background-size: cover;
  min-height: 100vh;
}

.error {
  color: red;
  margin-bottom: 10px;
}
</style>
