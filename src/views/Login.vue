<template>
  <div class="flex justify-center items-center h-screen bg-gray-200">
    <div class="w-full sm:w-96 bg-white p-6 rounded-lg shadow-lg">
      <Login />
    </div>
  </div>
</template>

<script>
import Login from '@/components/Sistema/Auth/Login.vue';

export default {
  components: {
    Login,
  },
};
</script>