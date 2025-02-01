<template>
    <DefaultLayout>
        <BreadcrumbDefault :pageTitle="pageTitle" />
        <div class="flex flex-col gap-10">
            <CertificadoTable />
        </div>
    </DefaultLayout>
</template>

<script>
import { ref } from "vue"
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import CertificadoTable from "@/components/Sistema/Certificado/CertificadoTable.vue"
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