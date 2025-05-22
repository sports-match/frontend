import { createPinia } from 'pinia';

export { useCounterStore } from './counter';
export { useUserStore } from './user';

export const pinia = createPinia();
