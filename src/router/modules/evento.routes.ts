import ListView from "@/views/Evento/ListView.vue"
import FormView from "@/views/Evento/FormView.vue"

export default [
    {
        path: '/evento',
        name: 'listEvento',
        component: ListView,
        meta: { title: 'Evento' }
    },
    {
        path: '/evento/nuevo',
        name: 'formEvento',
        component: FormView,
        meta: { title: 'Nuevo Evento' }
    },
    {
        path: '/evento/editar/:id',
        name: 'editEvento',
        component: FormView,
        meta: { title: 'Editar Evento' }
    }
]