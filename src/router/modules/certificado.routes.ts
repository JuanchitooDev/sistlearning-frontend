import ListView from "@/views/Certificado/ListView.vue"
import FormView from "@/views/Certificado/FormView.vue"

export default [
    {
        path: '/certificado',
        name: 'listCertificado',
        component: ListView,
        meta: { title: 'Certificado' }
    },
    {
        path: '/certificado/nuevo',
        name: 'formCertificado',
        component: FormView,
        meta: { title: 'Nuevo Certificado' }
    },
    {
        path: '/certificado/editar/:id',
        name: 'editCertificado',
        component: FormView,
        meta: { title: 'Editar Certificado' }
    }
]