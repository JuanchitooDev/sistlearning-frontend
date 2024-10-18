<template>
  <form @submit.prevent="submit">
    <div>
      <label for="nombre">Nombre:</label>
      <input v-model="form.nombre" type="text" id="nombre" required />
    </div>
    <button type="submit">{{ isEdit ? "Actualizar" : "Crear" }}</button>
  </form>
</template>

<script>
import { ref, watch } from "vue";
import { useTipoEventoStore } from "../stores/tipoEventoStore";

export default {
  props: {
    tipoEvento: Object,
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const tipoEventosStore = useTipoEventoStore();
    const form = ref({ nombre: "" });

    // Rellena el formulario si es una edición
    watch(
      () => props.tipoEvento,
      (newTipoEvento) => {
        if (newTipoEvento) {
          form.value = { ...newTipoEvento };
        }
      },
      { inmediate: true }
    );

    const submit = async() => {
        if (props.isEdit) {
            await tipoEventosStore.updateTipoEvento(props.tipoEvento.id, form.value)
        } else {
            await tipoEventosStore.createTipoEvento(form.value)
        }
        form.value = { nombre: '' }
    }

    return { form, submit }
  },
};
</script>
