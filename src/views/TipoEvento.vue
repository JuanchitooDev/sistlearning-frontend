<template>
  <div>
    <h2>Tipos de Eventos</h2>
    <button @click="startCreating">Crear Nuevo Tipo de Evento</button>
    <ul>
      <li v-for="tipo in tiposEventosStore.tipos" :key="tipo.id">
        {{ tipo.nombre }}
        <router-link :to="{ name: 'edit-tipo-evento', params: { id: tipo.id } }">Editar</router-link>
        <button @click="deleteTipoEvento(tipo.id)">Eliminar</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useTipoEventoStore } from '../stores/tipoEventoStore';

export default {
  setup() {
    const tiposEventosStore = useTipoEventoStore();
    
    const fetchTiposEventos = () => {
      tiposEventosStore.fetchTipoEventos();
    };

    const deleteTipoEvento = async (id) => {
      await tiposEventosStore.deleteTipoEvento(id);
      fetchTiposEventos();
    };

    onMounted(fetchTiposEventos);

    return { tiposEventosStore, fetchTiposEventos, deleteTipoEvento };
  },
};
</script>