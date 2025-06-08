import ListView from "@/views/Alumno/ListView.vue"
import FormView from "@/views/Alumno/FormView.vue"

export default [
    {
        path: '/alumno',
        name: 'listAlumno',
        component: ListView,
        meta: { title: 'Alumno' }
    },
    {
        path: '/alumno/nuevo',
        name: 'formAlumno',
        component: FormView,
        meta: { title: 'Nuevo Alumno' }
    },
    {
        path: '/alumno/editar/:id',
        name: 'editAlumno',
        component: FormView,
        meta: { title: 'Editar Alumno' }
    }
]