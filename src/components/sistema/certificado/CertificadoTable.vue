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
        <div class="p-2.5 xl:p-5">
          <h5 class="text-xs font-medium uppercase xsm:text-sm">ID</h5>
        </div>
        <div class="p-2.5 text-center xl:p-5">
          <h5 class="text-xs font-medium uppercase xsm:text-sm">Alumno</h5>
        </div>
        <div class="p-2.5 text-center xl:p-5">
          <h5 class="text-xs font-medium uppercase xsm:text-sm">Evento</h5>
        </div>
        <div class="p-2.5 text-center xl:p-5">
          <h5 class="text-xs font-medium uppercase xsm:text-sm">Fecha Emisión</h5>
        </div>
        <div class="p-2.5 text-center sm:block xl:p-5">
          <h5 class="text-xs font-medium uppercase xsm:text-sm">Estado</h5>
        </div>
        <div class="p-2.5 text-center sm:block xl:p-5">
          <h5 class="text-xs font-medium uppercase xsm:text-sm">Descargar</h5>
        </div>
        <div class="p-2.5 text-center sm:block xl:p-5">
          <h5 class="text-xs font-medium uppercase xsm:text-sm">Acciones</h5>
        </div>
      </div>

      <div v-if="certificados.length == 0">
        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <p class="text-black dark:text-white">Certificados no registrados</p>
        </div>
      </div>
      <div v-for="(certificado, index) in certificados" :key="certificado.id" :class="`grid grid-cols-7 sm:grid-cols-7 ${index === certificados.length - 1 ? '' : 'border-b border-stroke dark:border-strokedark'
        }`">
        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <p class="text-black dark:text-white text-xs xsm:text-sm">{{ certificado.id }}</p>
        </div>
        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <p class="text-black dark:text-white text-xs xsm:text-sm">
            {{ certificado.Alumno ? certificado.Alumno.apellido_paterno : '' }}
            {{ certificado.Alumno ? certificado.Alumno.apellido_materno : '' }}
            {{ certificado.Alumno ? certificado.Alumno.nombres : '' }}
          </p>
        </div>
        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <p class="text-black dark:text-white text-xs xsm:text-sm">
            {{ certificado.Evento ? certificado.Evento.titulo : 'Sin Tipo' }}
          </p>
        </div>
        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <p v-if="certificado.fecha_envio" class="text-black dark:text-white text-xs xsm:text-sm">
            {{ formatDate(certificado.fecha_envio) }}
          </p>
          <p v-else class="text-black dark:text-white text-xs xsm:text-sm">--</p>
        </div>
        <div class="items-center justify-center p-2.5 sm:flex xl:p-5">
          <svg v-if="certificado.estado" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-green-500" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <div class="flex items-center justify-center p-2.5 xl:p-5">
          <button @click="downloadCertificado(certificado)" class="text-green-500 hover:text-green-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 14v4m0 0h-2a2 2 0 01-2-2v-4a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2zM12 4a8 8 0 018 8h-2a6 6 0 10-12 0H4a8 8 0 018-8z" />
            </svg>
          </button>
        </div>
        <div class="items-center justify-center p-2.5 sm:flex xl:p-5">
          <button @click="editCertificado(certificado)" class="text-blue-500 hover:text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 4l4 4-8 8H8v-4l8-8z" />
            </svg>
          </button>
          <button @click="requestDeleteCertificado(certificado.id)" class="text-red-500 hover:text-red-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <CertificadoForm :isVisible="isModalOpen" :onClose="closeModal" :certificado="certificado"
      @certificadoCreated="handleCertificadoCreated" @certificadoUpdated="handleCertificadoUpdated" />

    <ConfirmDialog :isVisible="isConfirmVisible" title="Confirmar Eliminación"
      message="¿Estás seguro de que deseas eliminar este certificado?" @confirmed="deleteCertificado"
      @canceled="isConfirmVisible = false" />

    <Notification v-if="notificationMessage" :message="notificationMessage" :duration="4000"
      @hide="notificationMessage = ''"></Notification>
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue';
import { useCertificadoStore } from '@/stores';
import CertificadoForm from './CertificadoForm.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import Notification from '@/components/common/Notification.vue';
import { formatDate } from '@/utils/date.utils'
import { useEventoStore } from '@/stores';
// import { IAlumno } from '@/interfaces/alumnoInterface';

export default {
  components: {
    CertificadoForm,
    ConfirmDialog,
    Notification,
  },
  setup() {
    const isConfirmVisible = ref(false);
    const notificationMessage = ref('');
    const certificadoStore = useCertificadoStore();
    const eventoStore = useEventoStore();
    const isModalOpen = ref(false);
    const certificado = ref({
      id: null,
      id_alumno: '',
      nombre_alumno_impresion: '',
      id_evento: '',
      fecha_envio: null,
    });
    const certificadoToDelete = ref(null);

    // Filtro por evento
    const selectedEvento = ref('');
    const eventos = computed(() => eventoStore.eventos);

    // Filtro de búsqueda
    const searchQuery = ref('');

    // Computed para obtener el mensaje desde el store
    const message = computed(() => certificadoStore.message);

    const filteredCertificados = computed(() => {
      let filtered = certificadoStore.certificados;

      if (selectedEvento.value) {
        filtered = filtered.filter(
          (certificado) => certificado.id_evento === selectedEvento.value
        );
      }

      // Filtro por b+usqueda
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter((certificado) => {
          const alumno = certificado.alumno;
          if (alumno) {
            return (
              alumno.nombres.toLowerCase().includes(query) ||
              alumno.apellido_paterno.toLowerCase().includes(query) ||
              alumno.apellido_materno.toLowerCase().includes(query)
            );
          }
          return false
        });
      }

      return filtered;
    });

    const certificados = computed(() => certificadoStore.certificados);
    // const certificados = computed(() => {
    //   let filtered = certificadoStore.certificados;
    //   if (selectedEvento.value) {
    //     filtered = filtered.filter(
    //       (certificado) => certificado.id_evento === selectedEvento.value
    //     );
    //   }
    //   return filtered;
    // });

    // Computar los certificados filtrados por búsqueda y evento
    // const filteredCertificados = computed(() => {
    //   return certificados.value.filter((certificado) => {
    //     const searchMatches =
    //       certificado.Alumno &&
    //       (certificado.Alumno.nombres
    //         .toLowerCase()
    //         .includes(searchQuery.value.toLowerCase()) ||
    //         certificado.Alumno.apellido_paterno
    //           .toLowerCase()
    //           .includes(searchQuery.value.toLowerCase()) ||
    //         certificado.Alumno.apellido_materno
    //           .toLowerCase()
    //           .includes(searchQuery.value.toLowerCase()));

    //     const eventoMatches =
    //       !selectedEvento.value ||
    //       certificado.Evento?.id === selectedEvento.value;

    //     return searchMatches && eventoMatches;
    //   });
    // });

    // Paginación
    const currentPage = ref(1);
    const perPage = ref(10);

    const totalPages = computed(() =>
      // Math.ceil(alumnos.value.length / perPage)
      Math.ceil(filteredCertificados.value.length / perPage.value)
    );

    const paginatedCertificados = computed(() => {
      const start = (currentPage.value - 1) * perPage.value;
      // const end = start + perPage;
      // return certificados.value.slice(start, end);
      return filteredCertificados.value.slice(start, start + perPage.value);
    });

    const prevPage = () => {
      if (currentPage.value > 1) currentPage.value--;
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) currentPage.value++;
    };

    const openModal = () => {
      certificado.value = {
        id: null,
        id_alumno: '',
        nombre_alumno_impresion: '',
        id_evento: '',
        fecha_envio: null,
      }; // Resetea el formulario
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const editCertificado = (certificadoEdit) => {
      const alumno = certificadoEdit.Alumno;
      const nombreAlumno = `${alumno.nombres} ${alumno.apellido_paterno} ${alumno.apellido_materno}`;

      certificado.value = { ...certificadoEdit };

      certificado.value.nombre_alumno_impresion = certificado.value
        .nombre_alumno_impresion
        ? certificado.value.nombre_alumno_impresion
        : nombreAlumno;

      certificado.value.fecha_envio = certificadoEdit.fecha_envio
        ? certificadoEdit.fecha_envio.slice(0, 10)
        : null;

      isModalOpen.value = true;
    };

    const requestDeleteCertificado = (id) => {
      certificadoToDelete.value = id;
      isConfirmVisible.value = true;
    };

    const deleteCertificado = async () => {
      if (certificadoToDelete.value) {
        await certificadoStore.deleteCertificado(certificadoToDelete.value);
        // notificationMessage.value = 'Certificado eliminado correctamente'
        notificationMessage.value = message;
        isConfirmVisible.value = false; // Cerrar el diálogo
        certificadoToDelete.value = null; // Resetear el ID a eliminar
      }
    };

    const downloadCertificado = (certificado) => {
      certificadoStore.downloadCertificado(certificado.id);
    };

    const handleCertificadoCreated = () => {
      isModalOpen.value = false;
      notificationMessage.value = message;
      certificadoStore.fetchCertificados(); // Actualiza la lista después de crear
    };

    const handleCertificadoUpdated = () => {
      isModalOpen.value = false;
      notificationMessage.value = message;
      certificadoStore.fetchCertificados(); // Actualiza la lista después de editar
    };

    onMounted(() => {
      certificadoStore.fetchCertificados();
      eventoStore.fetchEventos();
    });

    return {
      certificados,
      selectedEvento,
      eventos,
      currentPage,
      totalPages,
      paginatedCertificados,
      prevPage,
      nextPage,
      openModal,
      closeModal,
      editCertificado,
      isModalOpen,
      certificado,
      requestDeleteCertificado,
      isConfirmVisible,
      deleteCertificado,
      downloadCertificado,
      handleCertificadoCreated,
      handleCertificadoUpdated,
      formatDate,
      notificationMessage,
      searchQuery,
      filteredCertificados,
    };
  },
};

</script>

<style scoped>
/* Agrega tus estilos aquí si es necesario */
</style>
  