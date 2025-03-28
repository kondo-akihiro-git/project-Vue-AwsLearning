import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App)
    // ルーターの追加
    .use(router)
    .mount('#app');
