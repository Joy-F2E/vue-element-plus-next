import { createRouter, createWebHistory } from 'vue-router';
// 引入路由record类型限制，直接引入会报错，必须加 type
import type { RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import Container from '../components/container/src/index.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Container,
    children: [
      {
        path: '/',
        component: Home,
        children: []
      },
      {
        path: '/chooseIcon',
        component: () => import('../../src/views/chooseIcon/index.vue')
      }
    ]
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
  
})

export default router