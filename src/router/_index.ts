import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import TipoEvento from '../views/TipoEvento.vue'
import Evento from '../views/Evento.vue'
import Alumno from '../views/Alumno.vue'
import Certificado from '../views/Certificado.vue'
import Login from '../views/Login.vue'
import CertificadoDetail from '../components/pagina/CertificadoDetail.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/tipo-evento',
    name: 'list-tipo-evento',
    component: TipoEvento,
    meta: { requiresAuth: true }
  },
  {
    path: '/evento',
    name: 'list-evento',
    component: Evento,
    meta: { requiresAuth: true }
  },
  {
    path: '/alumno',
    name: 'list-alumno',
    component: Alumno,
    meta: { requiresAuth: true }
  },
  {
    path: '/certificado',
    name: 'list-certificado',
    component: Certificado,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/certificado/:codigo',
    name: 'certificado-detail',
    component: CertificadoDetail,
    meta: { layout: 'no-sidebar' }
  }
];

const router = createRouter({
  history: createWebHashHistory('/sistema'),
  routes,
});

export default router;
