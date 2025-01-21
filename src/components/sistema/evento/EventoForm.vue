<template>
  <div
    v-if="isVisible"
    class="modal-overlay fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
  >
    <div class="modal bg-white rounded-lg shadow-lg p-8 w-1/2">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold">
          {{ evento.id ? 'Editar evento' : 'Nuevo evento' }}
        </h2>
        <button
          @click="closeModal"
          :disabled="loading"
          class="text-gray-600 hover:text-gray-800"
        >
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
        <div class="grid grid-cols-2 gap-4">
          <div class="mb-4">
            <label
              for="id_tipoevento"
              class="block text-sm font-medium text-gray-700"
              >Tipo de evento:</label
            >
            <select
              name="id_tipoevento"
              id="id_tipoevento"
              v-model="evento.id_tipoevento"
              class="mt-1 p-2 border border-gray-300 rounded w-full"
            >
              <option v-for="tipo in tipos" :value="tipo.id" :key="tipo.id">
                {{ tipo.nombre }}
              </option>
            </select>
          </div>
          <div class="mb-4">
            <label for="titulo" class="block text-sm font-medium text-gray-700"
              >Nombre:</label
            >
            <input
              v-model="evento.titulo"
              type="text"
              id="titulo"
              autocomplete="off"
              required
              maxlength="70"
              placeholder="Ejm: Crianza de ganado con una dieta saludable"
              class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
            />
          </div>
          <div class="mb-4">
            <label for="fecha" class="block text-sm font-medium text-gray-700"
              >Fecha Inicio:</label
            >
            <input
              v-model="evento.fecha"
              type="date"
              id="fecha"
              autocomplete="off"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
            />
          </div>
          <div class="mb-4">
            <label
              for="fecha_fin"
              class="block text-sm font-medium text-gray-700"
              >Fecha Final:</label
            >
            <input
              v-model="evento.fecha_fin"
              type="date"
              id="fecha_fin"
              autocomplete="off"
              class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
            />
          </div>
          <div class="mb-4">
            <label
              for="duracion"
              class="block text-sm font-medium text-gray-700"
              >Duración:</label
            >
            <input
              v-model="evento.duracion"
              type="text"
              id="duracion"
              autocomplete="off"
              required
              placeholder="80 horas"
              maxlength="10"
              class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
            />
          </div>
          <div class="mb-4">
            <label
              for="modalidad"
              class="block text-sm font-medium text-gray-700"
              >Modalidad:</label
            >
            <select
              name="modalidad"
              id="modalidad"
              v-model="evento.modalidad"
              class="mt-1 p-2 border border-gray-300 rounded w-full"
            >
              <option value="Presencial">PRESENCIAL</option>
              <option value="Virtual">VIRTUAL</option>
              <option value="Mixto">MIXTO</option>
            </select>
          </div>
          <div class="mb-4 col-span-2">
            <label for="temario" class="block text-sm font-medium text-gray-700"
              >Temario:</label
            >
            <textarea
              v-model="evento.temario"
              id="temario"
              autocomplete="off"
              required
              class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300 h-32"
            ></textarea>
          </div>
        </div>
        <div class="flex justify-between">
          <button
            type="submit"
            class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
            :disabled="loading"
          >
            <!-- Spinner cuando está cargando -->
            <svg
              v-if="loading"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-1 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
                fill="none"
              />
            </svg>
            <!-- Texto del botón -->
            <span v-if="!loading">{{
              evento.id ? 'Actualizar' : 'Registrar'
            }}</span>
            <span v-else>Guardando...</span>
          </button>
          <button
            type="button"
            @click="closeModal"
            class="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 ml-4 disabled:bg-blue-300 disabled:cursor-not-allowed"
            :disabled="loading"
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
import { onMounted, ref, watch, computed } from 'vue';
import { useEventoStore } from '@/stores/eventoStore';
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
    evento: {
      type: Object,
      default: () => ({
        id: null,
        titulo: '',
        id_tipoevento: '',
        temario: '',
        fecha: null,
        fecha_fin: '',
        duracion: '',
        modalidad: 'Virtual',
      }),
    },
  },
  emits: ['eventoCreated', 'eventoUpdated'],
  setup(props, { emit }) {
    const evento = ref({
      id: props.evento.id || null,
      titulo: props.evento.titulo || '',
      id_tipoevento: props.evento.id_tipoevento || '',
      temario: props.evento.temario || '',
      fecha: props.evento.fecha || null,
      fecha_fin: props.evento.fecha_fin || '',
      duracion: props.evento.duracion || '',
      modalidad: props.evento.modalidad || 'Virtual',
    });
    const store = useEventoStore();
    const storeTipoEvento = useTipoEventoStore();
    const tipos = computed(() => storeTipoEvento.tipos);

    // Estado de loading
    const loading = ref(false);

    // Computed para obtener el mensaje desde el store
    const message = computed(() => store.message);

    watch(
      () => props.evento,
      (newValue) => {
        evento.value = newValue;
      }
    );

    const submitForm = async () => {
      try {
        loading.value = true; // Activar el spinner
        if (evento.value.id) {
          await store.updateEvento(evento.value.id, evento.value);
          emit('eventoUpdated', store.message);
        } else {
          await store.createEvento(evento.value);
          emit('eventoCreated', store.message);
        }
        resetForm();
        props.onClose();
      } catch (error) {
        console.log('error creating evento', error);
      } finally {
        loading.value = false; // Desactivar el spinner
      }
    };

    const resetForm = () => {
      evento.value = {
        id: null,
        id_tipoevento: '',
        titulo: '',
        temario: '',
        fecha: null,
        fecha_fin: '',
        duracion: '',
        modalidad: 'Virtual',
      };
    };

    const closeModal = () => {
      resetForm();
      props.onClose();
    };

    onMounted(() => {
      storeTipoEvento.fetchTipoEventos(true);
    });

    return {
      tipos,
      evento,
      submitForm,
      closeModal,
      loading,
      message,
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
}
</style>