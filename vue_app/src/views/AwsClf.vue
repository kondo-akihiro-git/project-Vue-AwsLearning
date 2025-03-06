<script>
import axios from 'axios';
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
            categoryListData: {},
            selectedWord: null,
        };
    },

    // マウント時にデータ取得
    mounted() {
        this.fetchData();
    },
    methods: {
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // "バックエンドからword_mstデータとcategory_mstデータをAPI取得"
    //
    // categoryListData : カテゴリーと関連するワードのリスト
    // 例 : "クラウド": ["クラウド", "コロケーション", "ホスティング"]...
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////   
        async fetchData() {
            try {
                // バックエンドAPIからデータを取得
                const wordResponse = await axios.get('http://localhost:3000/notion-word');
                const categoryResponse = await axios.get('http://localhost:3000/notion-category');

                const categoryListData = this.formatData(wordResponse.data, categoryResponse.data);

                this.categoryListData = categoryListData;
            } catch (error) {
                console.error("データの取得に失敗しました", error);
            }
        },
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // "APIレスポンスのデータ整形"
    //
    // words, groups : Notionから取得したAPIレスポンス
    // 例 : "properties":{"explanation":{"id":"Wzsb","type":"rich_text","rich_text"...
    //
    // return wordsData : カテゴリーと関連するワードのリスト
    // 例 : "クラウド": ["クラウド", "コロケーション", "ホスティング"]...
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////   
        formatData(words, categories) {

            // （1） カテゴリーデータを { "カテゴリーID": "カテゴリー名" } の形式に変換
            const categoryData = {};
            categories.forEach(category => {

                const categoryId = category.properties.id.title[0]?.text.content; 
                const categoryName = category.properties.category.rich_text[0]?.text.content || "未分類";
                categoryData[categoryId] = categoryName;
            });
            console.log("categoryData", categoryData);

            // （2） ワードデータを { category: [{ wordText, explanation }] } の形式で保持
            const formattedData = {};
            words.forEach(word => {

                const wordText = word.properties.word.rich_text[0]?.text.content || "不明なワード"
                const explanation = word.properties.explanation.rich_text[0]?.text.content || "説明なし"
                const categoryId = word.properties.categoryId.rich_text[0]?.text.content 
                const category = categoryData[categoryId]; 

                if (!formattedData[category]) {
                    formattedData[category] = [];
                }
                formattedData[category].push({ wordText, explanation });
            });

            console.log("formattedData", formattedData);
            return formattedData;
        },

    ////////////////////////////////////////////////////////////////////////////////////////////////////


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
        <div class="is-size-2">クラウドプラクティショナー</div>

        <!-- カテゴリとワード一覧を表示 -->
        <CategoryList :categoryListData="categoryListData" @showWordDetailEvent="showWordDetail" />

        <!-- ワード詳細を表示 -->
        <WordDetail v-if="selectedWord" :word="selectedWord" @closeWordDetailEvent="closeWordDetail" />


        <router-link to="/">ホーム画面に戻る</router-link>
    </div>
</template>