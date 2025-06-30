import ComparePlayerPage from '@/pages/admin/playerStats/compare.vue';
import PlayerStatsPage from '@/pages/admin/playerStats/index.vue';
import ViewPlayerProfilePage from '@/pages/admin/playerStats/view.vue';

export const playerStats = [
  {
    path: 'playerStats',
    redirect: {
      name: 'PlayerStatsPage',
    },
    children: [
      {
        path: ':id',
        name: 'ViewPayerStats',
        component: ViewPlayerProfilePage,
      },
      {
        path: 'compare',
        name: 'ComparePlayerPage',
        component: ComparePlayerPage,
      },
      {
        path: '',
        name: 'PlayerStatsPage',
        component: PlayerStatsPage,
      },
    ],
  },
];
