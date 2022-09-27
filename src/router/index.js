import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home' },
  { path: '/modal', name: 'modal', component: () => import('@/views/modal') },
  { path: '/spinner', name: 'spinner', component: () => import('@/views/spinner') },
  { path: '/toast', name: 'toast', component: () => import('@/views/toast') },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
