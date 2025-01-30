<template>
    <DefaultLayout>
        <BreadcrumbDefault :pageTitle="pageTitle" />
        <div class="flex justify-center items-center">
            <div class="w-full max-w-3xl">
                <DefaultCard :cardTitle="cardTitle">
                    <EventoForm />
                </DefaultCard>
            </div>
        </div>
    </DefaultLayout>
</template>

<script>
import { ref } from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import DefaultCard from "@/components/Common/DefaultCard.vue"
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue"
import EventoForm from "@/components/Sistema/Evento/EventoForm.vue"

export default {
    name: 'FormView',
    components: {
        DefaultLayout,
        DefaultCard,
        BreadcrumbDefault,
        EventoForm
    },
    setup() {
        const pageTitle = ref("Nuevo evento")

        const cardTitle = ref("Nuevo evento")

        return {
            pageTitle,
            cardTitle
        }
    }
}
</script>