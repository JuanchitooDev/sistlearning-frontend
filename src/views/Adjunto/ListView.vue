<template>
    <DefaultLayout>
        <BreadcrumbDefault :pageTitle="pageTitle" :urlCurrentName="urlCurrentName" />
        <div class="flex flex-col gap-10">
            <AdjuntoTable />
        </div>
    </DefaultLayout>
</template>

<script>
import { ref } from "vue"
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import AdjuntoTable from "@/components/Sistema/Adjunto/AdjuntoTable.vue"
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue"

export default {
    name: 'ListView',
    components: {
        DefaultLayout,
        AdjuntoTable,
        BreadcrumbDefault
    },
    setup() {
        const pageTitle = ref("Listado")
        const urlCurrentName = ref("Adjunto")

        return {
            pageTitle,
            urlCurrentName
        }
    }
}
</script>