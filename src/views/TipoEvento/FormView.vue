<template>
    <DefaultLayout>
        <BreadcrumbDefault :pageTitle="pageTitle" />
        <div class="flex flex-col gap-10">
            <TipoEventoForm />
        </div>
    </DefaultLayout>
</template>

<script>
import { ref } from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue"
import TipoEventoForm from "@/components/sistema/tipo-evento/TipoEventoForm.vue"

export default {
    name: 'FormView',
    components: {
        DefaultLayout,
        BreadcrumbDefault,
        TipoEventoForm
    },
    setup() {
        const pageTitle = ref("Nuevo tipo de evento")
        return {
            pageTitle
        }
    }
}
</script>