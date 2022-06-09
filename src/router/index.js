import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/demo',
    name: 'demo',
    component: () => import('@/views/demo.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
