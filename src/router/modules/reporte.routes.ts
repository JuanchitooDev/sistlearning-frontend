import CardView from "@/views/Reporte/CardsView.vue"

export default [
    {
        path: '/reporte/alumnos-cumpleanios',
        name: 'listAlumnosCumpleanios',
        component: CardView,
        meta: { title: 'Listado de cumpleaños de alumnos' }
    },
    {
        path: '/reporte/alumnos',
        name: 'listAlumnos',
        component: CardView,
        meta: { title: 'Listado de alumnos' }
    },
    {
        path: '/reporte/personas',
        name: 'listPersonas',
        component: CardView,
        meta: { title: 'Listado de personas' }
    }
]