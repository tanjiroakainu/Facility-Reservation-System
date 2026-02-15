import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import AdminLayout from '@/admin/AdminLayout.vue'
import ClientLayout from '@/client/ClientLayout.vue'
import { useAuthStore } from '@/stores/authStore'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/client',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { guest: true },
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAdmin: true },
    children: [
      { path: '', redirect: '/admin/facilities' },
      { path: 'facilities', name: 'AdminFacilities', component: () => import('@/admin/views/AdminFacilities.vue') },
      { path: 'reservations', name: 'AdminReservations', component: () => import('@/admin/views/AdminReservations.vue') },
      { path: 'users', name: 'AdminUserManagement', component: () => import('@/admin/views/AdminUserManagement.vue') },
    ],
  },
  {
    path: '/admin/login',
    redirect: '/login',
  },
  {
    path: '/client',
    component: ClientLayout,
    children: [
      { path: '', name: 'ClientHome', component: () => import('@/client/views/ClientHome.vue') },
      { path: 'reserve', name: 'ClientReserve', component: () => import('@/client/views/ClientReserve.vue'), meta: { requiresClient: true } },
      { path: 'register', name: 'ClientRegister', component: () => import('@/client/views/ClientRegister.vue') },
      { path: 'login', redirect: '/login' },
    ],
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, _from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAdmin && !auth.isAdmin) {
    next({ path: '/login', query: { redirect: to.fullPath } })
    return
  }
  if (to.meta.requiresClient && !auth.isClientLoggedIn) {
    next({ path: '/login', query: { redirect: to.fullPath } })
    return
  }
  if (to.meta.guest && to.path === '/login') {
    if (auth.isAdmin) {
      next('/admin')
      return
    }
    if (auth.isClientLoggedIn) {
      next('/client')
      return
    }
  }
  next()
})

export default router
