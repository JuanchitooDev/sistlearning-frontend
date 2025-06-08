<template>
    <DefaultLayout>
        <BreadcrumbDefault :pageTitle="pageTitle" :urlCurrentName="urlCurrentName"/>
        <div class="flex flex-col gap-10">
            <CargoTable />
        </div>
    </DefaultLayout>
</template>

<script>
import { ref } from "vue"
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import CargoTable from "@/components/Sistema/Cargo/CargoTable.vue"
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue"

export default {
    name: 'ListView',
    components: {
        DefaultLayout,
        CargoTable,
        BreadcrumbDefault
    },
    setup() {
        const pageTitle = ref("Listado")
        const urlCurrentName = ref("Cargo")

        return {
            pageTitle,
            urlCurrentName
        }
    }
}
</script>