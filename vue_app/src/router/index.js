import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import AwsClf from '../views/AwsClf.vue';
import AwsAif from '../views/AwsAif.vue';

// 各ページへのルーティング
const routes = [
    { path: '/', component: HomePage },
    { path: '/aws-clf', component: AwsClf },
    { path: '/aws-aif', component: AwsAif },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
