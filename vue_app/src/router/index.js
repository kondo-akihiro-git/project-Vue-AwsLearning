import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import AwsClf from '../views/AwsClf.vue';
import AwsAif from '../views/AwsAif.vue';
import NewsInfo from '@/views/NewsInfo.vue';
import AdminPage from '@/views/AdminPage.vue';
import LoginPage from '@/views/LoginPage.vue';

// 各ページへのルーティング
const routes = [
    { path: '/', component: HomePage },
    { path: '/aws-clf', component: AwsClf },
    { path: '/aws-aif', component: AwsAif },
    { path: '/news-info', component: NewsInfo },
    { path: '/admin', component: AdminPage, meta: { requiresAuth: true } },
    { path: '/login', component: LoginPage },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

// ルートガード：認証が必要なページにアクセスする前にチェック
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        const user = JSON.parse(localStorage.getItem('user')); // ローカルストレージからユーザー情報を取得
        if (!user) {
            // ログインしていない場合、ログインページにリダイレクト
            next({ path: '/login' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
