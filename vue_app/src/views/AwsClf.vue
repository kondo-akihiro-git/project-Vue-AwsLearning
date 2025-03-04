<script>
import WordDetail from '../components/WordDetail.vue';
import CategoryList from '../components/CategoryList.vue';

export default {
    // コンポーネントを登録
    components: {
        WordDetail,
        CategoryList
    },
    // データ格納オブジェクト
    data() {
        return {
            wordsData: {},
            selectedWord: null,
        };
    },

    // マウント時にデータ取得
    mounted() {
        this.fetchData();
    },
    methods: {
        // データ取得メソッド
        fetchData() {
            this.wordsData = {
                // テストデータ(カテゴリ : ワードの配列)
                "クラウド": ["クラウド", "コロケーション", "ホスティング"],
                "コンピューティング": ["Amazon EC2", "Amazon マシンイメージ", "インスタンスタイプ"],
                "ストレージ": ["ブロックストレージ", "ファイルストレージ", "オブジェクトストレージ"]
            };
        },

        // ワード詳細を表示するメソッド
        showWordDetail(word) {
            this.selectedWord = word;
        },

        // 詳細を閉じるメソッド
        closeWordDetail() {
            this.selectedWord = null;
        }
    }
};
</script>

<template>
    <!-- ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // クラウドプラクティショナー取得に関する学習カテゴリーとワードの表示
    //
    //////////////////////////////////////////////////////////////////////////////////////////////// -->
    <div>
        <h1>クラウドプラクティショナー</h1>

        <!-- カテゴリとワード一覧を表示 -->
        <CategoryList :wordsData="wordsData" @showWordDetailEvent="showWordDetail" />

        <!-- ワード詳細を表示 -->
        <WordDetail v-if="selectedWord" :word="selectedWord" @closeWordDetailEvent="closeWordDetail"/>


        <router-link to="/">ホーム画面に戻る</router-link>
    </div>
</template>