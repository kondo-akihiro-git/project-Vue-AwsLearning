import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import AwsClf from '../views/AwsClf.vue';
import AwsAif from '../views/AwsAif.vue';
import NewsInfo from '@/views/NewsInfo.vue';
import AdminPage from '@/views/AdminPage.vue';

// 各ページへのルーティング
const routes = [
    { path: '/', component: HomePage },
    { path: '/aws-clf', component: AwsClf },
    { path: '/aws-aif', component: AwsAif },
    { path: '/news-info', component: NewsInfo },
    { path: '/admin', component: AdminPage },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
