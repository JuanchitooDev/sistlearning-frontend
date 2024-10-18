<template>
  <div>
    <h2>Crear Tipo de Evento</h2>
    <form-tipo-evento @refresh="fetchTiposEventos" />
  </div>
</template>

<script>
import FormTipoEvento from '../components/FormTipoEvento.vue';
import { useTiposEventosStore } from '../stores/tipoEventoStore';

export default {
  components: { FormTipoEvento },
  setup() {
    const tiposEventosStore = useTiposEventosStore();
    const fetchTiposEventos = () => {
      tiposEventosStore.fetchTiposEventos();
    };
    
    return { fetchTiposEventos };
  },
};
</script>