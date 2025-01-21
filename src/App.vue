<template>
  <div class="app-container" :class="authStore.usuario && 'bg-light'">
    <!-- <Navbar /> -->
    <div class="container pt-4 pb-4">
      <router-view />
    </div>
  </div>
</template>

<script>
import { Navbar } from '@/components';
import { useAuthStore } from '@/stores';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  setup() {
    const authStore = useAuthStore();

    return {
      authStore
    }
  },
};
</script>

<style></style>