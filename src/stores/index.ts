import { createPinia } from 'pinia';

export { useEventStore } from './event';
export { useUserStore } from './user';

export const pinia = createPinia();
