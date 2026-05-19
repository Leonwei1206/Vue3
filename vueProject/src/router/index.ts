import { createRouter, createWebHistory } from 'vue-router'

import Login from '../components/login.vue'
import Register from '../components/register.vue'
import Home from '../components/home.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/register', component: Register },
  { path: '/home', component: Home,meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 防止直接到首頁
router.beforeEach((to) => {
  const token = localStorage.getItem('token')

  if (to.meta.requiresAuth && !token) {
    console.log('blocked')
    return '/'
  }

  return true
})
export default router