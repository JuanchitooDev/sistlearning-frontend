<template>
  <div class="flex h-screen bg-gray-100">
    <SideNav />
    <!-- <div class="content"> -->
    <div class="flex-1 overflow-auto">
      <TopBar />
      <router-view />
    </div>
  </div>
</template>

<script>
import { SideNav } from "@/components"
import { TopBar } from "@/components"

export default {
  name: 'App',
  components: {
    SideNav,
    TopBar
  }
}
</script>

<style scoped>
body {
  background-color: #f1f5f8;
  margin: 0;
  font-family: 'Roboto', sans-serif;
}

.content {
  --tw-bg-opacity: 1;
  background-color: rgba(241, 245, 248, var(--tw-bg-opacity));
  border-radius: 30px;
  /* flex: 1 1 0%; */
  flex: 1;
  min-height: 95vh;
  /* min-width: 0; */
  padding: 0 22px;
  padding-bottom: 2.5rem;
}
</style>
