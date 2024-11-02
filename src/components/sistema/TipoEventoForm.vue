<template>
  <div
    v-if="isVisible"
    class="modal-overlay fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
  >
    <div class="modal bg-white rounded-lg shadow-lg p-8 w-1/2">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold">
          {{ tipoEvento.id ? 'Editar tipo de evento' : 'Nuevo tipo de evento' }}
        </h2>
        <button @click="closeModal" class="text-gray-600 hover:text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="nombre" class="block text-sm font-medium text-gray-700"
            >Nombre:</label
          >
          <input
            v-model="tipoEvento.nombre"
            type="text"
            id="nombre"
            autocomplete="off"
            required
            placeholder="Ejm: Capacitación"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
          />
        </div>
        <div class="mb-4">
          <label
            for="descripcion"
            class="block text-sm font-medium text-gray-700"
            >Descripción:</label
          >
          <textarea
            v-model="tipoEvento.descripcion"
            id="descripcion"
            placeholder="Ejm: Tipo de eventos de corta duración"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
          ></textarea>
        </div>
        <div class="flex justify-between">
          <button
            type="submit"
            class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            {{ tipoEvento.id ? 'Actualizar' : 'Registrar' }}
          </button>
          <button
            type="button"
            @click="closeModal"
            class="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 ml-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import { useTipoEventoStore } from '@/stores/tipoEventoStore';

export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
    tipoEvento: {
      type: Object,
      default: () => ({ id: null, nombre: '', descripcion: '' }),
    },
  },
  emits: ['tipoEventoCreated', 'tipoEventoUpdated'],
  setup(props, { emit }) {
    const tipoEvento = ref(props.tipoEvento);
    const store = useTipoEventoStore();

    watch(
      () => props.tipoEvento,
      (newValue) => {
        tipoEvento.value = newValue;
      }
    );

    const submitForm = async () => {
      try {
        if (tipoEvento.value.id) {
          await store.updateTipoEvento(tipoEvento.value.id, tipoEvento.value);
          emit('tipoEventoUpdated');
        } else {
          await store.createTipoEvento(tipoEvento.value);
          emit('tipoEventoCreated');
        }
        resetForm();
        props.onClose();
      } catch (error) {
        console.log('error creating tipo evento', error);
      }
    };

    const resetForm = () => {
      tipoEvento.value = {
        id: null,
        nombre: '',
        descripcion: '',
      };
    };

    const closeModal = () => {
      resetForm();
      props.onClose();
    };

    return {
      tipoEvento,
      submitForm,
      closeModal,
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