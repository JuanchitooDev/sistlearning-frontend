<template>
  <div
    class="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
    <div class="flex items-center justify-between mb-4">
      <h4 class="mb-6 text-sm font-semibold text-black dark:text-white">Listado</h4>
      <button @click="openModal" class="bg-blue-500 text-white p-2 rounded flex items-center text-xs">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M10 2a1 1 0 011 1v6h6a1 1 0 110 2h-6v6a1 1 0 11-2 0v-6H3a1 1 0 110-2h6V3a1 1 0 011-1z"
            clip-rule="evenodd" />
        </svg>
        Agregar
      </button>
    </div>
    <div class="flex flex-col">
      <div class="grid grid-cols-7 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-7">
        <div class="p-2.5 text-center xl:p-5">
          <h5 class="text-xs font-medium uppercase xsm:text-sm">ID</h5>
        </div>
        <div class="p-2.5 text-center xl:p-5">
          <h5 class="text-xs font-medium uppercase xsm:text-sm">Tipo de documento</h5>
        </div>
        <div class="p-2.5 text-center xl:p-5">
          <h5 class="text-xs font-medium uppercase xsm:text-sm">Número de documento</h5>
        </div>
        <div class="p-2.5 text-center sm:block xl:p-5">
          <h5 class="text-xs font-medium uppercase xsm:text-sm">Apellidos</h5>
        </div>
        <div class="p-2.5 text-center sm:block xl:p-5">
          <h5 class="text-xs font-medium uppercase xsm:text-sm">Nombres</h5>
        </div>
        <div class="p-2.5 text-center sm:block xl:p-5">
          <h5 class="text-xs font-medium uppercase xsm:text-sm">Estado</h5>
        </div>
        <div class="p-2.5 text-center sm:block xl:p-5">
          <h5 class="text-xs font-medium uppercase xsm:text-sm">Acciones</h5>
        </div>
      </div>

      <div v-if="alumnos.length == 0">
        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <p class="text-black dark:text-white">Alumnos no registrados</p>
        </div>
      </div>
      <div v-for="(alumno, index) in alumnos" :key="alumno.id" :class="`grid grid-cols-7 sm:grid-cols-7 ${index === alumnos.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
        }`">
        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <p class="text-black dark:text-white text-xs xsm:text-sm">{{ alumno.id }}</p>
        </div>
        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <p class="text-black dark:text-white text-xs xsm:text-sm">
            {{
              alumno.TipoDocumento
                ? alumno.TipoDocumento.abreviatura
                : 'Sin Tipo Documento'
            }}

          </p>
        </div>
        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <p class="text-black dark:text-white text-xs xsm:text-sm">{{ alumno.numero_documento }}</p>
        </div>
        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <p class="text-black dark:text-white text-xs xsm:text-sm">{{ alumno.apellido_paterno }} {{ alumno.apellido_materno }}</p>
        </div>
        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <p class="text-black dark:text-white text-xs xsm:text-sm">{{ alumno.nombres }}</p>
        </div>
        <div class="items-center justify-center p-2.5 sm:flex xl:p-5">
          <svg v-if="alumno.estado" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <div class="items-center justify-center p-2.5 sm:flex xl:p-5">
          <button @click="editAlumno(alumno)" class="text-blue-500 hover:text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4l4 4-8 8H8v-4l8-8z" />
            </svg>
          </button>
          <button @click="requestDeleteAlumno(alumno.id)" class="text-red-500 hover:text-red-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <AlumnoForm :isVisible="isModalOpen" :onClose="closeModal" :alumno="alumno" @alumnoCreated="handleAlumnoCreated"
      @alumnoUpdated="handleAlumnoUpdated" />

    <ConfirmDialog :isVisible="isConfirmVisible" title="Confirmar Eliminación"
      message="¿Estás seguro de que deseas eliminar este alumno?" @confirmed="deleteAlumno"
      @canceled="isConfirmVisible = false" />

    <Notification v-if="notificationMessage" :message="notificationMessage" :duration="4000"
      @hide="notificationMessage = ''"></Notification>
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue';
import { useAlumnoStore } from '@/stores';
import { useTipoDocumentoStore } from '@/stores';
import AlumnoForm from './AlumnoForm.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import Notification from '@/components/common/Notification.vue';

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

    // Filtro de búsqueda
    const searchQuery = ref('');

    // Computed para obtener el mensaje desde el store
    const message = computed(() => alumnoStore.message);

    // Filtrar los alumnos
    const filteredAlumnos = computed(() => {
      let filtered = alumnoStore.alumnos;

      // Filtro por tipo de documento
      if (selectedTipoDocumento.value) {
        filtered = filtered.filter(
          (alumno) => alumno.id_tipodocumento === selectedTipoDocumento.value
        );
      }

      // Filtro por búsqueda
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter((alumno) => {
          const fullName =
            `${alumno.apellido_paterno} ${alumno.apellido_materno} ${alumno.nombres}`.toLowerCase();
          return fullName.includes(query);
        });
      }

      return filtered;
    });

    const alumnos = computed(() => alumnoStore.alumnos);
    // const alumnos = computed(() => {
    //   let filtered = alumnoStore.alumnos;
    //   if (selectedTipoDocumento.value) {
    //     filtered = filtered.filter(
    //       (alumno) => alumno.id_tipodocumento === selectedTipoDocumento.value
    //     );
    //   }
    //   return filtered;
    // });

    // Paginación
    const currentPage = ref(1);
    const perPage = 10;
    const totalPages = computed(() =>
      // Math.ceil(alumnos.value.length / perPage)
      Math.ceil(filteredAlumnos.value.length / perPage)
    );
    const paginatedAlumnos = computed(() => {
      const start = (currentPage.value - 1) * perPage;
      const end = start + perPage;
      // return alumnos.value.slice(start, end);
      return filteredAlumnos.value.slice(start, end);
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
      const fechaNacimiento = alumnoEdit.fecha_nacimiento_str
        ? alumnoEdit.fecha_nacimiento_str
        : alumnoEdit.fecha_nacimiento
          ? alumnoEdit.fecha_nacimiento.slice(0, 10)
          : null;

      alumno.value = { ...alumnoEdit };
      alumno.value.fecha_nacimiento = fechaNacimiento;
      isModalOpen.value = true;
    };

    const requestDeleteAlumno = (id) => {
      alumnoToDelete.value = id;
      isConfirmVisible.value = true;
    };

    const deleteAlumno = async () => {
      if (alumnoToDelete.value) {
        await alumnoStore.deleteAlumno(alumnoToDelete.value);
        // notificationMessage.value = 'Alumno eliminado correctamente';
        notificationMessage.value = message;
        isConfirmVisible.value = false; // Cerrar el diálogo
        alumnoToDelete.value = null; // Resetear el ID a eliminar
      }
    };

    const handleAlumnoCreated = () => {
      isModalOpen.value = false;
      notificationMessage.value = message;
      alumnoStore.fetchAlumnos(); // Actualiza la lista después de crear
    };

    const handleAlumnoUpdated = () => {
      isModalOpen.value = false;
      notificationMessage.value = message;
      alumnoStore.fetchAlumnos(); // Actualiza la lista después de editar
    };

    onMounted(() => {
      alumnoStore.fetchAlumnos();
      tipoDocumentoStore.fetchTipos();
    });

    return {
      alumnos,
      filteredAlumnos,
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
      searchQuery,
    };
  },
};
</script>

<style scoped>
/* Agrega tus estilos aquí si es necesario */
</style>
