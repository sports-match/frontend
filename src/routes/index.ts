import { useAuthentication } from '@/composables';
import { get, set } from '@vueuse/core';
import { useNProgress } from '@vueuse/integrations/useNProgress';
import { createRouter, createWebHistory } from 'vue-router';
import { privateRoutes } from './private';
import { publicRoutes } from './public';

const { isLoading } = useNProgress(null, {
  template: '<div class="bar" role="bar"><div class="peg"></div></div>',
});

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE),
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
  ],
});

router.beforeEach((to, _, next) => {
  // set(isLoading, true);
  const { isAuthenticated } = useAuthentication();

  if (!to.meta.public && !get(isAuthenticated))
    return next({ name: 'HomePage' });
  else if (to.meta.public && get(isAuthenticated))
    return next({ name: 'DashboardPage' });
  else
    next();
});

router.afterEach(() => {
  set(isLoading, false);
});

export default router;
