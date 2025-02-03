<template>
  <div class="px-6 py-8">
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
        <textarea v-model="tipoEvento.descripcion" id="descripcion" placeholder="Ejm: Tipo de eventos de corta duración"
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
          :disabled="loading" @click="cancelar">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router"
import { useTipoEventoStore } from '@/stores/tipoEventoStore';

export default {
  setup() {
    const tipoEvento = ref({
      id: null,
      nombre: '',
      descripcion: ''
    })
    const storeTipoEvento = useTipoEventoStore();
    const loading = ref(false);
    const route = useRoute()

    // Computed para obtener el mensaje desde el store
    const message = computed(() => storeTipoEvento.message);
    const isError = computed(() => storeTipoEvento.message && storeTipoEvento.message.includes('Error'));

    onMounted(async () => {
      const tipoEventoId = route.params.id
      if (tipoEventoId) {
        await storeTipoEvento.getTipoEventoById(tipoEventoId)
        tipoEvento.value = storeTipoEvento.tipoEvento || {}
      }
      storeTipoEvento.message = ""
    })

    const submitForm = async () => {
      try {
        loading.value = true;
        if (tipoEvento.value.id) {
          await storeTipoEvento.updateTipoEvento(tipoEvento.value.id, tipoEvento.value);
        } else {
          await storeTipoEvento.createTipoEvento(tipoEvento.value);
          resetForm();
        }
      } catch (error) {
        console.log('error creating tipo evento', error);
      } finally {
        loading.value = false;
      }
    };

    const cancelar = () => {
      tipoEvento.value = {
        nombre: '',
        descripcion: ''
      }
    }

    const resetForm = () => {
      tipoEvento.value = {
        id: null,
        nombre: '',
        descripcion: '',
      };
    };

    return {
      tipoEvento,
      loading,
      submitForm,
      message,
      isError,
      cancelar
    }
  }
}
</script>