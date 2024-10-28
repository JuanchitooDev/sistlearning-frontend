<template>
  <div
    v-if="isVisible"
    class="modal-overlay fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
  >
    <div class="modal bg-white rounded-lg shadow-lg p-8 w-1/2">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold">
          {{ alumno.id ? 'Editar alumno' : 'Nuevo alumno' }}
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
          <label
            for="id_tipodocumento"
            class="block text-sm font-medium text-gray-700"
            >Tipo de documento:</label
          >
          <select
            name="id_tipodocumento"
            id="id_tipodocumento"
            v-model="alumno.id_tipodocumento"
            class="mt-1 p-2 border border-gray-300 rounded w-full"
          >
            <option v-for="tipo in tipos" :value="tipo.id" :key="tipo.id">
              {{ tipo.abreviatura }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label
            for="apellido_paterno"
            class="block text-sm font-medium text-gray-700"
            >Apellido paterno:</label
          >
          <input
            v-model="alumno.apellido_paterno"
            type="text"
            id="apellido_paterno"
            autocomplete="off"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
          />
        </div>
        <div class="mb-4">
          <label
            for="apellido_materno"
            class="block text-sm font-medium text-gray-700"
            >Apellido materno:</label
          >
          <input
            v-model="alumno.apellido_materno"
            type="text"
            id="apellido_materno"
            autocomplete="off"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
          />
        </div>
        <div class="mb-4">
          <label for="nombres" class="block text-sm font-medium text-gray-700"
            >Nombres:</label
          >
          <input
            v-model="alumno.nombres"
            type="text"
            id="nombres"
            autocomplete="off"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
          />
        </div>
        <div class="mb-4">
          <label for="telefono" class="block text-sm font-medium text-gray-700"
            >Teléfono:</label
          >
          <input
            v-model="alumno.telefono"
            type="text"
            id="telefono"
            autocomplete="off"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
          />
        </div>
        <div class="mb-4">
          <label
            for="fecha_nacimiento"
            class="block text-sm font-medium text-gray-700"
            >Fecha de Nacimiento:</label
          >
          <input
            v-model="alumno.fecha_nacimiento"
            type="date"
            id="fecha_nacimiento"
            autocomplete="off"
            required
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
          />
        </div>
        <div class="mb-4">
          <label for="sexo" class="block text-sm font-medium text-gray-700"
            >Sexo:</label
          >
          <select
            name="sexo"
            id="sexo"
            v-model="alumno.sexo"
            class="mt-1 p-2 border border-gray-300 rounded w-full"
          >
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>
        <div class="flex justify-between">
          <button
            type="submit"
            class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            {{ alumno.id ? 'Actualizar' : 'Registrar' }}
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
import { useTipoDocumentoStore } from '@/stores/tipoDocumentoStore';

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
    alumno: {
      type: Object,
      default: () => ({
        id: null,
        id_tipodocumento: '',
        apellido_paterno: '',
        apellido_materno: '',
        nombres: '',
        telefono: '',
        fecha_nacimiento: null,
        sexo: '',
      }),
    },
  },
  emits: ['alumnoCreated', 'alumnoUpdated'],
  setup(props, { emit }) {
    const alumno = ref(props.alumno);
    const storeAlumno = useAlumnoStore();
    const storeTipoDocumento = useTipoDocumentoStore();
    const tipos = computed(() => storeTipoDocumento.tipos);

    watch(
      () => props.alumno,
      (newValue) => {
        alumno.value = newValue;
      }
    );

    const submitForm = async () => {
      try {
        if (alumno.value.id) {
          await storeAlumno.updateAlumno(alumno.value.id, alumno.value);
          emit('alumnoUpdated');
        } else {
          await storeAlumno.createAlumno(alumno.value);
          emit('alumnoCreated');
        }
        resetForm();
        props.onClose();
      } catch (error) {
        console.log('error creating alumno', error);
      }
    };

    const resetForm = () => {
      alumno.value = {
        id: null,
        id_tipodocumento: '',
        apellido_paterno: '',
        apellido_materno: '',
        nombres: '',
        telefono: '',
        fecha_nacimiento: null,
        sexo: '',
      };
    };

    const closeModal = () => {
      resetForm();
      props.onClose();
    };

    onMounted(() => {
      storeTipoDocumento.fetchTiposPorCategoria('persona');
    });

    return {
      tipos,
      alumno,
      submitForm,
      closeModal,
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