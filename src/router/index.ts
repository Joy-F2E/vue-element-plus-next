import { createRouter, createWebHistory } from 'vue-router';
// 引入路由record类型限制，直接引入会报错，必须加 type
import type { RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Home,
    children: []
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
  
})

export default router