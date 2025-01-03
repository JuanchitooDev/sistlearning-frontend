<template>
  <div class="p-4">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl">Evento</h1>
      <button
        @click="openModal"
        class="bg-blue-500 text-white p-2 rounded flex items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 2a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H3a1 1 0 110-2h6V3a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
        Agregar
      </button>
    </div>

    <!-- Campo de búsqueda -->
    <div class="mb-4">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Criterio de búsqueda"
        class="p-2 border border-gray-300 rounded"
        @keydown.enter="filteredEventos"
      />
    </div>

    <table class="min-w-full bg-white border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th class="border px-4 py-2">ID</th>
          <th class="border px-4 py-2">Título</th>
          <th class="border px-4 py-2">Tipo de evento</th>
          <th class="border px-4 py-2">Modalidad</th>
          <th class="border px-4 py-2">Fecha Inicio</th>
          <th class="border px-4 py-2">Fecha Final</th>
          <th class="border px-4 py-2">Estado</th>
          <th class="border px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="paginatedEventos.length === 0">
          <td colspan="8" class="text-center pt-2 pb-2">
            Eventos no registrados
          </td>
        </tr>
        <tr v-for="evento in paginatedEventos" :key="evento.id">
          <td class="border px-4 py-2">{{ evento.id }}</td>
          <td class="border px-4 py-2">{{ evento.titulo }}</td>
          <td class="border px-4 py-2">
            {{ evento.TipoEvento ? evento.TipoEvento.nombre : 'Sin Tipo' }}
          </td>
          <td class="border px-4 py-2">{{ evento.modalidad }}</td>
          <td class="border px-4 py-2">{{ formatDate(evento.fecha) }}</td>
          <td class="border px-4 py-2" v-if="evento.fecha_fin">{{ formatDate(evento.fecha_fin) }}</td>
          <td class="border px-4 py-2" v-else>--</td>
          <td class="border px-4 py-2">
            <svg
              v-if="evento.estado"
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-green-500"
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
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-red-500"
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
          </td>
          <td class="border px-4 py-2 flex space-x-2">
            <button
              @click="editEvento(evento)"
              class="text-blue-500 hover:text-blue-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 4l4 4-8 8H8v-4l8-8z"
                />
              </svg>
            </button>
            <button
              @click="requestDeleteEvento(evento.id)"
              class="text-red-500 hover:text-red-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
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
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Paginación -->
    <div class="mt-4 flex justify-between items-center">
      <button
        @click="prevPage"
        :disabled="currentPage === 1"
        class="px-4 py-2 bg-gray-300 rounded"
      >
        Anterior
      </button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage === totalPages"
        class="px-4 py-2 bg-gray-300 rounded"
      >
        Siguiente
      </button>
    </div>

    <EventoForm
      :isVisible="isModalOpen"
      :onClose="closeModal"
      :evento="evento"
      @eventoCreated="handleEventoCreated"
      @eventoUpdated="handleEventoUpdated"
    />

    <ConfirmDialog
      :isVisible="isConfirmVisible"
      title="Confirmar Eliminación"
      message="¿Estás seguro de que deseas eliminar este evento?"
      @confirmed="deleteEvento"
      @canceled="isConfirmVisible = false"
    />

    <Notification
      v-if="notificationMessage"
      :message="notificationMessage"
      :duration="4000"
      @hide="notificationMessage = ''"
    ></Notification>
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue';
import { useEventoStore } from '../../stores/eventoStore';
import EventoForm from './EventoForm.vue';
import ConfirmDialog from '../common/ConfirmDialog.vue';
import Notification from '../common/Notification.vue';
import { formatDate } from '@/utils/date.utils';

export default {
  components: {
    EventoForm,
    ConfirmDialog,
    Notification,
  },
  setup() {
    const isConfirmVisible = ref(false);
    const notificationMessage = ref('');
    const eventoStore = useEventoStore();
    const isModalOpen = ref(false);
    const evento = ref({
      id: null,
      id_tipoevento: '',
      titulo: '',
      modalidad: '',
    });
    const eventoToDelete = ref(null);

    const eventos = computed(() => eventoStore.eventos);

    // Computed para obtener el mensaje desde el store
    const message = computed(() => eventoStore.message);

    const searchQuery = ref('');

    const currentPage = ref(1);

    const perPage = 10;

    const filteredEventos = computed(() => {
      const query = searchQuery.value.toLowerCase();
      currentPage.value = 1;
      return eventos.value.filter((evento) => {
        return evento.titulo.toLowerCase().includes(query);
      });
    });

    const totalPages = computed(() => {
      return Math.ceil(filteredEventos.value.length / perPage);
    });

    const paginatedEventos = computed(() => {
      const start = (currentPage.value - 1) * perPage;
      const end = start + perPage;
      return filteredEventos.value.slice(start, end);
    });

    const prevPage = () => {
      if (currentPage.value > 1) currentPage.value--;
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) currentPage.value++;
    };

    const openModal = () => {
      evento.value = {
        id: null,
        id_tipoevento: '',
        titulo: '',
        modalidad: '',
      }; // Resetea el formulario
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const editEvento = (ev) => {
      const temario = ev.temario ? ev.temario : '';
      const fecha = ev.fecha ? ev.fecha.slice(0, 10) : null;
      
      evento.value = { ...ev }; // Cargar los datos del tipo a editar
      evento.value.temario = temario;
      evento.value.fecha = fecha;

      isModalOpen.value = true;
    };

    const requestDeleteEvento = (id) => {
      eventoToDelete.value = id;
      isConfirmVisible.value = true;
    };

    const deleteEvento = async () => {
      if (eventoToDelete.value) {
        await eventoStore.deleteEvento(eventoToDelete.value);
        // notificationMessage.value = 'Evento eliminado correctamente';
        notificationMessage.value = message;
        isConfirmVisible.value = false; // Cerrar el diálogo
        eventoToDelete.value = null; // Resetear el ID a eliminar
      }
    };

    const handleEventoCreated = () => {
      isModalOpen.value = false;
      notificationMessage.value = message;
      eventoStore.fetchEventos(); // Actualiza la lista después de crear
    };

    const handleEventoUpdated = () => {
      isModalOpen.value = false;
      notificationMessage.value = message;
      eventoStore.fetchEventos(); // Actualiza la lista después de editar
    };

    onMounted(() => {
      eventoStore.fetchEventos();
    });

    return {
      eventos,
      searchQuery,
      filteredEventos,
      currentPage,
      totalPages,
      paginatedEventos,
      prevPage,
      nextPage,
      openModal,
      closeModal,
      editEvento,
      isModalOpen,
      evento,
      requestDeleteEvento,
      isConfirmVisible,
      deleteEvento,
      handleEventoCreated,
      handleEventoUpdated,
      formatDate,
      notificationMessage,
      message,
    };
  },
};
</script>

<style scoped>
/* Agrega tus estilos aquí si es necesario */
</style>
