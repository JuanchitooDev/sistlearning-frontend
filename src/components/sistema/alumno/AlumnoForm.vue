<template>
  <div class="px-6 py-4">
    <!--
    <div v-if="message" :class="{ 'bg-green-100 text-green-800': !isError, 'bg-red-100 text-red-800': isError }"
      class="p-4 mb-6 rounded-md">
      <div class="flex items-center">
        <span class="font-semibold mr-2">
          {{ isError ? 'Error' : 'Éxito' }}:
        </span>
        <span>{{ message }}</span>
      </div>
    </div>
  -->
    <form @submit.prevent="submitForm">
      <div class="grid grid-cols-2 gap-4">
        <div class="mb-1">
          <label for="id_tipodocumento" class="block text-sm font-medium text-gray-700">Tipo de documento: <span
              class="text-red-500">*</span></label>
          <select name="id_tipodocumento" id="id_tipodocumento" v-model="alumno.id_tipodocumento"
            class="mt-1 p-2 border border-gray-300 rounded w-full" :disabled="isReadOnly">
            <option value="">- SELECCIONE -</option>
            <option v-for="tipo in tipos" :value="tipo.id" :key="tipo.id">
              {{ tipo.abreviatura }}
            </option>
          </select>
          <div v-if="errors.id_tipodocumento" class="text-red-600 text-sm mt-1">{{ errors.id_tipodocumento }}</div>
        </div>
        <div class="mb-1">
          <label for="numero_documento" class="block text-sm font-medium text-gray-700">Número de documento: <span
              class="text-red-500">*</span></label>
          <input v-model="alumno.numero_documento" type="text" id="numero_documento"
            @keydown.enter.prevent="fetchPersona" autocomplete="off" maxlength="13" placeholder="Ejm: 44995533"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
            :disabled="isReadOnly" />
          <div v-if="errors.numero_documento" class="text-red-600 text-sm mt-1">{{ errors.numero_documento }}</div>
        </div>
        <div class="mb-1">
          <label for="apellido_paterno" class="block text-sm font-medium text-gray-700">Apellido paterno: <span
              class="text-red-500">*</span></label>
          <input v-model="alumno.apellido_paterno" type="text" id="apellido_paterno" autocomplete="off" maxlength="20"
            placeholder="Ejm: Pérez"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300" />
          <div v-if="errors.apellido_paterno" class="text-red-600 text-sm mt-1">{{ errors.apellido_paterno }}</div>
        </div>
        <div class="mb-1">
          <label for="apellido_materno" class="block text-sm font-medium text-gray-700">Apellido materno: <span
              class="text-red-500">*</span></label>
          <input v-model="alumno.apellido_materno" type="text" id="apellido_materno" autocomplete="off" maxlength="20"
            placeholder="Ejm: Pérez"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300" />
          <div v-if="errors.apellido_materno" class="text-red-600 text-sm mt-1">{{ errors.apellido_materno }}</div>
        </div>
        <div class="mb-1">
          <label for="nombres" class="block text-sm font-medium text-gray-700">Nombres: <span
              class="text-red-500">*</span></label>
          <input v-model="alumno.nombres" type="text" id="nombres" autocomplete="off" maxlength="30"
            placeholder="Ejm: José Carlos"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300" />
          <div v-if="errors.nombres" class="text-red-600 text-sm mt-1">{{ errors.nombres }}</div>
        </div>
        <div class="mb-1">
          <label for="fecha_nacimiento" class="block text-sm font-medium text-gray-700">Fecha de Nacimiento: <span
              class="text-red-500">*</span></label>
          <input v-model="alumno.fecha_nacimiento" type="date" id="fecha_nacimiento" autocomplete="off"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300" />
          <div v-if="errors.fecha_nacimiento" class="text-red-600 text-sm mt-1">{{ errors.fecha_nacimiento }}</div>
        </div>
        <div class="mb-1">
          <label for="sexo" class="block text-sm font-medium text-gray-700">Sexo: <span
              class="text-red-500">*</span></label>
          <select name="sexo" id="sexo" v-model="alumno.sexo" class="mt-1 p-2 border border-gray-300 rounded w-full">
            <option value="">- SELECCIONE -</option>
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
          </select>
          <div v-if="errors.sexo" class="text-red-600 text-sm mt-1">{{ errors.sexo }}</div>
        </div>
        <div class="mb-1">
          <label for="telefono" class="block text-sm font-medium text-gray-700">Teléfono: <span
              class="text-red-500">*</span></label>
          <input v-model="alumno.telefono" type="text" id="telefono" autocomplete="off" maxlength="12"
            placeholder="Ejm: 995511224"
            class="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300" />
          <div v-if="errors.telefono" class="text-red-600 text-sm mt-1">{{ errors.telefono }}</div>
        </div>
      </div>
      <div class="flex justify-between">
        <button type="submit"
          class="flex items-center px-4 py-2 bg-greenwhite-600 text-white rounded-md hover:bg-greenwhite-700 disabled:bg-greenwhite-300 disabled:cursor-not-allowed"
          :class="{ 'opacity-50 cursor-not-allowed': isDuplicated }" :disabled="isDuplicated || loading">
          <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1 animate-spin" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
          </svg>
          {{
            loading
              ? notificationAction
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
      <!--
      <div v-if="isDuplicated" class="text-red-500 mt-2">
        El alumno ya existe
      </div>
      -->
    </form>
  </div>
</template>

<script>
import { onMounted, ref, computed } from 'vue'
import { useRoute } from "vue-router"
import { useAlumnoStore, useTipoDocumentoStore, usePersonaStore, useToastStore } from '@/stores'

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
    const storeToast = useToastStore()
    const route = useRoute()

    const tipos = computed(() => storeTipoDocumento.tipos);

    const loading = ref(false);
    const isDuplicated = ref(false);
    const errors = ref({})
    const notificationAction = ref("")
    // const message = ref("")
    // const isError = ref(false)
    // const message = computed(() => storeAlumno.message);
    // const isError = computed(() => storeAlumno.message && storeAlumno.message.includes('Error'));

    const registerAlumno = ref(false)
    const registerPersona = ref(false)

    const isReadOnly = ref(false)

    const validateForm = () => {
      errors.value = {}

      if (!alumno.value.id_tipodocumento) {
        errors.value.id_tipodocumento = 'Seleccione un tipo de documento'
      }

      if (!alumno.value.numero_documento || alumno.value.numero_documento.trim() === '') {
        errors.value.numero_documento = 'El número de documento es obligatorio'
      }

      if (!alumno.value.apellido_paterno || alumno.value.apellido_paterno.trim() === '') {
        errors.value.apellido_paterno = 'El apellido paterno es obligatorio'
      }

      if (!alumno.value.apellido_materno || alumno.value.apellido_materno.trim() === '') {
        errors.value.apellido_materno = 'El apellido materno es obligatorio'
      }

      if (!alumno.value.nombres || alumno.value.nombres.trim() === '') {
        errors.value.nombres = 'El nombre es obligatorio'
      }

      if (!alumno.value.fecha_nacimiento) {
        errors.value.fecha_nacimiento = 'La fecha de nacimiento es obligatoria'
      }

      if (!alumno.value.sexo) {
        errors.value.sexo = 'El sexo es obligatorio'
      }

      if (!alumno.value.telefono || alumno.value.telefono.trim() === '') {
        errors.value.telefono = 'El teléfono es obligatorio'
      }

      return Object.keys(errors.value).length === 0
    }

    const submitForm = async () => {
      if (!validateForm()) return

      loading.value = true
      notificationAction.value = 'Cargando...'
      // message.value = ""
      // isError.value = false
      isDuplicated.value = false

      try {
        if (alumno.value.id) {
          await storeAlumno.updateAlumno(alumno.value.id, alumno.value)
          const classToast = (storeAlumno.result) ? 'success' : 'error'
          storeToast.addToast(storeAlumno.message, classToast)
          // if (storeAlumno.result) {
          //   isError.value = false
          // } else {
          //   isError.value = true
          // }
          // message.value = storeAlumno.message
          isDuplicated.value = false
        } else {
          if (registerAlumno.value && !registerPersona.value) {

            await storeAlumno.createAlumno(alumno.value);

            if (storeAlumno.result) {
              // message.value = storeAlumno.message
              // isError.value = false
              storeToast.addToast(storeAlumno.message, 'success')
              isDuplicated.value = false
              resetForm()
            } else {
              // message.value = 'No se pudo registrar al alumno'
              // isError.value = true
              storeToast.addToast('No se pudo registrar al alumno', 'error')
              isDuplicated.value = false
              return
            }
          }

          if (!registerAlumno.value && registerPersona.value) {
            const nombreCompleto = `${alumno.value.apellido_paterno.trim()} ${alumno.value.apellido_materno.trim()}, ${alumno.value.nombres.trim()}`

            const dataPersona = {
              id_tipodocumento: alumno.value.id_tipodocumento,
              numero: alumno.value.numero_documento,
              nombres: alumno.value.nombres,
              apellido_paterno: alumno.value.apellido_paterno,
              apellido_materno: alumno.value.apellido_materno,
              fecha_nacimiento: alumno.value.fecha_nacimiento,
              sexo: alumno.value.sexo,
              nombre_completo: nombreCompleto,
              origen: 'Web'
            }

            await storePersona.createPersona(dataPersona)

            if (storePersona.result) {
              // message.value = 'Alumno registrado exitosamente'
              // isError.value = false
              storeToast.addToast('Alumno registrado exitosamente', 'success')
              isDuplicated.value = false
              resetForm()
            } else {
              // message.value = 'No se pudo registrar al alumno'
              // isError.value = true
              storeToast.addToast('No se pudo registrar al alumno', 'error')
              isDuplicated.value = false
              return
            }
          }
        }
      } catch (error) {
        // message.value = 'Falló al registrar alumno'
        // isError.value = true
        storeToast.addToast('Falló al registrar alumno', 'error')
        isDuplicated.value = false
      } finally {
        loading.value = false; // Desactivar el spinner
      }
    }

    const fetchPersona = async () => {
      loading.value = true; // Activa el estado de carga
      notificationAction.value = 'Buscar persona...'
      // message.value = ""
      // isError.value = false
      isDuplicated.value = false

      try {
        if (alumno.value.id_tipodocumento && alumno.value.numero_documento) {
          const idTipoDoc = alumno.value.id_tipodocumento
          const numDoc = alumno.value.numero_documento

          await storePersona.getPersonaByTipoDocNumDoc(idTipoDoc, numDoc)
          await storeAlumno.getAlumnoByTipoDocNumDoc(idTipoDoc, numDoc)

          const getPersona = storePersona.persona
          const getAlumno = storeAlumno.alumno

          if (getPersona && getAlumno) {
            let fechaNacimiento = '';

            if (getAlumno.fecha_nacimiento) {
              const partsFechaNacimiento = getAlumno.fecha_nacimiento.split('T');
              const partsFecha = partsFechaNacimiento[0].split("-")
              fechaNacimiento = `${partsFecha[0]}-${partsFecha[1]}-${partsFecha[2]}`;
            }

            alumno.value.nombres = getAlumno.nombres || '';
            alumno.value.apellido_paterno = getAlumno.apellido_paterno || '';
            alumno.value.apellido_materno = getAlumno.apellido_materno || '';
            alumno.value.fecha_nacimiento = fechaNacimiento;
            alumno.value.sexo = getAlumno.sexo || '';
            alumno.value.telefono = getAlumno.telefono

            // message.value = storeAlumno.message
            // isError.value = true
            storeToast.addToast(storeAlumno.message, 'warning')
            isDuplicated.value = true

            registerAlumno.value = false
            registerPersona.value = false
          } else if (!getAlumno && getPersona) {
            let fechaNacimiento = '';

            if (getPersona.fecha_nacimiento) {
              const partsFechaNacimiento = getPersona.fecha_nacimiento.split('/');
              fechaNacimiento = `${partsFechaNacimiento[2]}-${partsFechaNacimiento[1]}-${partsFechaNacimiento[0]}`;
            }

            alumno.value.nombres = getPersona.nombres || '';
            alumno.value.apellido_paterno = getPersona.apellido_paterno || '';
            alumno.value.apellido_materno = getPersona.apellido_materno || '';
            alumno.value.fecha_nacimiento = fechaNacimiento;
            alumno.value.sexo = getPersona.sexo || '';

            // isError.value = false
            isDuplicated.value = false

            registerAlumno.value = true
            registerPersona.value = false
          } else if (getAlumno && !getPersona) {
            let fechaNacimiento = '';

            if (getAlumno.fecha_nacimiento) {
              const partsFechaNacimiento = getAlumno.fecha_nacimiento.split('/');
              fechaNacimiento = `${partsFechaNacimiento[2]}-${partsFechaNacimiento[1]}-${partsFechaNacimiento[0]}`;
            }

            alumno.value.nombres = getAlumno.nombres || '';
            alumno.value.apellido_paterno = getAlumno.apellido_paterno || '';
            alumno.value.apellido_materno = getAlumno.apellido_materno || '';
            alumno.value.fecha_nacimiento = fechaNacimiento;
            alumno.value.sexo = getAlumno.sexo || '';
            alumno.value.telefono = getAlumno.telefono

            // message.value = storeAlumno.message
            // isError.value = true
            storeToast.addToast(storeAlumno.message, 'warning')
            isDuplicated.value = true

            registerAlumno.value = false
            registerPersona.value = true
          } else {
            await storePersona.getDocumentoInfo(idTipoDoc, numDoc);

            const persona = storePersona.persona;

            if (persona) {
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

              // message.value = storePersona.message
              // isError.value = false

              storeToast.addToast(storePersona.message, 'success')
              isDuplicated.value = false

              registerAlumno.value = true
              registerPersona.value = false
            } else {
              // message.value = storePersona.message
              // isError.value = true
              storeToast.addToast(storePersona.message, 'error')
              isDuplicated.value = false

              registerAlumno.value = false
              registerPersona.value = false
            }
          }
        }
      } catch (error) {
        console.error(error);
        // message.value = 'Falló al buscar la persona'
        // isError.value = true
        storeToast.addToast('Falló al buscar persona', 'error')
        isDuplicated.value = false

        registerAlumno.value = false
        registerPersona.value = false
      } finally {
        loading.value = false; // Desactiva el estado de carga
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
      // message.value = ""
      // isError.value = false
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
    };

    onMounted(async () => {
      storeTipoDocumento.fetchTipos()

      const alumnoId = route.params.id

      if (alumnoId) {
        await storeAlumno.getAlumnoById(alumnoId)
        alumno.value = storeAlumno.alumno || {}

        if (alumno.value.fecha_nacimiento) {
          const partFecha = alumno.value.fecha_nacimiento.split("T")
          alumno.value.fecha_nacimiento = partFecha[0]
          isReadOnly.value = true
        }
      }

      storeAlumno.message = ""
    })

    return {
      tipos,
      alumno,
      submitForm,
      fetchPersona,
      isDuplicated,
      loading,
      // message,
      // isError,
      cancelar,
      errors,
      notificationAction,
      isReadOnly
    }
  }
}
</script>