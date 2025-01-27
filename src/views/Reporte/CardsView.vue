<template>
    <DefaultLayout>
        <BreadcrumbDefault :pageTitle="pageTitle" />
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <CumpleaniosAlumnos :report="report" />
        </div>
    </DefaultLayout>
</template>

<script>
import { ref } from "vue"
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue"
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import CumpleaniosAlumnos from "@/components/sistema/reporte/CumpleaniosAlumnos.vue"

export default {
    name: 'CardsView',
    components: {
        DefaultLayout,
        BreadcrumbDefault,
        CumpleaniosAlumnos
    },
    setup() {
        const pageTitle = ref("Reporte")
        const report = ref({
            title: 'Cumpleaños de alumnos',
            description: 'Listado de cumpleaños de alumnos'
        })

        return {
            pageTitle,
            report
        }
    }
}
</script>