import App from '@/App.vue';
import { i18n } from '@/locales';
import router from '@/routes';
import { pinia } from '@/stores';
import { createApp } from 'vue';

import '@/assets/styles/main.css';
import 'nprogress/nprogress.css';

const app = createApp(App);
app.use(i18n);
app.use(router);
app.use(pinia);

app.mount('#app');
