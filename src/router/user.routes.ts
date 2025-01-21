import { Layout, List } from '@/views/usuarios'

export default {
    path: '/usuarios',
    component: Layout,
    children: [
        { path: '', component: List }
    ]
}