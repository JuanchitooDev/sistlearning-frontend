import ListView from "@/views/Adjunto/ListView.vue"
import FormView from "@/views/Adjunto/FormView.vue"

export default [
    {
        path: '/adjunto',
        name: 'listAdjunto',
        component: ListView,
        meta: { title: 'Adjunto' }
    },
    {
        path: '/adjunto/nuevo',
        name: 'formAdjunto',
        component: FormView,
        meta: { title: 'Nuevo Adjunto' }
    },
    {
        path: '/adjunto/editar/:id',
        name: 'editAdjunto',
        component: FormView,
        meta: { title: 'Editar Adjunto' }
    }
]