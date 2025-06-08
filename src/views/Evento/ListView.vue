<template>
    <DefaultLayout>
        <BreadcrumbDefault :pageTitle="pageTitle" :urlCurrentName="urlCurrentName" />
        <div class="flex flex-col gap-10">
            <EventoTable />
        </div>
    </DefaultLayout>
</template>

<script>
import { ref } from "vue"
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import EventoTable from "@/components/Sistema/Evento/EventoTable.vue"
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue"

export default {
    name: 'ListView',
    components: {
        DefaultLayout,
        EventoTable,
        BreadcrumbDefault
    },
    setup() {
        const pageTitle = ref("Listado")
        const urlCurrentName = ref("Evento")

        return {
            pageTitle,
            urlCurrentName
        }
    }
}
</script>