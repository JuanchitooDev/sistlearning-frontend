<template>
  <div>
    <RouterView />
    <ToastContainer />
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import ToastContainer from './components/Common/ToastContainer.vue';

export default {
  name: 'App',
  components: {
    ToastContainer
  },
  setup() {

    return {
      RouterView,
    };
  },
};
</script>