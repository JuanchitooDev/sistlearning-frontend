<template>
  <div v-if="isVisible" class="modal-overlay fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
    <div class="modal bg-white rounded-lg shadow-lg p-8 w-1/3">
      <h2 class="text-lg font-semibold">{{ title }}</h2>
      <p class="mt-4">{{ message }}</p>
      <div class="flex justify-end mt-6">
        <button @click="confirm"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200">
          Sí
        </button>
        <button @click="cancel" class="ml-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400">
          No
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: 'Confirmar',
    },
    message: {
      type: String,
      default: '¿Estás seguro de que deseas continuar?',
    },
  },
  emits: ['confirmed', 'canceled'],
  setup(props, { emit }) {
    const confirm = () => {
      emit('confirmed');
    };

    const cancel = () => {
      emit('canceled');
    };

    return {
      confirm,
      cancel,
    };
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 400px;
}
</style>