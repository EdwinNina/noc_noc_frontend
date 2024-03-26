import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: {
        requiredAuth: true
      },
      children: [
        {
          path: '/admin/tasks',
          name: 'admin-tasks',
          component: () => import('../views/admin/AdminView.vue')
        },
        {
          path: '/admin/users',
          name: 'admin-users',
          component: () => import('../views/admin/UsersView.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const requiredAuth = to.meta.requiredAuth
  const store = useAuthStore()

  if (!store.auth?.user && requiredAuth) {
    next({ name: 'login' })
  } else if(store.auth?.user) {
    if(['/'].includes(to.path)) {
      next({ name: 'admin-tasks' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
