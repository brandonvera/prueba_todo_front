import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/auth/Login.vue'
import Guard from "@/services/verify";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: HomeView
  },
  {
    path: '/registro',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '../views/auth/Register.vue')
  },
  {
    path: '/tareas',
    name: 'task',
    component: () => import(/* webpackChunkName: "about" */ '../views/tasks/TaskList.vue'),
    beforeEnter: Guard.auth,
  },
  {
    path: '/tareas/editar/:id',
    name: 'task-edit',
    component: () => import(/* webpackChunkName: "about" */ '../views/tasks/TaskEdit.vue'),
    beforeEnter: Guard.auth,
  },
  {
    path: '/tarea/crear',
    name: 'task-add',
    component: () => import(/* webpackChunkName: "about" */ '../views/tasks/AddTask.vue'),
    beforeEnter: Guard.auth,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
