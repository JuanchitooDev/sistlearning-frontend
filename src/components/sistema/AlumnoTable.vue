<template>
  <div class="p-4">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl">Alumno</h1>
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
    <!-- Filtro por Tipo de Documento -->
    <div class="mb-4 flex items-center space-x-4">
      <label for="tipoDocumento" class="font-semibold"
        >Tipo de Documento:</label
      >
      <select
        v-model="selectedTipoDocumento"
        id="tipoDocumento"
        class="p-2 border border-gray-300 rounded"
      >
        <option value="">Todos</option>
        <option v-for="tipo in tiposDocumentos" :key="tipo.id" :value="tipo.id">
          {{ tipo.nombre }}
        </option>
      </select>
    </div>
    <table class="min-w-full bg-white border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th class="border px-4 py-2">ID</th>
          <th class="border px-4 py-2">Tipo de documento</th>
          <th class="border px-4 py-2">Número de documento</th>
          <th class="border px-4 py-2">Apellidos</th>
          <th class="border px-4 py-2">Nombres</th>
          <th class="border px-4 py-2">Estado</th>
          <th class="border px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="paginatedAlumnos.length === 0">
          <td colspan="7" class="text-center pt-2 pb-2">
            Alumnos no registrados
          </td>
        </tr>
        <tr v-for="alumno in paginatedAlumnos" :key="alumno.id">
          <td class="border px-4 py-2">{{ alumno.id }}</td>
          <td class="border px-4 py-2">
            {{
              alumno.TipoDocumento
                ? alumno.TipoDocumento.abreviatura
                : 'Sin Tipo Documento'
            }}
          </td>
          <td class="border px-4 py-2">
            {{ alumno.numero_documento }}
          </td>
          <td class="border px-4 py-2">
            {{ alumno.apellido_paterno }} {{ alumno.apellido_materno }}
          </td>
          <td class="border px-4 py-2">{{ alumno.nombres }}</td>
          <td class="border px-4 py-2">
            <svg
              v-if="alumno.estado"
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
              @click="editAlumno(alumno)"
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
              @click="requestDeleteAlumno(alumno.id)"
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

    <AlumnoForm
      :isVisible="isModalOpen"
      :onClose="closeModal"
      :alumno="alumno"
      @alumnoCreated="handleAlumnoCreated"
      @alumnoUpdated="handleAlumnoUpdated"
    />

    <ConfirmDialog
      :isVisible="isConfirmVisible"
      title="Confirmar Eliminación"
      message="¿Estás seguro de que deseas eliminar este alumno?"
      @confirmed="deleteAlumno"
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
import { useAlumnoStore } from '../../stores/alumnoStore';
import AlumnoForm from './AlumnoForm.vue';
import ConfirmDialog from '../common/ConfirmDialog.vue';
import Notification from '../common/Notification.vue';
import { useTipoDocumentoStore } from '@/stores/tipoDocumentoStore';

export default {
  components: {
    AlumnoForm,
    ConfirmDialog,
    Notification,
  },
  setup() {
    const isConfirmVisible = ref(false);
    const notificationMessage = ref('');
    const alumnoStore = useAlumnoStore();
    const tipoDocumentoStore = useTipoDocumentoStore();
    const isModalOpen = ref(false);
    const alumno = ref({
      id: null,
      id_tipodocumento: '',
      numero_documento: '',
      apellido_paterno: '',
      apellido_materno: '',
      nombres: '',
      telefono: '',
      fecha_nacimiento: null,
      sexo: '',
    });
    const alumnoToDelete = ref(null);

    // Filtro de tipo de documento
    const selectedTipoDocumento = ref('');
    const tiposDocumentos = computed(() => tipoDocumentoStore.tipos);

    // const alumnos = computed(() => alumnoStore.alumnos);
    const alumnos = computed(() => {
      let filtered = alumnoStore.alumnos;
      if (selectedTipoDocumento.value) {
        filtered = filtered.filter(
          (alumno) => alumno.id_tipodocumento === selectedTipoDocumento.value
        );
      }
      return filtered;
    });

    // Paginación
    const currentPage = ref(1);
    const perPage = 10;
    const totalPages = computed(() =>
      Math.ceil(alumnos.value.length / perPage)
    );
    const paginatedAlumnos = computed(() => {
      const start = (currentPage.value - 1) * perPage;
      const end = start + perPage;
      return alumnos.value.slice(start, end);
    });

    const prevPage = () => {
      if (currentPage.value > 1) currentPage.value--;
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) currentPage.value++;
    };

    const openModal = () => {
      alumno.value = {
        id: null,
        id_tipodocumento: '',
        numero_documento: '',
        apellido_paterno: '',
        apellido_materno: '',
        nombres: '',
        telefono: '',
        fecha_nacimiento: null,
        sexo: '',
      };
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const editAlumno = (alumnoEdit) => {
      alumno.value = { ...alumnoEdit };
      isModalOpen.value = true;
    };

    const requestDeleteAlumno = (id) => {
      alumnoToDelete.value = id;
      isConfirmVisible.value = true;
    };

    const deleteAlumno = async () => {
      if (alumnoToDelete.value) {
        await alumnoStore.deleteAlumno(alumnoToDelete.value);
        notificationMessage.value = 'Alumno eliminado correctamente';
        isConfirmVisible.value = false; // Cerrar el diálogo
        alumnoToDelete.value = null; // Resetear el ID a eliminar
      }
    };

    const handleAlumnoCreated = () => {
      isModalOpen.value = false;
      notificationMessage.value = 'Alumno creado correctamente';
      alumnoStore.fetchAlumnos(); // Actualiza la lista después de crear
    };

    const handleAlumnoUpdated = () => {
      isModalOpen.value = false;
      notificationMessage.value = 'Alumno actualizado correctamente';
      alumnoStore.fetchAlumnos(); // Actualiza la lista después de editar
    };

    onMounted(() => {
      alumnoStore.fetchAlumnos();
      tipoDocumentoStore.fetchTipos();
    });

    return {
      alumnos,
      selectedTipoDocumento,
      tiposDocumentos,
      currentPage,
      totalPages,
      paginatedAlumnos,
      prevPage,
      nextPage,
      openModal,
      closeModal,
      editAlumno,
      isModalOpen,
      alumno,
      requestDeleteAlumno,
      isConfirmVisible,
      deleteAlumno,
      handleAlumnoCreated,
      handleAlumnoUpdated,
      notificationMessage,
    };
  },
};
</script>

<style scoped>
/* Agrega tus estilos aquí si es necesario */
</style>
