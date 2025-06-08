<template>
    <DefaultLayout>
        <BreadcrumbDefault :pageTitle="pageTitle" :urlCurrentName="urlCurrentName" :options="options" />
        <div class="flex justify-center items-center">
            <div class="w-full max-w-3xl">
                <DefaultCard :cardTitle="cardTitle">
                    <AdjuntoForm />
                </DefaultCard>
            </div>
        </div>
    </DefaultLayout>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router"
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import DefaultCard from "@/components/Common/DefaultCard.vue"
import BreadcrumbDefault from "@/components/Breadcrumbs/BreadcrumbDefault.vue"
import AdjuntoForm from "@/components/Sistema/Adjunto/AdjuntoForm.vue"

export default {
    name: 'FormView',
    components: {
        DefaultLayout,
        DefaultCard,
        BreadcrumbDefault,
        AdjuntoForm
    },
    setup() {
        const pageTitle = ref("")
        const urlCurrentName = ref("Nuevo adjunto")

        const cardTitle = ref("Formulario de registro")
        const route = useRoute()

        const options = ref(
            [
                {
                    'url': '/',
                    'title': 'Dashboard'
                },
                {
                    'url': '/adjunto',
                    'title': 'Adjunto'
                }
            ]
        )

        onMounted(() => {
            const adjuntoId = route.params.id
            if (adjuntoId) {
                pageTitle.value = "Editar adjunto",
                    cardTitle.value = "Formulario de actualización"
            }
        })

        return {
            pageTitle,
            urlCurrentName,
            cardTitle,
            options
        }
    }
}
</script>