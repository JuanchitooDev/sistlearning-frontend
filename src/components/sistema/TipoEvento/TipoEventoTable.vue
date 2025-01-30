<template>
  <div
    class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <div class="flex items-center justify-between mb-4">
      <h4 class="mb-6 text-sm font-semibold text-black dark:text-white">Listado</h4>
      <router-link to="/tipo-evento/nuevo" class="bg-blue-500 text-white p-2 rounded flex items-center text-xs">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M10 2a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H3a1 1 0 110-2h6V3a1 1 0 011-1z"
            clip-rule="evenodd" />
        </svg>
        Agregar
      </router-link>
    </div>
    <div class="flex flex-col">
      <div class="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
        <div class="p-2.5 xl:p-5">
          <h5 class="text-xs font-medium uppercase xsm:text-sm">ID</h5>
        </div>
        <div class="p-2.5 text-center xl:p-5">
          <h5 class="text-xs font-medium uppercase xsm:text-sm">Nombre</h5>
        </div>
        <div class="p-2.5 text-center xl:p-5">
          <h5 class="text-xs font-medium uppercase xsm:text-sm">Descripción</h5>
        </div>
        <div class="p-2.5 text-center sm:block xl:p-5">
          <h5 class="text-xs font-medium uppercase xsm:text-sm">Estado</h5>
        </div>
        <div class="p-2.5 text-center sm:block xl:p-5">
          <h5 class="text-xs font-medium uppercase xsm:text-sm">Acciones</h5>
        </div>
      </div>

      <div v-if="tipos.length == 0">
        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <p class="text-black dark:text-white">Tipo de eventos no registrados</p>
        </div>
      </div>
      <div v-for="(tipo, index) in tipos" :key="tipo.id" :class="`grid grid-cols-3 sm:grid-cols-5 ${index === tipos.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
        }`">
        <div class="flex p-2.5 xl:p-5">
          <p class="text-black dark:text-white text-xs xsm:text-sm">{{ tipo.id }}</p>
        </div>
        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <p class="text-black dark:text-white text-xs xsm:text-sm">{{ tipo.nombre }}</p>
        </div>
        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <p class="text-black dark:text-white text-xs xsm:text-sm">{{ tipo.descripcion }}</p>
        </div>
        <div class="items-center justify-center p-2.5 sm:flex xl:p-5">
          <svg v-if="tipo.estado" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none"
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
            name: 'editTipoEvento',
            params: { id: tipo.id }
          }" class="text-blue-500 hover:text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4l4 4-8 8H8v-4l8-8z" />
            </svg>
          </router-link>
          <button @click="requestDeleteTipoEvento(tipo.id)" class="text-red-500 hover:text-red-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <ConfirmDialog :isVisible="isConfirmVisible" title="Confirmar Eliminación"
      message="¿Estás seguro de que deseas eliminar este tipo de evento?" @confirmed="deleteTipoEvento"
      @canceled="isConfirmVisible = false" />

    <Notification v-if="notificationMessage" :message="notificationMessage" :duration="4000"
      @hide="notificationMessage = ''"></Notification>
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue';
import { useTipoEventoStore } from '@/stores';
import ConfirmDialog from '@/components/Common/ConfirmDialog.vue';
import Notification from '@/components/Common/Notification.vue';

export default {
  components: {
    ConfirmDialog,
    Notification,
  },
  setup() {
    const isConfirmVisible = ref(false);
    const notificationMessage = ref('');
    const tipoEventoStore = useTipoEventoStore();
    const tipoEventoToDelete = ref(null);

    const tipos = computed(() => tipoEventoStore.tipos);

    // Computed para obtener el mensaje desde el store
    const message = computed(() => tipoEventoStore.message);

    const requestDeleteTipoEvento = (id) => {
      tipoEventoToDelete.value = id;
      isConfirmVisible.value = true;
    };

    const deleteTipoEvento = async () => {
      if (tipoEventoToDelete.value) {
        await tipoEventoStore.deleteTipoEvento(tipoEventoToDelete.value);
        notificationMessage.value = message;
        isConfirmVisible.value = false; // Cerrar el diálogo
        tipoEventoToDelete.value = null; // Resetear el ID a eliminar
        tipoEventoStore.fetchTipoEventos()
      }
    };

    onMounted(() => {
      tipoEventoStore.fetchTipoEventos();
    });

    return {
      tipos,
      requestDeleteTipoEvento,
      isConfirmVisible,
      deleteTipoEvento,
      notificationMessage,
    };
  }
}
</script>

<style scoped>
/* Agrega tus estilos aquí si es necesario */
</style>