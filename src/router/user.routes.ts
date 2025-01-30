import { Layout, List } from '@/views/Usuario'

export default {
    path: '/usuarios',
    component: Layout,
    children: [
        { path: '', component: List }
    ]
}