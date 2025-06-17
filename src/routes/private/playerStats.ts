import ComparePlayerPage from '@/pages/admin/playerStats/compare.vue';
import PlayerStatsPage from '@/pages/admin/playerStats/index.vue';

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
        component: PlayerStatsPage,
      },
      {
        path: 'compare',
        name: 'ComparePlayerPage',
        component: ComparePlayerPage,
      },
    ],
  },
];
