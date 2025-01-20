<template>
  <div
    class="bg-gray-600 text-white flex justify-between items-center p-4 shadow-md"
  >
    <div class="text-xl font-semibold">
      <span>{{ username }}</span>
    </div>
    <div>
      <span class="mr-4">{{ moduleName }}</span>
      <button
        @click="logout"
        class="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
      >
        Cerrar Sesión
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useAuthStore } from '@/stores';
import { useRouter } from 'vue-router';
export default {
  name: 'Toolbar',
  setup() {
    const authStore = useAuthStore();
    const username = computed(() => authStore.usuario?.username || 'Usuario')
    const moduleName = 'Dashboard'

    // const router = useRouter();

    // const pageTitle = computed(() => {
    //   return router.currentRoute.value.meta.title || 'Página Principal';
    // });

    const logout = () => {
      authStore.logout();
      router.push('/account/login');
    };

    return {
      username,
      moduleName,
      logout,
    };
  },
};
</script>