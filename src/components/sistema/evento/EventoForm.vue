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
      <div class="grid grid-cols-2 gap-4">
        <div class="mb-4">
          <label for="id_tipoevento" class="block text-sm font-medium text-gray-700">Tipo de evento:</label>
          <select name="id_tipoevento" id="id_tipoevento" v-model="evento.id_tipoevento"
            class="mt-1 p-2 border border-gray-300 rounded w-full">
            <option value="">- SELECCIONE --</option>
            <option v-for="tipo in tipos" :value="tipo.id" :key="tipo.id">
              {{ tipo.nombre }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label for="titulo" class="block text-sm font-medium text-gray-700">Nombre:</label>
          <input v-model="evento.titulo" type="text" id="titulo" autocomplete="off" required maxlength="70"
            placeholder="Ejm: Crianza de ganado con una dieta saludable"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300" />
        </div>
        <div class="mb-4">
          <label for="fecha" class="block text-sm font-medium text-gray-700">Fecha Inicio:</label>
          <input v-model="evento.fecha" type="date" id="fecha" autocomplete="off" required
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300" />
        </div>
        <div class="mb-4">
          <label for="fecha_fin" class="block text-sm font-medium text-gray-700">Fecha Final:</label>
          <input v-model="evento.fecha_fin" type="date" id="fecha_fin" autocomplete="off"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300" />
        </div>
        <div class="mb-4">
          <label for="duracion" class="block text-sm font-medium text-gray-700">Duración:</label>
          <input v-model="evento.duracion" type="text" id="duracion" autocomplete="off" required placeholder="80 horas"
            maxlength="10"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300" />
        </div>
        <div class="mb-4">
          <label for="modalidad" class="block text-sm font-medium text-gray-700">Modalidad:</label>
          <select name="modalidad" id="modalidad" v-model="evento.modalidad"
            class="mt-1 p-2 border border-gray-300 rounded w-full">
            <option value="Presencial">PRESENCIAL</option>
            <option value="Virtual">VIRTUAL</option>
            <option value="Mixto">MIXTO</option>
          </select>
        </div>
        <div class="mb-4 col-span-2">
          <label for="temario" class="block text-sm font-medium text-gray-700">Temario:</label>
          <textarea v-model="evento.temario" id="temario" autocomplete="off" required
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300 h-32"></textarea>
        </div>
      </div>
      <div class="flex justify-between">
        <button type="submit"
          class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
          :disabled="loading">
          <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1 animate-spin" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
          </svg>
          {{
            loading
              ? 'Cargando...'
              : evento.id
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
import { onMounted, ref, computed } from 'vue';
import { useRoute } from "vue-router"
import { useEventoStore } from '@/stores';
import { useTipoEventoStore } from '@/stores';

export default {
  setup() {
    const evento = ref({
      id: null,
      titulo: '',
      id_tipoevento: '',
      temario: '',
      fecha: null,
      fecha_fin: null,
      duracion: '',
      modalidad: 'Virtual',
    });
    const storeEvento = useEventoStore();
    const storeTipoEvento = useTipoEventoStore();
    const tipos = computed(() => storeTipoEvento.tipos);

    const loading = ref(false);
    const route = useRoute()

    // Computed para obtener el mensaje desde el store
    const message = computed(() => storeEvento.message);
    const isError = computed(() => storeEvento.message && storeEvento.message.includes('Error'));

    onMounted(async () => {
      const eventoId = route.params.id
      if (eventoId) {
        await storeEvento.getEventoById(eventoId)
        evento.value = storeEvento.evento || {}
        if (evento.value) {
          const partFecha = evento.value.fecha.split("T")
          evento.value.fecha = partFecha[0]
        }
      }
      storeEvento.message = ""
    })

    const submitForm = async () => {
      try {
        loading.value = true
        if (evento.value.id) {
          await storeEvento.updateEvento(evento.value.id, evento.value);
        } else {
          await storeEvento.createEvento(evento.value);
          if (storeEvento.result) {
            resetForm()
          }
        }
      } catch (error) {
        console.log('error creating evento', error);
      } finally {
        loading.value = false; // Desactivar el spinner
      }
    }

    const cancelar = () => {
      evento.value = {
        id_tipoevento: '',
        titulo: '',
        temario: '',
        fecha: null,
        fecha_fin: '',
        duracion: '',
        modalidad: 'Virtual'
      }
    }

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

    onMounted(() => {
      storeTipoEvento.fetchTipoEventos()
    })

    return {
      tipos,
      evento,
      loading,
      submitForm,
      message,
      isError,
      cancelar
    }
  }
}
</script>