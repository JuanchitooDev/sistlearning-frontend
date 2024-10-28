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

    <table class="min-w-full bg-white border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th class="border px-4 py-2">ID</th>
          <th class="border px-4 py-2">Tipo de documento</th>
          <th class="border px-4 py-2">Apellidos</th>
          <th class="border px-4 py-2">Nombres</th>
          <th class="border px-4 py-2">Estado</th>
          <th class="border px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="alumno in alumnos" :key="alumno.id">
          <td class="border px-4 py-2">{{ alumno.id }}</td>
          <td class="border px-4 py-2">
            {{ alumno.TipoDocumento.abreviatura }}
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
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue';
import { useAlumnoStore } from '../stores/alumnoStore';
import AlumnoForm from './AlumnoForm.vue';
import ConfirmDialog from './common/ConfirmDialog.vue';

export default {
  components: {
    AlumnoForm,
    ConfirmDialog,
  },
  setup() {
    const isConfirmVisible = ref(false);
    const alumnoStore = useAlumnoStore();
    const isModalOpen = ref(false);
    const alumno = ref({
      id: null,
      id_tipodocumento: '',
      apellido_paterno: '',
      apellido_materno: '',
      nombres: '',
      telefono: '',
      fecha_nacimiento: null,
      sexo: '',
    });
    const alumnoToDelete = ref(null);

    const alumnos = computed(() => alumnoStore.alumnos);

    const openModal = () => {
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
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const editAlumno = (alumno) => {
      alumno.value = { ...alumno };
    //   console.log('alumno.value un editAlumno', alumno.value)
      isModalOpen.value = true;
    };

    const requestDeleteAlumno = (id) => {
      alumnoToDelete.value = id;
      isConfirmVisible.value = true;
    };

    const deleteAlumno = async () => {
      if (alumnoToDelete.value) {
        await alumnoStore.deleteAlumno(alumnoToDelete.value);
        isConfirmVisible.value = false; // Cerrar el diálogo
        alumnoToDelete.value = null; // Resetear el ID a eliminar
      }
    };

    const handleAlumnoCreated = () => {
      isModalOpen.value = false;
      alumnoStore.fetchAlumnos(); // Actualiza la lista después de crear
    };

    const handleAlumnoUpdated = () => {
      isModalOpen.value = false;
      alumnoStore.fetchAlumnos(); // Actualiza la lista después de editar
    };

    onMounted(() => {
      alumnoStore.fetchAlumnos();
    });

    return {
      alumnos,
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
    };
  },
};
</script>

<style scoped>
/* Agrega tus estilos aquí si es necesario */
</style>
