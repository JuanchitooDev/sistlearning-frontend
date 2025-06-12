<template>
    <div class="bg-white p-5 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition-all"
        @click="downloadPersonas()">
        <h3 class="text-xl font-semibold">{{ report.title }}</h3>
        <p class="text-gray-600">{{ report.description }}</p>
    </div>
</template>

<script>
import { useReporteStore, useToastStore } from '@/stores'

export default {
    name: 'ListPersonas',
    props: {
        report: {
            type: Object
        }
    },
    setup(props) {
        const reporteStore = useReporteStore()
        const storeToast = useToastStore()

        const downloadPersonas = async () => {
            await reporteStore.downloadPersonasExcel()
            const classToast = (storeToast.result) ? 'success' : 'error'
            storeToast.addToast(storeToast.message, classToast)
        }

        return {
            downloadPersonas
        }
    }
}
</script>