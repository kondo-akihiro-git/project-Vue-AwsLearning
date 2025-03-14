<script>
import { fetchData } from '@/utils/service';
import WordDetail from '@/components/WordDetail.vue';
import CategoryList from '@/components/CategoryList.vue';
import RequestForm from '@/components/RequestForm.vue';
import RelatedWords from '@/components/RelatedWords.vue';

export default {
    components: {
        WordDetail,
        CategoryList,
        RequestForm,
        RelatedWords
    },
    data() {
        return {
            listViewData: {},
            selectedWordData: null,
            relatedWords: [],
            isRequestWordVisible: false,
            isLoading: true
        };
    },

    // マウント時にデータ取得
    mounted() {
        this.loadData();
    },
    methods: {
        async loadData() {
            this.isLoading = true;
            this.listViewData = await fetchData();
            this.isLoading = false;
        },

        // コンポーネントの表示切り替え
        showWordDetail(selectedWordData) {
            this.selectedWordData = selectedWordData;
            this.isRequestWordVisible = false;
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
            this.selectedWordData = null;
        },

        closeRequestForm() {
            this.isRequestWordVisible = false;
        }
    }
};
</script>

<template>
    <!-- ローディング状態の表示 -->
    <div v-if="isLoading" class="loading-overlay">
    <p class="loading-icon">データ読み込み中</p>
</div>

    <div v-else class="container">
        <div class="is-flex is-align-items-center is-justify-content-space-between m-5">
            <div class="title is-size-2">
                <router-link to="/" class="has-text-black">
                    クラウドプラクティショナー
                </router-link>
            </div>
            <button v-if="!isRequestWordVisible" class="button" @click="showRequestForm">
                新規ワードの追加申請
            </button>
        </div>

        <div class="columns">
            <!-- カテゴリとワード一覧を表示-->
            <div :class="{ 'column is-one-third': selectedWordData, 'column': !selectedWordData }">
                <div class="category-list-container">

                    <CategoryList :listViewData="listViewData" @showWordDetailEvent="showWordDetail"
                        v-if="!isRequestWordVisible" />
                </div>
            </div>

            <!-- ワード詳細を表示 -->
            <div class="column is-two-thirds" v-if="selectedWordData">
                <WordDetail :selectedWordData="selectedWordData" @closeWordDetailEvent="closeWordDetail" />
                <RelatedWords :relatedWords="relatedWords" @showWordDetailEvent="showWordDetail" />
            </div>
        </div>

        <!-- 新規ワードの追加申請フォームを表示 -->
        <div v-if="isRequestWordVisible">
            <RequestForm @closeRequestFormEvent="closeRequestForm" />
        </div>
    </div>


</template>


<style scoped>
.category-list-container {
    max-height: 75vh;/* ビューポート高さの80%に設定 */
    overflow-y: auto;/* 縦にスクロールバーを表示 */
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


</style>