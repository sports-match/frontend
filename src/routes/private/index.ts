import type { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/components/layouts/private';

export const privateRoutes: RouteRecordRaw[] = [{
  path: '',
  component: Layout,
  children: [
    {
      path: '',
      redirect: {
        name: 'DashboardPage',
      },
      children: [

        {
          path: 'dashboard',
          name: 'DashboardPage',
          component: () => import('@/pages/dashboard/index.vue'),
        },
      ],
    },
  ],
}];
