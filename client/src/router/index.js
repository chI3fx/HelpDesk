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
import PublicLookup from '../views/PublicLookup.vue'
import { isAuthenticated } from '../services/auth'

const routes = [
  { path: '/', component: PublicLookup },
  { path: '/lookup', component: PublicLookup },
  { path: '/staff', component: Home, meta: { requiresAuth: true }, alias: ['/home'] },
  { path: '/staff/entries', component: Entries, meta: { requiresAuth: true }, alias: ['/entries'] },
  { path: '/staff/entries/new', component: New, meta: { requiresAuth: true }, alias: ['/entries/new'] },
  { path: '/staff/entries/:id', component: Show, meta: { requiresAuth: true }, alias: ['/entries/:id'] },
  { path: '/staff/entries/:id/edit', component: Edit, meta: { requiresAuth: true }, alias: ['/entries/:id/edit'] },
  { path: '/staff/quiz', component: Test, meta: { requiresAuth: true }, alias: ['/test'] },
  { path: '/staff/about', component: About, meta: { requiresAuth: true }, alias: ['/about'] },
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
    return { path: '/staff' }
  }

  return true
})

export default router
