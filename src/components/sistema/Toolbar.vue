<template>
  <div class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <span class="text-xl">{{ pageTitle }}</span>
    <button
      @click="logout"
      class="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
    >
      Cerrar Sesión
    </button>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useAuthStore } from '@/stores'
import { useRouter } from 'vue-router'
export default {
    name: 'Toolbar',
    setup() {
        const authStore = useAuthStore()
        const router = useRouter()

        const pageTitle = computed(() => {
            return router.currentRoute.value.meta.title || 'Página Principal'
        })

        const logout = () => {
            authStore.logout()
            router.push('/account/login')
        }

        return {
            pageTitle,
            logout
        }

    }
}
</script>