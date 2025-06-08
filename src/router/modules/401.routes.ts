import NotAuthorizedView from "@/views/Error/401.vue"

export default [
    {
        path: '/401',
        name: 'Unathorized',
        component: NotAuthorizedView,
        meta: { title: 'No autorizado' }
    }
]