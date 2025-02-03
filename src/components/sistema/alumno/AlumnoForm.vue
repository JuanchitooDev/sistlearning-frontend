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
          <label for="id_tipodocumento" class="block text-sm font-medium text-gray-700">Tipo de documento:</label>
          <select name="id_tipodocumento" id="id_tipodocumento" v-model="alumno.id_tipodocumento"
            class="mt-1 p-2 border border-gray-300 rounded w-full">
            <option value="">- SELECCIONE -</option>
            <option v-for="tipo in tipos" :value="tipo.id" :key="tipo.id">
              {{ tipo.abreviatura }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label for="numero_documento" class="block text-sm font-medium text-gray-700">Número de documento:</label>
          <input v-model="alumno.numero_documento" type="text" id="numero_documento"
            @keydown.enter.prevent="fetchPersona" autocomplete="off" maxlength="13" required placeholder="Ejm: 44995533"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300" />
        </div>
        <div class="mb-4">
          <label for="apellido_paterno" class="block text-sm font-medium text-gray-700">Apellido paterno:</label>
          <input v-model="alumno.apellido_paterno" type="text" id="apellido_paterno" autocomplete="off" required
            maxlength="20" placeholder="Ejm: Pérez"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300" />
        </div>
        <div class="mb-4">
          <label for="apellido_materno" class="block text-sm font-medium text-gray-700">Apellido materno:</label>
          <input v-model="alumno.apellido_materno" type="text" id="apellido_materno" autocomplete="off" required
            maxlength="20" placeholder="Ejm: Pérez"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300" />
        </div>
        <div class="mb-4">
          <label for="nombres" class="block text-sm font-medium text-gray-700">Nombres:</label>
          <input v-model="alumno.nombres" type="text" id="nombres" autocomplete="off" required maxlength="30"
            placeholder="Ejm: José Carlos"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300" />
        </div>
        <div class="mb-4">
          <label for="fecha_nacimiento" class="block text-sm font-medium text-gray-700">Fecha de Nacimiento:</label>
          <input v-model="alumno.fecha_nacimiento" type="date" id="fecha_nacimiento" autocomplete="off" required
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300" />
        </div>
        <div class="mb-4">
          <label for="sexo" class="block text-sm font-medium text-gray-700">Sexo:</label>
          <select name="sexo" id="sexo" v-model="alumno.sexo" class="mt-1 p-2 border border-gray-300 rounded w-full">
            <option value="">- SELECCIONE -</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="telefono" class="block text-sm font-medium text-gray-700">Teléfono:</label>
          <input v-model="alumno.telefono" type="text" id="telefono" autocomplete="off" required maxlength="12"
            placeholder="Ejm: 995511224"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300" />
        </div>
      </div>
      <div class="flex justify-between">
        <button type="submit" :disabled="isDuplicated || loading"
          class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed"
          :class="{ 'opacity-50 cursor-not-allowed': isDuplicated }">
          <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1 animate-spin" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
          </svg>
          {{
            loading
              ? 'Cargando...'
              : alumno.id
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
      <div v-if="isDuplicated" class="text-red-500 mt-2">
        El alumno ya existe
      </div>
    </form>
  </div>
</template>

<script>
import { onMounted, ref, computed } from 'vue';
import { useRoute } from "vue-router"
import { useAlumnoStore } from '@/stores';
import { useTipoDocumentoStore } from '@/stores';
import { usePersonaStore } from "@/stores"

export default {
  setup() {
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
    const storeAlumno = useAlumnoStore();
    const storeTipoDocumento = useTipoDocumentoStore();
    const storePersona = usePersonaStore();

    const tipos = computed(() => storeTipoDocumento.tipos);

    const loading = ref(false);
    const route = useRoute()
    const isDuplicated = ref(false);

    // Computed para obtener el mensaje desde el store
    const message = computed(() => storeAlumno.message);
    const isError = computed(() => storeAlumno.message && storeAlumno.message.includes('Error'));

    onMounted(async () => {
      const alumnoId = route.params.id
      if (alumnoId) {
        await storeAlumno.getAlumnoById(alumnoId)
        alumno.value = storeAlumno.alumno || {}
        if (alumno.value) {
          const partFecha = alumno.value.fecha_nacimiento.split("T")
          alumno.value.fecha_nacimiento = partFecha[0]
        }
      }
      storeAlumno.message = ""
    })

    const validarRegistro = () => {
      isDuplicated.value = storeAlumno.alumnos.some(
        (existAlumno) =>
          existAlumno.id_tipodocumento === alumno.value.id_tipodocumento &&
          existAlumno.numero_documento === alumno.value.numero_documento
      );
    };

    const submitForm = async () => {
      try {
        loading.value = true

        if (isDuplicated.value) {
          console.error('El alumno ya existe');
          return;
        }

        if (alumno.value.id) {
          await storeAlumno.updateAlumno(alumno.value.id, alumno.value);
        } else {
          await storeAlumno.createAlumno(alumno.value);
          if (storeAlumno.result) {
            resetForm()
          }
        }
      } catch (error) {
        console.log('error creating alumno', error);
      } finally {
        loading.value = false; // Desactivar el spinner
      }
    }

    const fetchPersona = async () => {
      if (alumno.value.id_tipodocumento && alumno.value.numero_documento) {
        loading.value = true; // Activa el estado de carga
        try {
          await storePersona.getDocumentoInfo(
            alumno.value.id_tipodocumento,
            alumno.value.numero_documento
          );
          const persona = storePersona.persona;
          if (persona) {
            validarRegistro();
            let fechaNacimiento = '';
            if (persona.fecha_nacimiento) {
              const partsFechaNacimiento = persona.fecha_nacimiento.split('/');
              fechaNacimiento = `${partsFechaNacimiento[2]}-${partsFechaNacimiento[1]}-${partsFechaNacimiento[0]}`;
            }
            alumno.value.nombres = persona.nombres || '';
            alumno.value.apellido_paterno = persona.apellido_paterno || '';
            alumno.value.apellido_materno = persona.apellido_materno || '';
            alumno.value.fecha_nacimiento = fechaNacimiento;
            alumno.value.sexo = persona.sexo || '';
          }
        } catch (error) {
          console.error(error);
        } finally {
          loading.value = false; // Desactiva el estado de carga
        }
      }
    }

    const cancelar = () => {
      alumno.value = {
        id_tipodocumento: '',
        numero_documento: '',
        apellido_paterno: '',
        apellido_materno: '',
        nombres: '',
        telefono: '',
        fecha_nacimiento: null,
        sexo: '',
      }
      isDuplicated.value = false
    }

    const resetForm = () => {
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
      isDuplicated.value = false;
    };

    onMounted(() => {
      storeTipoDocumento.fetchTipos()
    })

    return {
      tipos,
      alumno,
      submitForm,
      fetchPersona,
      isDuplicated,
      loading,
      validarRegistro,
      message,
      isError,
      cancelar
    }
  }
}
</script>