<template>
  <div class="p-4">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl">Tipos de Evento</h1>
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

    <table class="min-w-full bg-white border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th class="border px-4 py-2">ID</th>
          <th class="border px-4 py-2">Nombre</th>
          <th class="border px-4 py-2">Descripción</th>
          <th class="border px-4 py-2">Estado</th>
          <th class="border px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="tipos.length === 0">
          <td colspan="5" class="text-center pt-2 pb-2">
            Tipo de eventos no registrados
          </td>
        </tr>
        <tr v-for="tipo in tipos" :key="tipo.id">
          <td class="border px-4 py-2">{{ tipo.id }}</td>
          <td class="border px-4 py-2">{{ tipo.nombre }}</td>
          <td class="border px-4 py-2">{{ tipo.descripcion }}</td>
          <td class="border px-4 py-2">
            <svg
              v-if="tipo.estado"
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
              @click="editTipoEvento(tipo)"
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
              @click="requestDeleteTipoEvento(tipo.id)"
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

    <TipoEventoForm
      :isVisible="isModalOpen"
      :onClose="closeModal"
      :tipoEvento="tipoEvento"
      @tipoEventoCreated="handleTipoEventoCreated"
      @tipoEventoUpdated="handleTipoEventoUpdated"
    />

    <ConfirmDialog
      :isVisible="isConfirmVisible"
      title="Confirmar Eliminación"
      message="¿Estás seguro de que deseas eliminar este tipo de evento?"
      @confirmed="deleteTipoEvento"
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
import { useTipoEventoStore } from '../../stores/tipoEventoStore';
import TipoEventoForm from './TipoEventoForm.vue';
import ConfirmDialog from '../common/ConfirmDialog.vue';
import Notification from '../common/Notification.vue'

export default {
  components: {
    TipoEventoForm,
    ConfirmDialog,
    Notification
  },
  setup() {
    const isConfirmVisible = ref(false);
    const notificationMessage = ref('')
    const tipoEventoStore = useTipoEventoStore();
    const isModalOpen = ref(false);
    const tipoEvento = ref({ id: null, nombre: '', descripcion: '' });
    const tipoEventoToDelete = ref(null);

    const tipos = computed(() => tipoEventoStore.tipos);

    const openModal = () => {
      tipoEvento.value = { id: null, nombre: '', descripcion: '' }; // Resetea el formulario
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const editTipoEvento = (tipo) => {
      tipoEvento.value = { ...tipo }; // Cargar los datos del tipo a editar
      isModalOpen.value = true;
    };

    const requestDeleteTipoEvento = (id) => {
      tipoEventoToDelete.value = id;
      isConfirmVisible.value = true;
    };

    const deleteTipoEvento = async () => {
      if (tipoEventoToDelete.value) {
        await tipoEventoStore.deleteTipoEvento(tipoEventoToDelete.value);
        notificationMessage.value = 'Tipo de evento eliminado correctamente'
        isConfirmVisible.value = false; // Cerrar el diálogo
        tipoEventoToDelete.value = null; // Resetear el ID a eliminar
      }
    };

    const handleTipoEventoCreated = (message) => {
      isModalOpen.value = false;
      notificationMessage.value = message
      tipoEventoStore.fetchTipoEventos(); // Actualiza la lista después de crear
    };

    const handleTipoEventoUpdated = (message) => {
      isModalOpen.value = false;
      notificationMessage.value = message
      tipoEventoStore.fetchTipoEventos(); // Actualiza la lista después de editar
    };

    onMounted(() => {
      tipoEventoStore.fetchTipoEventos();
    });

    return {
      tipos,
      openModal,
      closeModal,
      editTipoEvento,
      isModalOpen,
      tipoEvento,
      requestDeleteTipoEvento,
      isConfirmVisible,
      deleteTipoEvento,
      handleTipoEventoCreated,
      handleTipoEventoUpdated,
      notificationMessage
    };
  },
};
</script>

<style scoped>
/* Agrega tus estilos aquí si es necesario */
</style>
