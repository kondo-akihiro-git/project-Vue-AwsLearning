<script>
import { fetchAnnouncements } from '@/utils/service';

export default {
    data() {
        return {
            announcements: [],
            isLoading: true // ローディング状態を追加
        };
    },
    async created() {
        this.isLoading = true; // データ取得前にローディングをON
        const allAnnouncements = await fetchAnnouncements();

        // 2ヶ月以内のものだけを表示
        const twoMonthsAgo = new Date();
        twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
        this.announcements = allAnnouncements.filter(announcement => {
            return new Date(announcement.created_at) >= twoMonthsAgo;
        });

        this.isLoading = false; // データ取得後にローディングをOFF
    },
    methods: {
        // 日付フォーマット
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString("ja-JP", { year: 'numeric', month: '2-digit', day: '2-digit' });
        }
    }
};
</script>

<template>
    <div class="container">
        <div class="header-container is-flex is-align-items-center is-justify-content-space-between m-2">
            <div class="logo-container">
                <router-link to="/" class="has-text-black">
                    <img src="@/assets/logo.png" alt="AWS Logo" class="logo" />
                </router-link>
            </div>
        </div>
        <div class="box">
            <h1 class="title">お知らせ</h1>

            <!-- ローディング表示 -->
            <div v-if="isLoading" class="loading-overlay">
                <p class="loading-icon">データ読み込み中</p>
            </div>

            <!-- お知らせリスト -->
            <div v-else>
                <div v-if="announcements.length === 0">現在お知らせはありません。</div>
                <div v-else class="announcement-list-container">
                    <div v-for="announcement in announcements" :key="announcement.announceId" class="box has-background-light">
                        <h2 class="subtitle">{{ announcement.titleName }}</h2>
                        <p>{{ announcement.content }}</p>
                        <p class="has-text-grey">{{ formatDate(announcement.created_at) }}</p>
                    </div>
                </div>
            </div>

            <div class="m-2 has-text-right">
                <router-link to="/" class="button">ホーム画面に戻る</router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.announcement-list-container {
    max-height: 60vh; /* 必要に応じて高さを調整 */
    overflow-y: auto;  /* スクロール可能にする */
}

/* ローディング表示の中央配置 */
.loading-overlay {
    position: fixed; /* 画面に固定 */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center; /* 水平方向に中央 */
    align-items: center; /* 垂直方向に中央 */
    background-color: rgba(255, 255, 255, 0.7); /* 半透明の背景 */
    z-index: 1000; /* 他のコンテンツより前面に表示 */
}
.loading-icon::after {
    content: '.';
    animation: dot-blinking 1.5s steps(3, end) infinite;
    font-size: 2rem; /* 大きな文字に */
}

@keyframes dot-blinking {
    0% { content: '.'; }
    33% { content: '..'; }
    66% { content: '...'; }
    100% { content: '.'; }
}

/* ロゴとボタンの高さを揃える */
.logo-container {
    display: flex;
    align-items: center; /* ロゴを上下中央揃え */
}

/* ロゴ画像の中央配置 */
.logo {
    display: block;
    height: auto; /* 縦横比を維持 */
    max-height: 10vh; /* 画面の10%の高さ */
}
</style>
