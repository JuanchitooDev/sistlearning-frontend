import ListView from "@/views/TipoEvento/ListView.vue"
import FormView from "@/views/TipoEvento/FormView.vue"

export default [
    {
        path: '/tipo-evento',
        name: 'List TipoEvento',
        component: ListView,
        meta: { title: 'Tipo de Evento' }
    },
    // {
    //     path: '/tipo-evento/nuevo',
    //     name: 'Form TipoEvento',
    //     component: FormView,
    //     meta: { title: 'Nuevo Tipo de Evento' }
    // }
]

// import { Layout, ListView, FormView } from '@/views/TipoEvento'
// export default {
//     path: '/tipo-evento',
//     component: Layout,
//     children: [
//         { path: '', component: ListView },
//         { path: '/nuevo', component: FormView}
//     ]
// }