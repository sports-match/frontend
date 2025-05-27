import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

export { useEventStore } from './event';
export { usePlayerStatsStore } from './playerStats';
export { useUserStore } from './user';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export { pinia };
