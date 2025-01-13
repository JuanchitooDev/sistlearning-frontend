<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-8 offset-sm-2 mt-5">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores';
import { router } from '@/router';

const authStore = useAuthStore();
if (authStore.usuario) {
  router.push('/');
}
</script>
