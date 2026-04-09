import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Entries from '../views/Entries.vue'
import New from '../views/New.vue'
import Show from '../views/Show.vue'
import Edit from '../views/Edit.vue'
import Test from '../views/Test.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import { isAuthenticated } from '../services/auth'

const routes = [
  { path: '/', component: Home, meta: { requiresAuth: true } },
  { path: '/entries', component: Entries, meta: { requiresAuth: true } },
  { path: '/entries/new', component: New, meta: { requiresAuth: true } },
  { path: '/entries/:id', component: Show, meta: { requiresAuth: true } },
  { path: '/entries/:id/edit', component: Edit, meta: { requiresAuth: true } },
  { path: '/test', component: Test, meta: { requiresAuth: true } },
  { path: '/about', component: About, meta: { requiresAuth: true } },
  { path: '/login', component: Login, meta: { publicOnly: true } },
  { path: '/signup', component: Signup, meta: { publicOnly: true } },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const authed = isAuthenticated()

  if (to.meta.requiresAuth && !authed) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }

  if (to.meta.publicOnly && authed) {
    return { path: '/' }
  }

  return true
})

export default router
