import { createRouter, createWebHistory } from 'vue-router';

import Dashboard from "@/views/Dashboard/Dashboard.vue"

import TipoEventoView from "@/views/TipoEvento/ListView.vue"
import FormTipoEventoView from "@/views/TipoEvento/FormView.vue"

import EventoView from "@/views/Evento/ListView.vue"
import FormEventoView from "@/views/Evento/FormView.vue"

import AlumnoView from "@/views/Alumno/ListView.vue"
import CertificadoView from "@/views/Certificado/ListView.vue"
import ReporteView from "@/views/Reporte/CardsView.vue"

const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            title: 'Dashboard'
        }
    },
    {
        path: '/tipo-evento',
        name: 'tipoEvento',
        component: TipoEventoView,
        meta: {
            title: 'Tipo de evento'
        }
    },
    {
        path: '/tipo-evento/nuevo',
        name: 'newTipoEvento',
        component: FormTipoEventoView,
        meta: {
            title: 'Nuevo tipo de evento'
        }
    },
    {
        path: '/tipo-evento/editar/:id',
        name: 'editTipoEvento',
        component: FormTipoEventoView,
        meta: {
            title: 'Editar tipo de evento'
        }
    },
    {
        path: '/evento',
        name: 'evento',
        component: EventoView,
        meta: {
            title: 'Evento'
        }
    },
    {
        path: '/evento/nuevo',
        name: 'newEvento',
        component: FormEventoView,
        meta: {
            title: 'Nuevo evento'
        }
    },
    {
        path: '/evento/editar/:id',
        name: 'editEvento',
        component: FormEventoView,
        meta: {
            title: 'Editar evento'
        }
    },
    {
        path: '/alumno',
        name: 'alumno',
        component: AlumnoView,
        meta: {
            title: 'Alumno'
        }
    },
    {
        path: '/certificado',
        name: 'certificado',
        component: CertificadoView,
        meta: {
            title: 'Certificado'
        }
    },
    {
        path: '/reporte',
        name: 'reporte',
        component: ReporteView,
        meta: {
            title: 'Reporte'
        }
    }
]

export const router = createRouter({
    history: createWebHistory('/sistema'),
    routes
})

// router.beforeEach((to, from, next) => {
//     document.title = `Vue.js ${to.meta.title} | TailAdmin - Vue.js Tailwind CSS Dashboard Template`
//     next()
// })

// // import { useAuthStore } from '@/stores'
// import { Home } from '@/views'
// // import accountRoutes from './account.routes'
// import userRoutes from './user.routes'
// import tipoEventoRoutes from './tipoevento.routes'
// export const router = createRouter({
//     history: createWebHistory('/sistema'),
//     routes: [
//         { path: '/', component: Home },
//         // { ...accountRoutes },
//         { ...userRoutes },
//         { ...tipoEventoRoutes },
//         { path: '/:pathMatch(.*)*', redirect: '/' }
//     ]
// })

// // router.beforeEach(async (to) => {
// //     const publicPages = ['/account/login', '/account/register']
// //     const authRequired = !publicPages.includes(to.path)
// //     const authStore = useAuthStore()

// //     if (authRequired && !authStore.usuario) {
// //         authStore.returnUrl = to.fullPath
// //         return '/account/login'
// //     }
// // })