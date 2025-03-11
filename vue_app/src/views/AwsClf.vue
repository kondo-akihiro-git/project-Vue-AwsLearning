<script>
import { fetchData } from '@/utils/service';
import WordDetail from '@/components/WordDetail.vue';
import CategoryList from '@/components/CategoryList.vue';
import RequestForm from '@/components/RequestForm.vue';

export default {
    // コンポーネントを登録
    components: {
        WordDetail,
        CategoryList,
        RequestForm
    },
    // データ格納オブジェクト
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

        // ワード詳細を表示するメソッド
        showWordDetail(selectedWordData) {
            this.selectedWordData = selectedWordData;
            this.isRequestWordVisible = false;
        },

        // 詳細を閉じるメソッド
        closeWordDetail() {
            this.selectedWordData = null;
        },

        // 新規ワード追加画面を表示するメソッド
        showRequestForm() {
            this.isRequestWordVisible = true;
            this.selectedWordData = null;
        },

        // 新規ワード追加画面を閉じるメソッド
        closeRequestForm() {
            this.isRequestWordVisible = false;
        }
    }
};
</script>

<template>
    <!-- ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // カテゴリーとワードの一覧表示とワード詳細の表示
    //
    //////////////////////////////////////////////////////////////////////////////////////////////// -->
    <!-- ローディング状態の表示 -->
    <div v-if="isLoading" class="has-text-centered">
        <p>データを読み込み中...</p>
        <!-- スピナーなどを表示することも可能 -->
    </div>

    <div v-else class="container">
        <div class="is-flex is-align-items-center is-justify-content-space-between m-5">
            <div class="title is-size-2">
                <router-link to="/" class="has-text-black">
                    クラウドプラクティショナー
                </router-link>
            </div>
            <!-- 新規ワードの追加ボタン (RequestWord 表示時は非表示) -->
            <button v-if="!isRequestWordVisible" class="button is-primary" @click="showRequestForm">
                新規ワードの追加申請
            </button>
        </div>


        <div class="columns">
            <!-- カテゴリとワード一覧を表示 (デフォルト表示、ワード選択時はサイドバー化) -->
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

        <!-- 新規ワードの登録フォームを表示 -->
        <div v-if="isRequestWordVisible">
            <RequestForm @closeRequestFormEvent="closeRequestForm" />
        </div>
    </div>


</template>


<style scoped>
/* カテゴリーリストが長い場合にスクロールバーを表示する */
.category-list-container {
    max-height: 80vh;
    /* ビューポート高さの80%に設定 */
    overflow-y: auto;
    /* 縦にスクロールバーを表示 */
}
</style>