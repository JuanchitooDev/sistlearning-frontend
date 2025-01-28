import ListView from "@/views/TipoEvento/ListView.vue"
import FormView from "@/views/TipoEvento/FormView.vue"

export default {
    path: '/tipo-evento',
    component: ListView,
    children: [
        { path: '/', component: ListView },
        { path: '/nuevo', component: FormView }
    ]
}

// import { Layout, ListView, FormView } from '@/views/TipoEvento'
// export default {
//     path: '/tipo-evento',
//     component: Layout,
//     children: [
//         { path: '', component: ListView },
//         { path: '/nuevo', component: FormView}
//     ]
// }