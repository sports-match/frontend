export const events = [{
  path: 'events',
  redirect: {
    name: 'eventsPage',
  },
  children: [
    {
      path: 'upcoming',
      name: 'UpcomingEvents',
      component: () => import('@/pages/events/upcoming.vue'),
    },
    {
      path: 'past',
      name: 'PastEvents',
      component: () => import('@/pages/events/past.vue'),
    },
    {
      path: ':id',
      name: 'ViewEvent',
      component: () => import('@/pages/events/view.vue'),
    },
    {
      path: ':id/edit',
      name: 'EditEvent',
      // component: () => import('@/pages/events/edit.vue'),
    },
    {
      path: 'create',
      name: 'CreateEvent',
      // component: () => import('@/pages/events/create.vue'),
    },
    {
      path: '',
      name: 'eventsPage',
      // component: () => import('@/pages/events/index.vue'),
    },
  ],
}];
