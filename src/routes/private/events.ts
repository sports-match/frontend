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
      component: () => import('@/pages/admin/events/upcoming.vue'),
    },
    {
      path: 'past',
      name: 'PastEvents',
      component: () => import('@/pages/admin/events/past.vue'),
    },
    {
      path: ':id',
      name: 'ViewEvent',
      component: () => import('@/pages/admin/events/view.vue'),
    },
    // {
    //   path: ':id/edit',
    //   name: 'EditEvent',
    //   // component: () => import('@/pages/admin/events/edit.vue'),
    // },
    // {
    //   path: 'create',
    //   name: 'CreateEvent',
    //   // component: () => import('@/pages/admin/events/create.vue'),
    // },
    {
      path: '',
      name: 'eventsPage',
      component: () => import('@/pages/admin/events/index.vue'),
    },
  ],
}];
