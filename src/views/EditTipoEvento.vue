<template>
  <div>
    <h2>Editar Tipo de Evento</h2>
    <form-tipo-evento :tipoEvento="tipoEvento" @refresh="fetchTiposEventos" />
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useTipoEventoStore } from "../stores/tipoEventoStore";
import FormTipoEvento from "../components/FormTipoEvento.vue";

export default {
  components: { FormTipoEvento },
  setup(props) {
    const tiposEventosStore = useTipoEventoStore();
    const tipoEvento = ref(null);

    const fetchTiposEventos = () => {
      tiposEventosStore.fetchTipoEventos();
    };

    onMounted(async () => {
      const id = 1;
      //   tipoEvento.value = await tiposEventosStore.getTipoEventoById(id);
      const tipos = await tiposEventosStore.getTipoEventoById(id);
      console.log('edit tipo evento', tipos)
      tipoEvento.value = tipos;
    });

    return { tipoEvento, fetchTiposEventos };
  },
};
</script>