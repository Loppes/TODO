import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '@/pages/index.vue'
import About from '@/pages/About.vue'

const routes = [
  { path: '/', component: HomeView , meta: { title: 'To-do'}},
  // { path: '/:id', component: TodoItem , meta: { title: 'To-do Item'}},
  { path: '/about', component: About , meta: { title: 'About Us'}},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;