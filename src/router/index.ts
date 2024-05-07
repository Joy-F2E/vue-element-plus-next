import { createRouter, createWebHistory } from 'vue-router';
// 引入路由record类型限制，直接引入会报错，必须加 type
import type { RouteRecordRaw } from 'vue-router';
import Container from '../components/container/src/index.vue';
import Home from '../views/Home.vue';

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
      },
      {
        path: '/chooseArea',
        component: () => import('../../src/views/chooseArea/index.vue')
      },
      {
        path: '/trend',
        component: () => import('../../src/views/trend/index.vue')
      },
      {
        path: '/table',
        component: () => import('../../src/views/table/index.vue')
      },
      {
        path: '/menu',
        component: () => import('../../src/views/menu/index.vue')
      }
    ]
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
  
})

export default router