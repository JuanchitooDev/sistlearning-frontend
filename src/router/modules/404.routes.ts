import NotFoundView from "@/views/Error/404.vue"

export default [
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFoundView,
        meta: { title: 'No encontrado' }
    }
]