<template>
    <DefaultLayout>
        <BreadcrumbDefault :pageTitle="pageTitle" :urlCurrentName="urlCurrentName"/>
        <div class="flex flex-col gap-10">
            <TrabajadorTable />
        </div>
    </DefaultLayout>
</template>

<script>
import { ref } from "vue"
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import TrabajadorTable from "@/components/Sistema/Trabajador/TrabajadorTable.vue"
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue"

export default {
    name: 'ListView',
    components: {
        DefaultLayout,
        TrabajadorTable,
        BreadcrumbDefault
    },
    setup() {
        const pageTitle = ref("Listado")
        const urlCurrentName = ref("Trabajador")

        return {
            pageTitle,
            urlCurrentName
        }
    }
}
</script>