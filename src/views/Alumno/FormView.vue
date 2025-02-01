<template>
    <DefaultLayout>
        <BreadcrumbDefault :pageTitle="pageTitle" />
        <div class="flex justify-center items-center">
            <div class="w-full max-w-3xl">
                <DefaultCard :cardTitle="cardTitle">
                    <AlumnoForm />
                </DefaultCard>
            </div>
        </div>
    </DefaultLayout>
</template>

<script>
import { ref } from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import DefaultCard from "@/components/Common/DefaultCard.vue"
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue"
import AlumnoForm from "@/components/Sistema/Alumno/AlumnoForm.vue"

export default {
    name: 'FormView',
    components: {
        DefaultLayout,
        DefaultCard,
        BreadcrumbDefault,
        AlumnoForm
    },
    setup() {
        const pageTitle = ref("Nuevo alumno")

        const cardTitle = ref("Nuevo alumno")

        return {
            pageTitle,
            cardTitle
        }
    }
}
</script>