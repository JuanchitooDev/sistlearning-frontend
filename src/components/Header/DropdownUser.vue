<template>
    <div class="relative" ref="target">
        <button @click="dropdownOpen = !dropdownOpen" class="flex items-center gap-3 text-sm focus:outline-none">
            <div class="hidden lg:block text-right">
                <p class="text-sm font-medium text-black dark:text-white">{{ userName }}</p>
                <p class="text-xs font-medium text-gray-500 dark:text-gray-400">{{ userRole }}</p>
            </div>

            <!-- Avatar -->
            <span class="h-12 w-12 overflow-hidden rounded-full">
                <img src="@/assets/images/user/user-01.png" alt="User" />
            </span>

            <!-- Ícono -->
            <svg :class="dropdownOpen && 'rotate-180'" class="hidden sm:block transition-transform" width="12"
                height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M0.41 0.91C0.74 0.59 1.26 0.59 1.59 0.91L6 5.32L10.41 0.91C10.74 0.59 11.26 0.59 11.59 0.91C11.91 1.24 11.91 1.76 11.59 2.09L6.59 7.09C6.26 7.41 5.74 7.41 5.41 7.09L0.41 2.09C0.09 1.76 0.09 1.24 0.41 0.91Z"
                    fill="currentColor" />
            </svg>
        </button>
        
        <!-- Dropdown -->
        <div v-show="dropdownOpen"
            class="absolute right-0 mt-4 w-64 rounded-md border border-stroke bg-white shadow-md dark:border-strokedark dark:bg-boxdark">
            <ul class="px-4 py-3 divide-y divide-gray-200 dark:border-strokedark">
                <li>
                    <router-link to="/profile"
                        class="flex items-center gap-2 py-2 text-sm hover:text-primary"><span>👤</span>
                        Perfil</router-link>
                </li>
                <li>
                    <router-link to="/pages/settings" class="flex items-center gap-2 py-2 text-sm hover:text-primary">
                        <span>⚙️</span> Configuración
                    </router-link>
                </li>
                <li>
                    <button @click="logout"
                        class="flex items-center gap-2 py-2 text-sm hover:text-primary w-full text-left">
                        <span>🚪</span> Cerrar sesión
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'

export default {
    name: 'DropdownUser',
    setup() {
        const user = ref({
            name: 'Thomas Anree',
            role: 'UX Designer',
            avatar: new URL('@/assets/images/user/user-01.png', import.meta.url).href
        })

        const dropdownOpen = ref(false)
        const target = ref(null)
        const router = useRouter()

        onClickOutside(target, () => dropdownOpen.value = false)
        const toggleDropdown = () => dropdownOpen.value = !dropdownOpen.value

        const logout = () => {
            localStorage.removeItem('auth')
            router.push('/login')
        }

        return {
            user,
            dropdownOpen,
            target,
            logout,
            toggleDropdown
        }
    }
}
</script>

<style scoped>
.dropdown-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: inherit;
    transition: color 0.2s ease-in-out;
}

.dropdown-link:hover {
    color: #3b82f6;
    /* Tailwind primary */
}
</style>