<template>
    <header class="flex items-center justify-end bg-white px-4 py-2 shadow dark:bg-gray-800">
        <div class="relative" @click="toggleDropdown">
            <div class="flex items-center gap-2 cursor-pointer">
                <img
                v-if="usuario?.imagen"
                :src="usuario.imagen"
                alt="User"
                class="h-8 w-8 rounded-full object-cover border"
                />
                <div v-else class="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center text-white">
                    <span class="text-sm">{{ userInitials.tag }}</span>
                </div>
                <span class="text-sm font-medium text-gray-800 dark:text-white">{{ userInitials.nombre || 'Usuario' }}</span>
            </div>

        <!-- Dropdown -->
            <div v-if="dropdownOpen"
                class="absolute right-0 mt-2 w-40 rounded-md bg-white shadow-lg dark:bg-gray-700 z-10">
                <ul class="py-1">
                    <li>
                        <button
                        class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600"
                        @click="logout"
                        >
                        Cerrar sesión
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </header>
</template>

<script>
import { ref, computed, onMounted } from "vue"
import { useAuthStore } from "@/stores"

export default {
    name: 'Header',
    setup() {
        const dropdownOpen = ref(false)
        const usuario = ref(null)

        const authStore = useAuthStore()

        // Cargar usuario desde localStorage
        onMounted(() => {
            const authData = localStorage.getItem('auth')
            if (authData) {
                const parsed = JSON.parse(authData)
                if (parsed?.usuario) {
                    usuario.value = parsed.usuario
                }
            }
        })

        const toggleDropdown = () => {
            dropdownOpen.value = !dropdownOpen.value
        }

        const logout = () => {
            dropdownOpen.value = false
            authStore.logout()
        }

        // Iniciales del usuario
        const userInitials = computed(() => {
            if (!usuario.value) return 'U'
            const parts = usuario.value.usuario?.split(' ') || []
            const first = parts[0]?.charAt(0) || ''
            const last = parts[1]?.charAt(1) || ''
            const usuarioLogged = {
                tag: `${first}${last}`.toUpperCase(),
                nombre: usuario.value.usuario 
            }
            return usuarioLogged
        })

        return {
            dropdownOpen,
            toggleDropdown,
            logout,
            userInitials
        }
    }
}

</script>