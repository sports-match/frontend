import type { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/components/layouts/private';
import { events } from '@/routes/private/events';
import { playerStats } from '@/routes/private/playerStats';

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
          path: 'skill-assessment',
          name: 'SkillAssessmentPage',
          component: () => import('@/pages/users/skillAssessment/index.vue'),
        },
        {
          path: 'dashboard',
          name: 'DashboardPage',
          component: () => import('@/pages/dashboard.vue'),
        },
      ],
    },
    ...events,
    ...playerStats,
  ],
}];
