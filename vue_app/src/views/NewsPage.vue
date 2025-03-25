<script>
import { fetchAnnouncements } from '@/utils/service';
import LogoHeader from '@/components/LogoHeader.vue';
import DotLoading from '@/components/DotLoading.vue';
import NewsModal from '@/components/NewsModal.vue';

export default {
    components: {
        LogoHeader,
        DotLoading,
        NewsModal
    },
    data() {
        return {
            announcements: [],
            isLoading: true, // ローディング状態を追加
            isModalActive: false, // モーダルの状態
            selectedAnnouncement: null, // 選択されたお知らせ
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
        this.announcements.forEach(announcement => {
            const readStatus = localStorage.getItem(`announcement_${announcement.announceId}`);
            announcement.isRead = readStatus === 'true'; // 'true'の場合は既読
        });

        this.isLoading = false; // データ取得後にローディングをOFF
    },
    methods: {
        // 日付フォーマット
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString("ja-JP", { year: 'numeric', month: '2-digit', day: '2-digit' });
        },
        // モーダルを開く
        openModal(announcement) {
            // 既読に変更してlocalStorageに保存
            if (!announcement.isRead) {
                announcement.isRead = true;
                localStorage.setItem(`announcement_${announcement.announceId}`, 'true');
            }
            this.selectedAnnouncement = announcement;
            this.isModalActive = true;
        },

        // モーダルを閉じる
        closeModal() {
            this.isModalActive = false;
            this.selectedAnnouncement = null;
        },
    }
};
</script>

<template>
    <!-- ローディング表示 -->
    <DotLoading v-if="isLoading" />
    

    <div v-else class="container">
        <div class="header-container is-flex is-align-items-center is-justify-content-space-between m-2">
            <LogoHeader />
        </div>
        <div class="box">
            <h1 class="title">お知らせ</h1>

            <div v-if="announcements.length === 0">現在お知らせはありません。</div>
            <div v-else class="announcement-list-container">
                <div v-for="announcement in announcements" :key="announcement.announceId"
                    class="box has-background-light" @click="openModal(announcement)" style="cursor: pointer;">

                    <!-- タイトルとアイコンを同じ行に配置 -->
                    <div class="is-flex is-justify-content-space-between align-items-center">
                        <h2 class="subtitle">{{ announcement.titleName }}</h2>

                        <!-- 既読・未読アイコンの表示 -->
                        <span v-if="announcement.isRead" class="icon has-text-info ml-auto">
                            <i class="fas fa-check-circle"></i> <!-- 既読アイコン -->
                        </span>
                        <span v-else class="icon has-text-warning ml-auto">
                            <i class="fas fa-exclamation-circle"></i> <!-- 未読アイコン -->
                        </span>
                    </div>

                    <p>{{ announcement.content }}</p>
                    <p class="has-text-grey">{{ formatDate(announcement.created_at) }}</p>
                </div>
            </div>
        </div>

        <div class="m-2 has-text-right">
            <router-link to="/" class="button">ホーム画面に戻る</router-link>
        </div>

        <!-- モーダル -->
        <NewsModal
            :isActive="isModalActive"
            :selectedAnnouncement="selectedAnnouncement"
            @close="closeModal"
        />
    </div>

</template>


<style scoped>
.announcement-list-container {
    max-height: 60vh;
    /* 必要に応じて高さを調整 */
    overflow-y: auto;
    /* スクロール可能にする */
}

</style>
