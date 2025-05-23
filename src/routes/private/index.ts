import type { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/components/layouts/private';
import { events } from '@/routes/private/events';
import { playerStats } from '@/routes/private/playerStats';

export const privateRoutes: RouteRecordRaw[] = [{
  path: '',
  component: Layout,
  children: [
    ...events,
    ...playerStats,
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
