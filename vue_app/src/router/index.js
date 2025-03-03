import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import FirstPage from '../views/FirstPage.vue';
import SecondPage from '../views/SecondPage.vue';
import ThirdPage from '../views/ThirdPage.vue';

// 各ページへのルーティング
const routes = [
    { path: '/', component: HomePage },
    { path: '/page1', component: FirstPage },
    { path: '/page2', component: SecondPage },
    { path: '/page3', component: ThirdPage },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
