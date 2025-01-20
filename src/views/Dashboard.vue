<template>
  <div class="flex h-screen">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Toolbar />
      <div class="p-4 bg-gray-100 flex-1">
        <h2 class="text-2xl font-semibold">Bienvenido al Dashboard</h2>
        <p>Contenido del Dashboard...</p>
      </div>
    </div>
  </div>
</template>
  
<script>
import Sidebar from '@/components/sistema/Sidebar.vue';
import Toolbar from '@/components/sistema/Toolbar.vue';

export default {
  components: {
    Sidebar,
    Toolbar,
  },
};
</script>