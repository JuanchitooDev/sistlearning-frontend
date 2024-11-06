import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
// import HomeView from '../views/HomeView.vue';
import TipoEvento from '../views/TipoEvento.vue'
import Evento from '../views/Evento.vue'
// import Trabajador from '../views/Trabajador.vue'
// import Evento from '../views/Evento.vue'
import Alumno from '../views/Alumno.vue'
// import Cargo from '../views/Cargo.vue'
import Certificado from '../views/Certificado.vue'
// import CreateTipoEvento from '../views/CreateTipoEvento.vue'
// import EditTipoEvento from '../views/EditTipoEvento.vue'
import CertificadoDetail from '../components/pagina/CertificadoDetail.vue'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView,
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  // },
  // {
  //   path: '/cargo',
  //   name: 'list-cargo',
  //   component: Cargo
  // },
  {
    path: '/tipo-evento',
    name: 'list-tipo-evento',
    component: TipoEvento
  },
  {
    path: '/evento',
    name: 'list-evento',
    component: Evento
  },
  {
    path: '/alumno',
    name: 'list-alumno',
    component: Alumno
  },
  {
    path: '/certificado',
    name: 'list-certificado',
    component: Certificado
  },
  {
    path: '/certificado/:codigo',
    name: 'certificado-detail',
    component: CertificadoDetail,
    meta: {layout: 'no-sidebar'}
  }
  // {
  //   path: '/trabajador',
  //   name: 'list-trabajador',
  //   component: Trabajador
  // },
  // {
  //   path: '/tipo-evento/crear',
  //   name: 'create-tipo-evento',
  //   component: CreateTipoEvento
  // },
  // {
  //   path: '/tipo-evento/editar/:id',
  //   name: 'edit-tipo-evento',
  //   component: EditTipoEvento
  // }
];

const router = createRouter({
  history: createWebHashHistory('/sistema'),
  routes,
});

export default router;
