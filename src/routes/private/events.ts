import type { RouteRecordRaw } from 'vue-router';

export const events: RouteRecordRaw[] = [{
  path: 'events',
  redirect: {
    name: 'eventsPage',
  },
  children: [
    {
      path: 'upcoming',
      name: 'UpcomingEvents',
      component: () => import('@/pages/events/index.vue'),
    },
    {
      path: 'past',
      name: 'PastEvents',
      component: () => import('@/pages/events/index.vue'),
    },
    {
      path: ':id',
      name: 'ViewEvent',
      component: () => import('@/pages/events/view.vue'),
    },
    {
      path: '',
      name: 'eventsPage',
      component: () => import('@/pages/events/index.vue'),
    },
  ],
}];
