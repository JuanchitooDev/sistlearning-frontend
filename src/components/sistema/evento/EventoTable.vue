<template>
  <div
    class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <div class="flex items-center justify-between mb-4">
      <h4 class="mb-6 text-sm font-semibold text-black dark:text-white">Listado</h4>
      <button @click="openModal" class="bg-blue-500 text-white p-2 rounded flex items-center text-xs">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M10 2a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H3a1 1 0 110-2h6V3a1 1 0 011-1z"
            clip-rule="evenodd" />
        </svg>
        Agregar
      </button>
    </div>
    <div class="flex flex-col">
      <div class="grid grid-cols-8 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-8">
        <div class="p-2.5 text-center xl:py-5 xl:px-1">
          <h5 class="text-xs font-medium uppercase xsm:text-sm">ID</h5>
        </div>
        <div class="p-2.5 text-center xl:py-5 xl:px-1">
          <h5 class="text-xs font-medium uppercase xsm:text-sm">Título</h5>
        </div>
        <div class="p-2.5 text-center xl:p-5">
          <h5 class="text-xs font-medium uppercase xsm:text-sm">Tipo de evento</h5>
        </div>
        <div class="p-2.5 text-center sm:block xl:p-5">
          <h5 class="text-xs font-medium uppercase xsm:text-sm">Modalidad</h5>
        </div>
        <div class="p-2.5 text-center sm:block xl:p-5">
          <h5 class="text-xs font-medium uppercase xsm:text-sm">Fecha Inicio</h5>
        </div>
        <div class="p-2.5 text-center sm:block xl:p-5">
          <h5 class="text-xs font-medium uppercase xsm:text-sm">Fecha Final</h5>
        </div>
        <div class="p-2.5 text-center sm:block xl:p-5">
          <h5 class="text-xs font-medium uppercase xsm:text-sm">Estado</h5>
        </div>
        <div class="p-2.5 text-center sm:block xl:p-5">
          <h5 class="text-xs font-medium uppercase xsm:text-sm">Acciones</h5>
        </div>
      </div>

      <div v-if="eventos.length == 0">
        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <p class="text-black dark:text-white">Eventos no registrados</p>
        </div>
      </div>
      <div v-for="(evento, index) in eventos" :key="evento.id" :class="`grid grid-cols-8 sm:grid-cols-8 ${index === eventos.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
        }`">
        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <p class="text-black dark:text-white text-xs xsm:text-sm">{{ evento.id }}</p>
        </div>
        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <p class="text-black dark:text-white text-xs xsm:text-sm">{{ evento.titulo }}</p>
        </div>
        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <p class="text-black dark:text-white text-xs xsm:text-sm">{{ evento.TipoEvento ? evento.TipoEvento.nombre : 'Sin Tipo' }}</p>
        </div>
        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <p class="text-black dark:text-white text-xs xsm:text-sm">{{ evento.modalidad }}</p>
        </div>
        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <p class="text-black dark:text-white text-xs xsm:text-sm">{{ formatDate(evento.fecha) }}</p>
        </div>
        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <p v-if="evento.fecha_fin" class="text-black dark:text-white text-xs xsm:text-sm">{{ formatDate(evento.fecha) }}</p>
          <p v-else class="text-black dark:text-white text-xs xsm:text-sm">--</p>
        </div>
        <div class="items-center justify-center p-2.5 sm:flex xl:p-5">
          <svg v-if="evento.estado" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <div class="items-center justify-center p-2.5 sm:flex xl:p-5">
          <button @click="editEvento(evento)" class="text-blue-500 hover:text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4l4 4-8 8H8v-4l8-8z" />
            </svg>
          </button>
          <button @click="requestDeleteEvento(evento.id)" class="text-red-500 hover:text-red-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <EventoForm :isVisible="isModalOpen" :onClose="closeModal" :evento="evento" @eventoCreated="handleEventoCreated"
      @eventoUpdated="handleEventoUpdated" />

    <ConfirmDialog :isVisible="isConfirmVisible" title="Confirmar Eliminación"
      message="¿Estás seguro de que deseas eliminar este evento?" @confirmed="deleteEvento"
      @canceled="isConfirmVisible = false" />

    <Notification v-if="notificationMessage" :message="notificationMessage" :duration="4000"
      @hide="notificationMessage = ''"></Notification>
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue';
import { useEventoStore } from '@/stores';
import EventoForm from './EventoForm.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import Notification from '@/components/common/Notification.vue';
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
