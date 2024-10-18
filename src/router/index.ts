import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import TipoEvento from '../views/TipoEvento.vue'
import CreateTipoEvento from '../views/CreateTipoEvento.vue'
import EditTipoEvento from '../views/EditTipoEvento.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/tipo-evento',
    name: 'list-tipo-evento',
    component: TipoEvento
  },
  {
    path: '/tipo-evento/crear',
    name: 'create-tipo-evento',
    component: CreateTipoEvento
  },
  {
    path: '/tipo-evento/editar/:id',
    name: 'edit-tipo-evento',
    component: EditTipoEvento
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
