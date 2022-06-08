import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: '/',
    name: 'demo',
    component: () => import('@/views/demo.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router