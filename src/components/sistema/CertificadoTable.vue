<template>
  <div class="p-4">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl">Certificado</h1>
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
    <!-- Filtro por eventos -->
    <div class="mb-4 flex items-center space-x-4">
      <label for="evento" class="font-semibold">Evento:</label>
      <select
        v-model="selectedEvento"
        id="evento"
        class="p-2 border border-gray-300 rounded"
      >
        <option value="">Todos</option>
        <option v-for="evento in eventos" :key="evento.id" :value="evento.id">
          {{ evento.titulo }}
        </option>
      </select>
      <!-- Campo de búsqueda de alumno -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Buscar Alumno"
        class="p-2 border border-gray-300 rounded"
      />
    </div>
    <table class="min-w-full bg-white border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th class="border px-4 py-2">ID</th>
          <th class="border px-4 py-2">Alumno</th>
          <th class="border px-4 py-2">Evento</th>
          <th class="border px-4 py-2">Fecha Emisión</th>
          <th class="border px-4 py-2">Estado</th>
          <th class="border px-4 py-2">Descargar</th>
          <th class="border px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="paginatedCertificados.length === 0">
          <td colspan="7" class="text-center pt-2 pb-2">
            Certificados no registrados
          </td>
        </tr>
        <tr v-for="certificado in paginatedCertificados" :key="certificado.id">
          <td class="border px-4 py-2">{{ certificado.id }}</td>
          <td class="border px-4 py-2">
            {{ certificado.Alumno ? certificado.Alumno.apellido_paterno : '' }}
            {{ certificado.Alumno ? certificado.Alumno.apellido_materno : '' }}
            {{ certificado.Alumno ? certificado.Alumno.nombres : '' }}
          </td>
          <td class="border px-4 py-2">
            {{ certificado.Evento ? certificado.Evento.titulo : 'Sin Tipo' }}
          </td>
          <td class="border px-4 py-2">{{ formatDate(certificado.fecha_envio) }}</td>
          <td class="border px-4 py-2">
            <svg
              v-if="certificado.estado"
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
          <td class="border px-4 py-2">
            <button
              @click="downloadCertificado(certificado)"
              class="text-green-500 hover:text-green-700"
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
                  d="M12 14v4m0 0h-2a2 2 0 01-2-2v-4a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2zM12 4a8 8 0 018 8h-2a6 6 0 10-12 0H4a8 8 0 018-8z"
                />
              </svg>
            </button>
          </td>
          <td class="border px-4 py-2 flex space-x-2">
            <button
              @click="editCertificado(certificado)"
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
              @click="requestDeleteCertificado(certificado.id)"
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

    <CertificadoForm
      :isVisible="isModalOpen"
      :onClose="closeModal"
      :certificado="certificado"
      @certificadoCreated="handleCertificadoCreated"
      @certificadoUpdated="handleCertificadoUpdated"
    />

    <ConfirmDialog
      :isVisible="isConfirmVisible"
      title="Confirmar Eliminación"
      message="¿Estás seguro de que deseas eliminar este certificado?"
      @confirmed="deleteCertificado"
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
import { useCertificadoStore } from '../../stores/certificadoStore';
import CertificadoForm from './CertificadoForm.vue';
import ConfirmDialog from '../common/ConfirmDialog.vue';
import Notification from '../common/Notification.vue';
import { formatDate } from '../../utils/date.utils'
import { useEventoStore } from '@/stores/eventoStore';
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

    // const certificados = computed(() => certificadoStore.certificados);
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
  