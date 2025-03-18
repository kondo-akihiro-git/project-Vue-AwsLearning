<script>
import { fetchAnnouncements } from '@/utils/service';

export default {
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
            <div class="modal" :class="{ 'is-active': isModalActive }">
                <div class="modal-background" @click="closeModal"></div>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">
                            {{ selectedAnnouncement ? selectedAnnouncement.titleName : '' }}
                        </p>
                        <button class="delete" aria-label="close" @click="closeModal"></button>
                    </header>
                    <section class="modal-card-body">
                        <p v-if="selectedAnnouncement">
                            {{ selectedAnnouncement.content }}
                        </p>
                    </section>
                    <footer class="modal-card-foot is-justify-content-flex-end">
                        <button class="button is-light" @click="closeModal">閉じる</button>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
.announcement-list-container {
    max-height: 60vh;
    /* 必要に応じて高さを調整 */
    overflow-y: auto;
    /* スクロール可能にする */
}

/* ローディング表示の中央配置 */
.loading-overlay {
    position: fixed;
    /* 画面に固定 */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    /* 水平方向に中央 */
    align-items: center;
    /* 垂直方向に中央 */
    background-color: rgba(255, 255, 255, 0.7);
    /* 半透明の背景 */
    z-index: 1000;
    /* 他のコンテンツより前面に表示 */
}

.loading-icon::after {
    content: '.';
    animation: dot-blinking 1.5s steps(3, end) infinite;
    font-size: 2rem;
    /* 大きな文字に */
}

@keyframes dot-blinking {
    0% {
        content: '.';
    }

    33% {
        content: '..';
    }

    66% {
        content: '...';
    }

    100% {
        content: '.';
    }
}

/* ロゴとボタンの高さを揃える */
.logo-container {
    display: flex;
    align-items: center;
    /* ロゴを上下中央揃え */
}

/* ロゴ画像の中央配置 */
.logo {
    display: block;
    height: auto;
    /* 縦横比を維持 */
    max-height: 10vh;
    /* 画面の10%の高さ */
}

/* モーダルの最大幅設定 */
.modal-card {
    max-width: 800px;
    width: 90%;
}

/* モーダルのコンテンツ中央配置 */
.modal-card-body {
    overflow-y: auto;
    max-height: 60vh;
    min-height: 25vh;
}

.modal-card-foot {
    max-height: 10vh;
}
</style>
