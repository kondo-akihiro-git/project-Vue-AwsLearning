<template>
    <div class="container">
        <section class="section">
            <h1 class="title">お知らせ</h1>
            <div v-if="announcements.length === 0">現在お知らせはありません。</div>
            <div v-else>
                <div v-for="announcement in announcements" :key="announcement.id" class="box">
                    <h2 class="subtitle">{{ announcement.title }}</h2>
                    <p>{{ announcement.content }}</p>
                    <p class="has-text-grey">{{ formatDate(announcement.created_at) }}</p>
                </div>
            </div>
            <router-link to="/" class="button is-link">ホーム画面に戻る</router-link>
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
        this.announcements = await fetchAnnouncements();
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString("ja-JP", { year: 'numeric', month: '2-digit', day: '2-digit' });
        }
    }
};
</script>
