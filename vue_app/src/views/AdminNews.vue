<template>
    <div class="container">
        <section class="section">
            <h1 class="title">お知らせ</h1>
            <div v-if="announcements.length === 0">現在お知らせはありません。</div>
            <div v-else class="announcement-list-container">
                <div v-for="announcement in announcements" :key="announcement.announceId" class="box">
                    <h2 class="subtitle">{{ announcement.titleName }}</h2>
                    <p>{{ announcement.content }}</p>
                    <p class="has-text-grey">{{ formatDate(announcement.created_at) }}</p>
                </div>
            </div>
        <div class="m-2">
            <router-link to="/" class="button is-link">ホーム画面に戻る</router-link>
        </div>
        </section>
    </div>
</template>

<script>
import { fetchAnnouncements } from '@/utils/service';

export default {
    data() {
        return {
            announcements: []
        };
    },
    async created() {
        const allAnnouncements = await fetchAnnouncements();
        const twoMonthsAgo = new Date();
        twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

        // 2ヶ月以内のものだけを表示
        this.announcements = allAnnouncements.filter(announcement => {
            return new Date(announcement.created_at) >= twoMonthsAgo;
        });
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString("ja-JP", { year: 'numeric', month: '2-digit', day: '2-digit' });
        }
    }
};
</script>


<style scoped>
.announcement-list-container {
    max-height: 65vh; /* 必要に応じて高さを調整 */
    overflow-y: auto;  /* スクロール可能にする */
}
</style>