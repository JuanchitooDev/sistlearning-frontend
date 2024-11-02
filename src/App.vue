<template>
  <div id="app">
    <div class="flex">
      <Sidebar />
      <main class="flex-1 p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/sistema/Sidebar.vue';
export default {
  components: {
    Sidebar,
  },
};
</script>