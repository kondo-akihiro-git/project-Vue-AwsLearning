<script>
import { fetchData } from '@/utils/service';
import WordDetail from '@/components/WordDetail.vue';
import CategoryList from '@/components/CategoryList.vue';
import RequestForm from '@/components/RequestForm.vue';

export default {
    components: {
        WordDetail,
        CategoryList,
        RequestForm
    },
    data() {
        return {
            listViewData: {},
            selectedWordData: null,
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
        },

        closeWordDetail() {
            this.selectedWordData = null;
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
    <div v-if="isLoading" class="has-text-centered">
        <p>データを読み込み中...</p>
    </div>

    <div v-else class="container">
        <div class="is-flex is-align-items-center is-justify-content-space-between m-5">
            <div class="title is-size-2">
                <router-link to="/" class="has-text-black">
                    クラウドプラクティショナー
                </router-link>
            </div>
            <button v-if="!isRequestWordVisible" class="button is-primary" @click="showRequestForm">
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
    max-height: 80vh;/* ビューポート高さの80%に設定 */
    overflow-y: auto;/* 縦にスクロールバーを表示 */
}
</style>