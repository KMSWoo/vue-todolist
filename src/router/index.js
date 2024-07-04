import Vue from 'vue';
import VueRouter from 'vue-router';
// import { component } from 'vue/types/umd'

import HomeView from '../views/HomeView.vue';
import TodoView from '../views/TodoView.vue';

Vue.use(VueRouter);

const routes = [
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
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
  {
    path: '/todo',
    name: 'todo',
    component: TodoView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
