<template>
    <aside class="absolute left-0 top-0 flex h-screen w-72 flex-col overflow-y-auto bg-green-100 duration-300 ease-linear dark:bg-gray-800 lg:static">
        <!-- Header -->
        <div class="flex items-center justify-between p-4">
            <router-link to="/">
                <img src="@/assets/images/logo_transparente_small.png" alt="Perúagro" class="h-8" />
            </router-link>
        </div>

        <!-- Información de usuario -->
        <div v-if="usuario" class="px-4 pb-4 text-sm text-gray-700 dark:text-white">
            <div class="font-semibold">{{ usuario.usuario }}</div>
            <div class="text-xs text-gray-500 dark:text-gray-400">{{ usuario.nombre_perfil }}</div>
        </div>

        <!-- Menu -->
        <nav class="px-4">
            <h3 class="mb-2 text-xs font-semibold uppercase text-gray-600 dark:text-gray-400">Menú</h3>
            <ul class="space-y-2">
                <li v-for="(item, index) in filteredMenuItems" :key="index">
                    <router-link
                        :to="item.route"
                        :class="[
                        'flex items-center gap-3 rounded px-3 py-2 text-sm hover:bg-green-200 dark:hover:bg-gray-700',
                        route.path.startsWith(item.route)
                            ? 'bg-green-300 font-medium text-green-900 dark:bg-gray-700'
                            : 'text-gray-700 dark:text-white'
                        ]"
                    >
                        <component :is="item.icon" class="h-5 w-5" />
                        <span>{{ item.label }}</span>
                    </router-link>
                </li>
            </ul>
        </nav>
    </aside>
</template>

<script>
import { ref, computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import { MENU_ITEMS } from "@/utils/menu"

export default {
    name: 'SidebarArea',
    setup() {
        const usuario = ref(null)
        const route = useRoute()

        // Leer usuario desde localStorage
        onMounted(() => {
            const authData = localStorage.getItem('auth')
            if (authData) {
                const parsed = JSON.parse(authData)
                if (parsed.usuario) {
                    usuario.value = parsed.usuario
                }
            }
        })

        // Filtrar menú según perfil
        const filteredMenuItems = computed(() => {
            return MENU_ITEMS.filter(item => item.roles.includes(usuario?.value?.slug_perfil.toLowerCase()))
        })

        return {
            filteredMenuItems,
            usuario,
            route
        }
    }
}

</script>