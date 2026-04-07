import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Entries from '../views/Entries.vue'
import New from '../views/New.vue'
import Show from '../views/Show.vue'
import Edit from '../views/Edit.vue'
import Test from '../views/Test.vue'
import About from '../views/About.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/entries', component: Entries },
  { path: '/entries/new', component: New },
  { path: '/entries/:id', component: Show },
  { path: '/entries/:id/edit', component: Edit },
  { path: '/test', component: Test },
  { path: '/about', component: About },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
