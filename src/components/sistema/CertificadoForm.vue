<template>
  <div
    v-if="isVisible"
    class="modal-overlay fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
  >
    <div class="modal bg-white rounded-lg shadow-lg p-8 w-1/2">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold">
          {{ certificado.id ? 'Editar certificado' : 'Nuevo certificado' }}
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
          <label for="id_alumno" class="block text-sm font-medium text-gray-700"
            >Alumno:</label
          >
          <select
            name="id_alumno"
            id="id_alumno"
            v-model="certificado.id_alumno"
            class="mt-1 p-2 border border-gray-300 rounded w-full"
            @change="handleAlumnoSelect"
          >
            <option
              v-for="alumno in alumnos"
              :value="alumno.id"
              :key="alumno.id"
            >
              {{ alumno.nombres }} {{ alumno.apellido_paterno }}
              {{ alumno.apellido_materno }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label
            for="nombre_alumno_impresion"
            class="block text-sm font-medium text-gray-700"
            >Nombre alumno impresión:</label
          >
          <input
            v-model="certificado.nombre_alumno_impresion"
            type="text"
            id="nombre_alumno_impresion"
            autocomplete="off"
            required
            placeholder="Ejm: José Carlos Pérez Pérez"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300 rounded-md p-2 focus:ring focus:ring-blue-300"
            :disabled="isNombreAlumnoDisabled"
          />
        </div>
        <div class="mb-4">
          <label for="id_evento" class="block text-sm font-medium text-gray-700"
            >Evento:</label
          >
          <select
            name="id_evento"
            id="id_evento"
            v-model="certificado.id_evento"
            class="mt-1 p-2 border border-gray-300 rounded w-full"
          >
            <option
              v-for="evento in eventos"
              :value="evento.id"
              :key="evento.id"
            >
              {{ evento.titulo }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label
            for="fecha_envio"
            class="block text-sm font-medium text-gray-700"
            >Fecha emisión:</label
          >
          <input
            v-model="certificado.fecha_envio"
            type="date"
            id="fecha_envio"
            autocomplete="off"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
          />
        </div>
        <div class="flex justify-between">
          <button
            type="submit"
            class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
            :disabled="loading"
          >
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
              ></circle>
            </svg>
            <span v-if="!loading">{{
              certificado.id ? 'Actualizar' : 'Registrar'
            }}</span>
            <span v-else>Guardando...</span>
            <!-- <svg
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
            {{ certificado.id ? 'Actualizar' : 'Registrar' }} -->
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
import { onMounted, ref, watch, computed } from 'vue';
import { useAlumnoStore } from '@/stores/alumnoStore';
import { useEventoStore } from '@/stores/eventoStore';
import { useCertificadoStore } from '@/stores/certificadoStore';
import { currentDate } from '@/utils/date.utils';

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
    certificado: {
      type: Object,
      default: () => ({
        id: null,
        id_alumno: '',
        nombre_alumno_impresion: '',
        id_evento: '',
        fecha_envio: currentDate,
      }),
    },
  },
  emits: ['certificadoCreated', 'certificadoUpdated'],
  setup(props, { emit }) {
    const certificado = ref(props.certificado);
    const store = useCertificadoStore();
    const storeAlumno = useAlumnoStore();
    const storeEvento = useEventoStore();

    const alumnos = computed(() => storeAlumno.alumnos);
    const eventos = computed(() => storeEvento.eventos);

    const loading = ref(false); // Estado de carga

    // Nueva propiedad reactiva para habilitar/deshabilitar el campo
    const isNombreAlumnoDisabled = ref(true);

    watch(
      () => props.certificado,
      (newValue) => {
        certificado.value = newValue;
        isNombreAlumnoDisabled.value = false
      },
      { immediate: true }
    );

    // Función para manejar el evento de selección del alumno
    const handleAlumnoSelect = async () => {
      const alumno = alumnos.value.find(
        (a) => a.id === certificado.value.id_alumno
      );
      if (alumno) {
        isNombreAlumnoDisabled.value = false;
        certificado.value.nombre_alumno_impresion = `${alumno.nombres} ${alumno.apellido_paterno} ${alumno.apellido_materno}`;
      } else {
        isNombreAlumnoDisabled.value = true;
        certificado.value.nombre_alumno_impresion = ''; // Limpiar el campo si no hay alumno seleccionado
      }
    };

    const submitForm = async () => {
      loading.value = true; // Activar el spinner
      try {
        if (certificado.value.id) {
          await store.updateCertificado(
            certificado.value.id,
            certificado.value
          );
          emit('certificadoUpdated');
        } else {
          const alumno = await storeAlumno.getAlumnoById(
            certificado.value.id_alumno
          );
          if (alumno) {
            certificado.value.alumno = alumno;
            await store.createCertificado(certificado.value);
            emit('certificadoCreated');
          } else {
            console.error('No se pudo obtener el alumno');
          }
        }
        resetForm();
        props.onClose();
      } catch (error) {
        console.log('error creating certificado', error);
      } finally {
        loading.value = false; // Desactivar el spinner
      }
    };

    const resetForm = () => {
      certificado.value = {
        id: null,
        id_alumno: '',
        nombre_alumno_impresion: '',
        id_evento: '',
        fecha_envio: null,
      };
      // Volver a deshabilitar el campo al resetear
      isNombreAlumnoDisabled.value = true;
    };

    const closeModal = () => {
      resetForm();
      props.onClose();
    };

    onMounted(() => {
      storeAlumno.fetchAlumnos();
      storeEvento.fetchEventos();
    });

    return {
      alumnos,
      eventos,
      certificado,
      submitForm,
      closeModal,
      isNombreAlumnoDisabled,
      loading,
      handleAlumnoSelect,
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
  width: 500px;
}
</style>