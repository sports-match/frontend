export const playerStats = [
  {
    path: 'playerStats',
    redirect: {
      name: 'PlayerStatsPage',
    },
    children: [
      {
        path: '',
        name: 'PlayerStatsPage',
        component: () => import('@/pages/playerStats/index.vue'),
      },
    ],
  },
];
