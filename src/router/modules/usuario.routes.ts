import ListView from "@/views/Usuario/ListView.vue"
import FormView from "@/views/Usuario/FormView.vue"

export default [
    {
        path: '/usuario',
        name: 'listUsuario',
        component: ListView,
        meta: { title: 'Usuario' }
    },
    {
        path: '/usuario/nuevo',
        name: 'formUsuario',
        component: FormView,
        meta: { title: 'Nuevo Usuario' }
    },
    {
        path: '/usuario/editar/:id',
        name: 'editUsuario',
        component: FormView,
        meta: { title: 'Editar Usuario' }
    }
]