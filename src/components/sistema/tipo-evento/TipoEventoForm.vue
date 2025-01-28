<!-- <template>
  <div
    class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <div class="flex items-center justify-between mb-4">
      <div v-if="message" :class="{ 'bg-green-100 text-green-800': !isError, 'bg-red-100 text-red-800': isError }"
        class="p-4 mb-6 rounded-md">
        <div class="flex items-center">
          <span class="font-semibold mr-2">
            {{ isError ? 'Error' : 'Éxito' }}:
          </span>
          <span>{{ message }}</span>
        </div>
      </div>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre:</label>
          <input v-model="tipoEvento.nombre" type="text" id="nombre" autocomplete="off" required
            placeholder="Ejm: Capacitación"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300" />
        </div>
        <div class="mb-4">
          <label for="descripcion" class="block text-sm font-medium text-gray-700">Descripción:</label>
          <textarea v-model="tipoEvento.descripcion" id="descripcion"
            placeholder="Ejm: Tipo de eventos de corta duración"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"></textarea>
        </div>
        <div class="flex justify-between">
          <button type="submit"
            class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
            :disabled="loading">
            <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" class="animate-spin h-5 w-5 mr-2" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
            </svg>
            {{
              loading
                ? 'Cargando...'
                : tipoEvento.id
                  ? 'Actualizar'
                  : 'Registrar'
            }}
          </button>
          <button type="button"
            class="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 ml-4 disabled:bg-blue-300 disabled:cursor-not-allowed"
            :disabled="loading">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template> -->

<template>
  <div class="flex justify-center items-center pt-6 pb-6 bg-gray-50 dark:bg-gray-900">
    <div class="w-full max-w-lg px-6 py-8 bg-white rounded-lg shadow-lg dark:bg-boxdark">
      <div v-if="message" :class="{ 'bg-green-100 text-green-800': !isError, 'bg-red-100 text-red-800': isError }"
        class="p-4 mb-6 rounded-md">
        <div class="flex items-center">
          <span class="font-semibold mr-2">
            {{ isError ? 'Error' : 'Éxito' }}:
          </span>
          <span>{{ message }}</span>
        </div>
      </div>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre:</label>
          <input v-model="tipoEvento.nombre" type="text" id="nombre" autocomplete="off" required
            placeholder="Ejm: Capacitación"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300" />
        </div>
        <div class="mb-4">
          <label for="descripcion" class="block text-sm font-medium text-gray-700">Descripción:</label>
          <textarea v-model="tipoEvento.descripcion" id="descripcion"
            placeholder="Ejm: Tipo de eventos de corta duración"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"></textarea>
        </div>
        <div class="flex justify-between">
          <button type="submit"
            class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
            :disabled="loading">
            <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" class="animate-spin h-5 w-5 mr-2" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
            </svg>
            {{
              loading
                ? 'Cargando...'
                : tipoEvento.id
                  ? 'Actualizar'
                  : 'Registrar'
            }}
          </button>
          <button type="button"
            class="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 ml-4 disabled:bg-blue-300 disabled:cursor-not-allowed"
            :disabled="loading">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useTipoEventoStore } from '@/stores/tipoEventoStore';

export default {
  setup() {
    const tipoEvento = ref({
      id: null,
      nombre: '',
      descripcion: ''
    })
    const store = useTipoEventoStore();
    const loading = ref(false);

    // Computed para obtener el mensaje desde el store
    const message = computed(() => store.message);
    const isError = computed(() => store.message && store.message.includes('Error'));

    const submitForm = async () => {
      try {
        loading.value = true;
        if (tipoEvento.value.id) {
          await store.updateTipoEvento(tipoEvento.value.id, tipoEvento.value);
        } else {
          await store.createTipoEvento(tipoEvento.value);
        }
        resetForm();
      } catch (error) {
        console.log('error creating tipo evento', error);
      } finally {
        loading.value = false;
      }
    };

    const resetForm = () => {
      tipoEvento.value = {
        id: null,
        nombre: '',
        descripcion: '',
      };
    };

    return {
      tipoEvento,
      store,
      loading,
      submitForm,
      message,
      isError
    }
  }
}
</script>