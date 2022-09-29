import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'home' },
  { path: '/modal', name: 'modal', component: () => import('@/views/modal') },
  { path: '/spinner', name: 'spinner', component: () => import('@/views/spinner') },
  { path: '/toast', name: 'toast', component: () => import('@/views/toast') },
  { path: '/pagination', name: 'pagination', component: () => import('@/views/pagination') },
  { path: '/tooltip', name: 'tooltip', component: () => import('@/views/tooltip') },
  { path: '/form', name: 'form', component: () => import('@/views/form') },
  { path: '/listTable', name: 'listTable', component: () => import('@/views/listTable') },
  { path: '/datePicker', name: 'datePicker', component: () => import('@/views/datePicker') },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
