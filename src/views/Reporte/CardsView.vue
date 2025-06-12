<template>
    <DefaultLayout>
        <BreadcrumbDefault :pageTitle="pageTitle" />
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <CumpleaniosAlumnos :report="reportCumpleanios" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ListAlumnos :report="reportAlumnos" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <ListPersonas :report="reportPersonas" />
        </div>
    </DefaultLayout>
</template>

<script>
import { ref } from "vue"
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue"
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import CumpleaniosAlumnos from "@/components/Sistema/Reporte/CumpleaniosAlumnos.vue"
import ListAlumnos from "@/components/Sistema/Reporte/ListAlumnos.vue"
import ListPersonas from "@/components/Sistema/Reporte/ListPersonas.vue"

export default {
    name: 'CardsView',
    components: {
        DefaultLayout,
        BreadcrumbDefault,
        CumpleaniosAlumnos,
        ListAlumnos,
        ListPersonas
    },
    setup() {
        const pageTitle = ref("Reportes")

        const reportCumpleanios = ref({
            title: 'Cumpleaños de alumnos',
            description: 'Listado de cumpleaños de alumnos'
        })

        const reportAlumnos = ref({
            title: 'Alumnos',
            description: 'Listado de alumnos'
        })

        const reportPersonas = ref({
            title: 'Personas',
            description: 'Listado de personas'
        })

        return {
            pageTitle,
            reportCumpleanios,
            reportAlumnos,
            reportPersonas
        }
    }
}
</script>