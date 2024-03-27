import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import { useAuthStore } from '@/stores/authStore'
import ForgotPasswordView from '@/views/ForgotPasswordView.vue'
import UpdatePasswordView from '@/views/UpdatePasswordView.vue'
import ResetPasswordView from '@/views/ResetPasswordView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordView
    },
    {
      path: '/restore/:token',
      name: 'update-password',
      component: UpdatePasswordView
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPasswordView
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
        },
        {
          path: '/admin/tasks/:id',
          name: 'admin-task',
          component: () => import('../views/admin/TaskView.vue')
        },
        {
          path: '/admin/reportes',
          name: 'admin-reportes',
          component: () => import('../views/admin/ReporteView.vue')
        },
        {
          path: '/admin/tasks/manage',
          name: 'admin-tasks-manage',
          component: () => import('../views/admin/TasksManageView.vue')
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
