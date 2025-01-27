<template>
    <DefaultLayout>
        <BreadcrumbDefault :pageTitle="pageTitle"/>
        <CertificadoTable />
    </DefaultLayout>
</template>

<script>
import { ref } from "vue"
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import CertificadoTable from "@/components/sistema/certificado/CertificadoTable.vue"
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue"

export default {
    name: 'ListView',
    components: {
        DefaultLayout,
        CertificadoTable,
        BreadcrumbDefault
    },
    setup() {
        const pageTitle = ref("Certificado")

        return {
            pageTitle
        }
    }
}
</script>