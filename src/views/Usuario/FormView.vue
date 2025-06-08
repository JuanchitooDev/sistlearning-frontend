<template>
    <DefaultLayout>
        <BreadcrumbDefault :pageTitle="pageTitle" :urlCurrentName="urlCurrentName" :options="options" />
        <div class="flex justify-center items-center">
            <div class="w-full max-w-3xl">
                <DefaultCard :cardTitle="cardTitle">
                    <UsuarioForm />
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
import UsuarioForm from "@/components/Sistema/Usuario/UsuarioForm.vue"

export default {
    name: 'FormView',
    components: {
        DefaultLayout,
        DefaultCard,
        BreadcrumbDefault,
        UsuarioForm
    },
    setup() {
        const pageTitle = ref("")
        const urlCurrentName = ref("Nuevo usuario")

        const cardTitle = ref("Formulario de registro")
        const route = useRoute()

        const options = ref(
            [
                {
                    'url': '/dashboard',
                    'title': 'Dashboard'
                },
                {
                    'url': '/usuario',
                    'title': 'Usuario'
                }
            ]
        )

        onMounted(() => {
            const usuarioId = route.params.id
            if (usuarioId) {
                pageTitle.value = "Editar usuario",
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