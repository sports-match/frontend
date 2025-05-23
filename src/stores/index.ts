import { createPinia } from 'pinia';

export { useEventStore } from './event';
export { useUserStore } from './user';
export { usePlayerStatsStore } from './playerStats';

export const pinia = createPinia();
