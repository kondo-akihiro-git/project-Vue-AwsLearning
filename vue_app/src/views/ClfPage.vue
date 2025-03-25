<script>
import { fetchData } from '@/utils/service';
import WordDetail from '@/components/WordDetail.vue';
import CategoryList from '@/components/CategoryList.vue';
import RequestForm from '@/components/RequestForm.vue';
import RelatedWords from '@/components/RelatedWords.vue';
import ModificationForm from '@/components/ModificationForm.vue';
import LogoHeader from '@/components/LogoHeader.vue';

export default {
    components: {
        WordDetail,
        CategoryList,
        RequestForm,
        RelatedWords,
        ModificationForm,
        LogoHeader
    },
    data() {
        return {
            listViewData: {},
            selectedWordData: null,
            relatedWords: [],
            isRequestWordVisible: false,
            isModificationFormVisible: false,
            isLoading: true,
            isMobile: false
        };
    },

    // マウント時にデータ取得
    mounted() {
        this.loadData();
        this.checkMobile();
        window.addEventListener('resize', this.checkMobile);
    },
    methods: {
        checkMobile() {
            this.isMobile = window.innerWidth <= 768;
        },
        async loadData() {
            this.isLoading = true;
            this.listViewData = await fetchData();
            this.isLoading = false;
        },

        // コンポーネントの表示切り替え
        showWordDetail(selectedWordData) {
            this.selectedWordData = selectedWordData;
            this.isRequestWordVisible = false;
            this.isModificationFormVisible = false;
            this.updateRelatedWords(selectedWordData);
        },

        closeWordDetail() {
            this.selectedWordData = null;
        },
        updateRelatedWords(word) {
            if (!word || !word.relatedIds || word.relatedIds.length === 0) {
                this.relatedWords = [];
                return;
            }

            let allWords = Object.values(this.listViewData).flat();
            this.relatedWords = allWords.filter(w => word.relatedIds.includes(w.wordId));
        },

        showRequestForm() {
            this.isRequestWordVisible = true;
            this.isModificationFormVisible = false;
            this.selectedWordData = null;
        },

        closeRequestForm() {
            this.isRequestWordVisible = false;
        },

        // 修正依頼フォームを表示
        showModificationForm() {
            this.isModificationFormVisible = true;
            this.isRequestWordVisible = false;
            this.selectedWordData = null;
        },

        closeModificationForm() {
            this.isModificationFormVisible = false;
        }
    },
    beforeUnmount() {
        window.removeEventListener('resize', this.checkMobile);
    }
};
</script>

<template>
    <!-- ローディング状態の表示 -->
    <div v-if="isLoading" class="loading-overlay">
        <p class="loading-icon">データ読み込み中</p>
    </div>

    <div v-else class="container">
        <div class="header-container is-flex is-align-items-center is-justify-content-space-between m-2">
            <LogoHeader />
            <div class="buttons-container is-flex is-justify-content-flex-end is-flex-wrap-wrap">
                <button v-if="!isModificationFormVisible && !isRequestWordVisible" class="button mb-2 mx-1"
                    @click="showModificationForm">
                    既存ワードの修正依頼
                </button>

                <button v-if="!isRequestWordVisible && !isModificationFormVisible" class="button mb-2 mx-1"
                    @click="showRequestForm">
                    新規ワードの追加申請
                </button>
            </div>

        </div>

        <div class="columns">
            <!-- カテゴリとワード一覧を表示-->
            <div :class="{
                'column is-one-third': selectedWordData && !isMobile,
                'column is-hidden-mobile': selectedWordData && isMobile,
                'column': !selectedWordData
            }">
                <div class="category-list-container">
                    <CategoryList :listViewData="listViewData" @showWordDetailEvent="showWordDetail"
                        v-if="!isRequestWordVisible && !isModificationFormVisible" />
                </div>
            </div>


            <!-- ワード詳細を表示 -->
            <div class="column is-two-thirds ml-3 mr-3"
                v-if="selectedWordData && !isRequestWordVisible && !isModificationFormVisible">
                <WordDetail :selectedWordData="selectedWordData" @closeWordDetailEvent="closeWordDetail" />
                <RelatedWords :relatedWords="relatedWords" @showWordDetailEvent="showWordDetail" />
            </div>
        </div>

        <!-- 新規ワードの追加申請フォームを表示 -->
        <div v-if="isRequestWordVisible && !selectedWordData && !isModificationFormVisible">
            <RequestForm @closeRequestFormEvent="closeRequestForm" />
        </div>

        <div v-if="isModificationFormVisible && !selectedWordData && !isRequestWordVisible">
            <ModificationForm :listViewData="listViewData" @closeModificationFormEvent="closeModificationForm" />
        </div>
    </div>


</template>


<style scoped>
.category-list-container {
    max-height: 80vh;
    /* ビューポート高さの80%に設定 */
    overflow-y: auto;
    /* 縦にスクロールバーを表示 */
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

/* ヘッダーの高さ */
.header-container {
    min-height: 12vh;
    /* 画面の15%の高さ */
}


</style>