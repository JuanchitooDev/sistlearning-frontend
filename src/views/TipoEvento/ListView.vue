<template>
    <DefaultLayout>
        <BreadcrumbDefault :pageTitle="pageTitle" />
        <div class="flex flex-col gap-10">
            <TipoEventoTable />
        </div>
    </DefaultLayout>
</template>

<script>
import { ref } from "vue"
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import TipoEventoTable from "@/components/Sistema/TipoEvento/TipoEventoTable.vue"
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue"

export default {
    name: 'ListView',
    components: {
        DefaultLayout,
        TipoEventoTable,
        BreadcrumbDefault
    },
    setup() {
        const pageTitle = ref("Tipo de evento")

        return {
            pageTitle
        }
    }
}
</script>