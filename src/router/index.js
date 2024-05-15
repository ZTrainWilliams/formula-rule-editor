import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      keepAlive: true,
      requireAuth: false,
    },
    component: () => import('@/views/login/login.vue'),
  },
  {
    path: '/',
    name: 'Index',
    meta: {
      title: '首页',
      keepAlive: true,
      requireAuth: true,
    },
    component: () => import('@/views/home/index.vue'),
  },
  {
    path: '/select-tree',
    name: 'select-tree',
    meta: {
      title: '树形选择',
      keepAlive: true,
      requireAuth: true,
    },
    component: () => import('@/views/select-tree-page/index.vue'),
  },
  {
    path: '/canvas-animation',
    name: 'canvas-animation',
    meta: {
      title: 'canvas-animation',
    },
    component: () => import('@/views/canvas-animation/index.vue'),
  },
  {
    path: '/hm-time-picker',
    name: 'hm-time-picker',
    meta: {
      title: 'hm-time-picker',
    },
    component: () => import('@/views/hm-time-picker/index.vue'),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
export default router;
