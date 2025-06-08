import ListView from "@/views/TipoEvento/ListView.vue"
import FormView from "@/views/TipoEvento/FormView.vue"

export default [
    {
        path: '/tipo-evento',
        name: 'listTipoEvento',
        component: ListView,
        meta: { title: 'Tipo de Evento' }
    },
    {
        path: '/tipo-evento/nuevo',
        name: 'formTipoEvento',
        component: FormView,
        meta: { title: 'Nuevo TipoEvento' }
    },
    {
        path: '/tipo-evento/editar/:id',
        name: 'editTipoEvento',
        component: FormView,
        meta: { title: 'Editar TipoEvento' }
    }
]