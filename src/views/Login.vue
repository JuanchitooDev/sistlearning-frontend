<template>
  <div class="flex justify-center items-center h-screen bg-gray-200">
    <div class="w-full sm:w-96 bg-white p-6 rounded-lg shadow-lg">
      <LoginForm />
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/Sistema/Auth/LoginForm.vue';

export default {
  components: {
    LoginForm,
  },
};
</script>