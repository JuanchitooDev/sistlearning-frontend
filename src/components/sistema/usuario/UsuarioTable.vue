<template>
  <div class="p-4">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl">Usuario</h1>
    </div>
    <!-- <div class="mb-4">
      <input
        type="text"
        placeholder="Criterio de búsqueda"
        class="p-2 border border-gray-300 rounded"
      />
    </div> -->
    <table class="min-w-full bg-white border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th class="border px-4 py-2">ID</th>
          <th class="border px-4 py-2">Username</th>
          <th class="border px-4 py-2">Trabajador</th>
          <th class="border px-4 py-2">Estado</th>
          <th class="border px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="usuarios.length === 0">
          <td colspan="5" class="text-center pt-2 pb-2">
            Usuarios no registrados
          </td>
        </tr>
        <tr v-for="usuario in usuarios" :key="usuario.id">
          <td class="border px-4 py-2">{{ usuario.id }}</td>
          <td class="border px-4 py-2">{{ usuario.username }}</td>
          <td class="border px-4 py-2">{{ usuario.trabajador }}</td>
          <td class="border px-4 py-2">
            <svg
              v-if="usuario.estado"
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
            <button class="text-blue-500 hover:text-blue-700">
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
            <button class="text-red-500 hover:text-red-700">
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
    <!-- <div class="mt-4 flex justify-between items-center">
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
    </div> -->
  </div>
</template>

<script>
// import { computed, ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useUsuarioStore } from '@/stores';

export default {
  setup() {
    const usuarioStore = useUsuarioStore();
    // const usuario = ref({
    //   id: null,
    //   username: '',
    //   password: '',
    // });
    // const usuarioToDelete = ref(null);

    const { usuarios } = storeToRefs(usuarioStore);

    usuarioStore.getAll()

    // const usuarios = computed(() => usuarioStore.usuarios);

    // const message = computed(() => usuarioStore.message);

    // const searchQuery = ref('');

    // const currentPage = ref(1);

    // const perPage = 10;

    // const filteredUsuarios = computed(() => {
    //   const query = searchQuery.value.toLowerCase();
    //   currentPage.value = 1;
    //   return usuarios.value.filter((usuario) => {
    //     return usuario.username.toLowerCase().includes(query);
    //   });
    // });

    // const totalPages = computed(() => {
    //   return Math.ceil(filteredUsuarios.value.length / perPage);
    // });

    // const paginatedUsuarios = computed(() => {
    //   const start = (currentPage.value - 1) * perPage;
    //   const end = start + perPage;
    //   return filteredUsuarios.value.slice(start, end);
    // });

    // const prevPage = () => {
    //   if (currentPage.value > 1) currentPage.value--;
    // };

    // const nextPage = () => {
    //   if (currentPage.value < totalPages.value) currentPage.value++;
    // };

    // onMounted(() => {
    //   eventoStore.fetchEventos();
    // });

    return {
      usuarios,
      // searchQuery,
      // filteredUsuarios,
      // currentPage,
      // totalPages,
      // paginatedUsuarios,
      // prevPage,
      // nextPage,
      // usuario
    };
  },
};
</script>