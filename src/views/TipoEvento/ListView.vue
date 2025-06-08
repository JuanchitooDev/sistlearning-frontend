<template>
    <DefaultLayout>
        <BreadcrumbDefault :pageTitle="pageTitle" :urlCurrentName="urlCurrentName" />
        <div class="flex flex-col gap-10">
            <TipoEventoTable />
        </div>
    </DefaultLayout>
</template>

<script>
import { ref } from "vue"
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue"
import TipoEventoTable from "@/components/Sistema/TipoEvento/TipoEventoTable.vue"

export default {
    name: 'ListView',
    components: {
        DefaultLayout,
        BreadcrumbDefault,
        TipoEventoTable
    },
    setup() {
        const pageTitle = ref("Listado")
        const urlCurrentName = ref("Tipo de evento")

        return {
            pageTitle,
            urlCurrentName
        }
    }
}

</script>