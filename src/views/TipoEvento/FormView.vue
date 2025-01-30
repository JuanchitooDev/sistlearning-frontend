<template>
    <DefaultLayout>
        <BreadcrumbDefault :pageTitle="pageTitle" />
        <div class="flex justify-center items-center">
            <div class="w-full max-w-3xl">
                <DefaultCard :cardTitle="cardTitle">
                    <TipoEventoForm />
                </DefaultCard>
            </div>
        </div>
    </DefaultLayout>
</template>

<script>
import { ref } from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import DefaultCard from "@/components/common/DefaultCard.vue"
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue"
import TipoEventoForm from "@/components/sistema/tipo-evento/TipoEventoForm.vue"

export default {
    name: 'FormView',
    components: {
        DefaultLayout,
        DefaultCard,
        BreadcrumbDefault,
        TipoEventoForm
    },
    setup() {
        const pageTitle = ref("Nuevo tipo de evento")
        const cardTitle = ref("Nuevo tipo de evento")

        return {
            pageTitle,
            cardTitle
        }
    }
}
</script>