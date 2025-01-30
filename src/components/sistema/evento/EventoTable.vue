<template>
  <div
    class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <div class="flex items-center justify-between mb-4">
      <h4 class="mb-6 text-sm font-semibold text-black dark:text-white">Listado</h4>
      <router-link to="/evento/nuevo" class="bg-blue-500 text-white p-2 rounded flex items-center text-xs">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M10 2a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H3a1 1 0 110-2h6V3a1 1 0 011-1z"
            clip-rule="evenodd" />
        </svg>
        Agregar
      </router-link>
    </div>
    <div class="flex flex-col">
      <div class="grid grid-cols-8 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-8">
        <div class="p-2.5 xl:p-5">
          <h5 class="text-xs font-medium uppercase xsm:text-sm">ID</h5>
        </div>
        <div class="p-2.5 text-center xl:p-5">
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
        <div class="flex p-2.5 xl:p-5">
          <p class="text-black dark:text-white text-xs xsm:text-sm">{{ evento.id }}</p>
        </div>
        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <p class="text-black dark:text-white text-xs xsm:text-sm">{{ evento.titulo }}</p>
        </div>
        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <p class="text-black dark:text-white text-xs xsm:text-sm">{{ evento.TipoEvento ? evento.TipoEvento.nombre :
            'Sin Tipo' }}</p>
        </div>
        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <p class="text-black dark:text-white text-xs xsm:text-sm">{{ evento.modalidad }}</p>
        </div>
        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <p class="text-black dark:text-white text-xs xsm:text-sm">{{ formatDate(evento.fecha) }}</p>
        </div>
        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <p v-if="evento.fecha_fin" class="text-black dark:text-white text-xs xsm:text-sm">{{ formatDate(evento.fecha_fin) }}</p>
          <p v-else class="text-black dark:text-white text-xs xsm:text-sm">--</p>
        </div>
        <div class="items-center justify-center p-2.5 sm:flex xl:p-5">
          <svg v-if="evento.estado" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div class="items-center justify-center p-2.5 sm:flex xl:p-5">
          <router-link :to="{
            name: 'editEvento',
            params: { id: evento.id }
          }" class="text-blue-500 hover:text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4l4 4-8 8H8v-4l8-8z" />
            </svg>
          </router-link>
          <button @click="requestDeleteEvento(evento.id)" class="text-red-500 hover:text-red-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

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
import ConfirmDialog from '@/components/Common/ConfirmDialog.vue';
import Notification from '@/components/Common/Notification.vue';
import { formatDate } from "@/utils/date.utils"

export default {
  components: {
    ConfirmDialog,
    Notification
  },
  setup() {
    const isConfirmVisible = ref(false);
    const notificationMessage = ref('');
    const eventoStore = useEventoStore();
    const eventoToDelete = ref(null);

    const eventos = computed(() => eventoStore.eventos);

    // Computed para obtener el mensaje desde el store
    // const message = computed(() => eventoStore.message);

    const requestDeleteEvento = (id) => {
      eventoToDelete.value = id;
      isConfirmVisible.value = true;
    };

    const deleteEvento = async () => {
      if (eventoToDelete.value) {
        await eventoStore.deleteEvento(eventoToDelete.value);
        // notificationMessage.value = message;
        notificationMessage.value = eventoStore.message
        isConfirmVisible.value = false; // Cerrar el diálogo
        eventoToDelete.value = null; // Resetear el ID a eliminar
        eventoStore.fetchEventos()
      }
    };

    onMounted(() => {
      eventoStore.fetchEventos();
    });

    return {
      eventos,
      requestDeleteEvento,
      isConfirmVisible,
      deleteEvento,
      notificationMessage,
      formatDate
    };
  }
}

</script>