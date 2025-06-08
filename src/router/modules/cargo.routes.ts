import ListView from "@/views/Cargo/ListView.vue"
import FormView from "@/views/Cargo/FormView.vue"

export default [
    {
        path: '/cargo',
        name: 'listCargo',
        component: ListView,
        meta: { title: 'Cargo' }
    },
    {
        path: '/cargo/nuevo',
        name: 'formCargo',
        component: FormView,
        meta: { title: 'Nuevo Cargo' }
    },
    {
        path: '/cargo/editar/:id',
        name: 'editCargo',
        component: FormView,
        meta: { title: 'Editar Cargo' }
    }
]