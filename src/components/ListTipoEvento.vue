<template>
  <div>
    <h1>Tipo de Eventos</h1>
    <tipo-evento-form v-if="isEditing" :tipoEvento="selectedTipoEvento" :isEdit="isEdit" @refresh="fetchTipoEventos"></tipo-evento-form>
    <button @click="startCreating">Crear nuevo tipo de evento</button>
    <ul>
      <li v-for="tipo in tipoEventosStore.tipos" :key="tipo.id">
        {{ tipo.nombre }}
        <button @click="editTipoEvento(tipo)">Editar</button>
        <button @click="deleteTipoEvento(tipo.id)">Eliminar</button>
      </li>
    </ul>
    <tipo-evento-form v-if="isCreating" :evento="null" :isEdit="false" @refresh="fetchEventos"/>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useTipoEventoStore } from "../stores/tipoEventoStore";
import TipoEventoForm from "./FormTipoEvento.vue";

export default {
  components: { TipoEventoForm },
  setup() {
    const tipoEventosStore = useTipoEventoStore();
    const selectedTipoEvento = ref(null);
    const isEditing = ref(false);
    const isCreating = ref(false);

    onMounted(() => {
      fetchTipoEventos();
    });

    const fetchTipoEventos = () => {
      tipoEventosStore.fetchTipoEventos();
    };

    const startCreating = () => {
      selectedTipoEvento.value = null;
      isCreating.value = true;
      isEditing.value = false;
    };

    const editTipoEvento = (tipoEvento) => {
      selectedTipoEvento.value = tipoEvento;
      isEditing.value = true;
      isCreating.value = false;
    };

    const deleteTipoEvento = async (id) => {
      await tipoEventosStore.deleteTipoEvento(id);
      fetchTipoEventos();
    };

    return {
      tipoEventosStore,
      fetchTipoEventos,
      selectedTipoEvento,
      isEditing,
      isCreating,
      startCreating,
      editTipoEvento,
    };
  },
};
</script>