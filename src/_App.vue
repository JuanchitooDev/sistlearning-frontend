<template>
  <div id="app" class="font-montserrat text-sm">
    <Toolbar />
    <div class="flex">
      <Sidebar />
      <main class="flex-1 p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/sistema/__Sidebar.vue';
import Toolbar from './components/sistema/__Toolbar.vue';

export default {
  components: {
    Sidebar,
    Toolbar,
  },
};
</script>