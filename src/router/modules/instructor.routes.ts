import ListView from "@/views/Instructor/ListView.vue"
import FormView from "@/views/Instructor/FormView.vue"

export default [
    {
        path: '/instructor',
        name: 'listInstructor',
        component: ListView,
        meta: { title: 'Instructor' }
    },
    {
        path: '/instructor/nuevo',
        name: 'formInstructor',
        component: FormView,
        meta: { title: 'Nuevo Instructor' }
    },
    {
        path: '/instructor/editar/:id',
        name: 'editInstructor',
        component: FormView,
        meta: { title: 'Editar Instructor' }
    }
]