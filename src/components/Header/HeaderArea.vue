<template>
  <header class="sticky top-0 flex w-full bg-white shadow dark:bg-boxdark">
    <div class="flex flex-grow items-center justify-between py-4 px-4 md:px-6 2xl:px-11">
      <!-- Botón de Sidebar -->
      <div class="flex items-center gap-2 sm:gap-4 lg:hidden">
        <button class="rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark"
          @click="sidebarStore.toggleSidebar">
          <!-- icono menú -->
          <span class="block h-5 w-5">☰</span>
        </button>
        <router-link class="block lg:hidden" to="/">
          <img src="@/assets/images/logo_transparente_small.png" alt="PerúAgro" class="h-8" />
        </router-link>
      </div>
      <div class="flex items-center gap-4">
        <!-- User Area -->
        <DropdownUser />
        <!-- User Area -->
      </div>
    </div>
  </header>
</template>

<script>
import { useSidebarStore } from "@/stores"
import DropdownUser from './DropdownUser.vue';

export default {
  name: 'HeaderArea',
  components: {
    DropdownUser
  },
  setup() {
    const sidebarStore = useSidebarStore()

    return {
      sidebarStore
    }
  }
}
</script>