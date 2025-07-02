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

router.beforeEach((to, _, next) => {
  // set(isLoading, true);
  const { isAuthenticated, assessmentStatus } = useAuthentication();

  if (!to.meta.public && !get(isAuthenticated)) {
    return next({ name: 'HomePage', query: { redirect: to.fullPath } });
  } else if (to.meta.public && get(isAuthenticated)) {
    return next({ name: 'DashboardPage' });
  } else if (get(isAuthenticated) && !get(assessmentStatus) && to.name !== 'SkillAssessmentPage') {
    return next({ name: 'SkillAssessmentPage' });
  }
  next();
});

router.afterEach(() => {
  set(isLoading, false);
});

export default router;
