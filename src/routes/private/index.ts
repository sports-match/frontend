import type { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/components/layouts/private';
import ClubSelect from '@/pages/auth/clubSelect.vue';
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
          path: 'profile',
          name: 'ProfilePage',
          component: () => import('@/pages/profile.vue'),
        },
        {
          path: 'club-select',
          name: 'ClubSelectPage',
          component: ClubSelect,
        },
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
  ],
}];
