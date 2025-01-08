<template>
  <div class="flex">
    <Sidebar />
    <div class="flex-1">
      <Toolbar :toggleSidebar="toggleSidebar" />
      <router-view />
    </div>
  </div>
</template>
  
<script>
import Sidebar from './components/sistema/Sidebar.vue';
import Toolbar from './components/sistema/Toolbar.vue';

export default {
  name: 'App',
  components: {
    Sidebar,
    Toolbar,
  },
  methods: {
    toggleSidebar() {
      this.$refs.sidebar.toggleSidebar();
    },
  },
};
</script>
  
<style>
</style>
  