<template>
  <div
    v-if="isVisible"
    class="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300"
    :class="{ 'opacity-100': isVisible, 'opacity-0': !isVisible }"
    @click="hideNotification"
  >
    {{ message }}
  </div>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 3000,
    },
  },
  setup(props) {
    const isVisible = ref(true);

    watch(isVisible, (newVal) => {
      if (newVal) {
        setTimeout(() => {
          isVisible.value = false;
        }, props.duration);
      }
    });

    const hideNotification = () => {
      isVisible.value = false;
    };

    return {
      isVisible,
      hideNotification,
    };
  },
};
</script>