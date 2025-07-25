import { useAuthentication } from '@/composables';
import { get, set } from '@vueuse/core';
import { useNProgress } from '@vueuse/integrations/useNProgress';
import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { privateRoutes } from './private';
import { publicRoutes } from './public';

const { isLoading } = useNProgress(null, {
  template: '<div class="bar" role="bar"><div class="peg"></div></div>',
});

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE),
  routes: [
    {
      path: '/',
      redirect: {
        name: 'DashboardPage',
      },
      children: [
        ...publicRoutes,
        ...privateRoutes,
      ],
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFoundPage',
      component: defineAsyncComponent(() => import('@/pages/notFound.vue')),
    },
  ],
});

router.beforeEach((to, from, next) => {
  // set(isLoading, true);
  const { isAuthenticated, assessmentStatus, completedClubSelectionStatus, isPlayer, isOrganizer } = useAuthentication();

  if (!to.meta.public && !get(isAuthenticated) && to.name !== 'ViewEvent') {
    return next({ name: 'HomePage', query: { redirect: to.fullPath } });
  } else if (to.meta.public && get(isAuthenticated)) {
    return next({ name: 'DashboardPage' });
  } else if (get(isAuthenticated) && !get(assessmentStatus) && get(isPlayer) && to.name !== 'SkillAssessmentPage') {
    return next({ name: 'SkillAssessmentPage', query: { redirect: from.query.redirect } });
  } else if (get(isAuthenticated) && !get(completedClubSelectionStatus) && get(isOrganizer) && to.name !== 'ClubSelectPage') {
    return next({ name: 'ClubSelectPage' });
  }
  next();
});

router.afterEach(() => {
  set(isLoading, false);
});

export default router;
