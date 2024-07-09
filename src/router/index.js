import Vue from 'vue';
import VueRouter from 'vue-router';
// import { component } from 'vue/types/umd'

import TodoView from '../views/TodoView.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'todo',
    component: TodoView,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
