<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<script>
import { useAuthStore } from '@/stores';

export default {
  name: 'App',
  setup() {
    const authStore = useAuthStore();
    return {
      authStore,
    };
  },
};
</script>

<style></style>