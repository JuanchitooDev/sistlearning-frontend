import ListView from "@/views/Trabajador/ListView.vue"
import FormView from "@/views/Trabajador/FormView.vue"

export default [
    {
        path: '/trabajador',
        name: 'listTrabajador',
        component: ListView,
        meta: { title: 'Trabajador' }
    },
    {
        path: '/trabajador/nuevo',
        name: 'formTrabajador',
        component: FormView,
        meta: { title: 'Nuevo Trabajador' }
    },
    {
        path: '/trabajador/editar/:id',
        name: 'editTrabajador',
        component: FormView,
        meta: { title: 'Editar Trabajador' }
    }
]