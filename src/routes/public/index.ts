import type { RouteRecordRaw } from 'vue-router';

import AuthLoginPage from '@/pages/auth/login/index.vue';
import Signup from '@/pages/auth/signup.vue';
import VerifyEmail from '@/pages/auth/verifyEmail.vue';

export const publicRoutes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'HomePage',
    component: () => import('@/pages/public/home.vue'),
    meta: {
      public: true,
    },
  },
  {
    path: 'auth',
    redirect: {
      name: 'AuthLoginPage',
    },
    meta: {
      public: true,
    },
    children: [
      {
        path: 'verify-email',
        name: 'VerifyEmailPage',
        component: VerifyEmail,
      },
      {
        path: 'signup',
        name: 'AuthSignupPage',
        component: Signup,
      },
      {
        path: 'login',
        name: 'AuthLoginPage',
        component: AuthLoginPage,
      },
    ],
  },
];
