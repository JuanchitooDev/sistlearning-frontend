import { Layout, List } from '@/views/tipo-evento'

export default {
    path: '/tipo-evento',
    component: Layout,
    children: [
        { path: '', component: List }
    ]
}