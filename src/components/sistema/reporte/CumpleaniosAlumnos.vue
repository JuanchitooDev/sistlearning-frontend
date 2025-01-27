<template>
    <div
        class="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition-all"
        @click="downloadCumpleanios()"
    >
        <h3 class="text-xl font-semibold">{{ report.title }}</h3>
        <p class="text-gray-600">{{ report.description }}</p>
    </div>
</template>

<script>
import { useReporteStore } from '@/stores'

export default {
    name: 'CumpleaniosAlumnos',
    props: {
        report: {
            type: Object
        }
    },
    setup(props) {
        const reporteStore = useReporteStore()

        const downloadCumpleanios = () => {
            reporteStore.downloadCumpleanios()
        }

        return {
            downloadCumpleanios
        }
    }
}
</script>