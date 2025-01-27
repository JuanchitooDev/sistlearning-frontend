<template>
    <DefaultLayout>
        <BreadcrumbDefault :pageTitle="pageTitle"/>
        <AlumnoTable />
    </DefaultLayout>
</template>

<script>
import { ref } from "vue"
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import AlumnoTable from "@/components/sistema/alumno/AlumnoTable.vue"
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue"

export default {
    name: 'ListView',
    components: {
        DefaultLayout,
        AlumnoTable,
        BreadcrumbDefault
    },
    setup() {
        const pageTitle = ref("Alumno")

        return {
            pageTitle
        }
    }
}
</script>