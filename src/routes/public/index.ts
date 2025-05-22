import type { RouteRecordRaw } from 'vue-router';

import AuthLoginPage from '@/pages/auth/login/index.vue';

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: 'auth',
    redirect: {
      name: 'AuthLoginPage',
    },
    children: [
      {
        path: 'login',
        name: 'AuthLoginPage',
        component: AuthLoginPage,
      },
    ],
  },
];
