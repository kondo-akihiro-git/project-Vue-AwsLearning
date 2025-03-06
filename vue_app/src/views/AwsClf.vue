<script>
import axios from 'axios';
import WordDetail from '../components/WordDetail.vue';
import CategoryList from '../components/CategoryList.vue';
import RequestWord from '@/components/RequestWord.vue';

export default {
    // コンポーネントを登録
    components: {
        WordDetail,
        CategoryList,
        RequestWord
    },
    // データ格納オブジェクト
    data() {
        return {
            listViewData: {},
            selectedWordData: null,
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
    ////////////////////////////////////////////////////////////////////////////////////////////////////   
        async fetchData() {
            try {
                // バックエンドAPIからデータを取得
                const wordResponse = await axios.get('http://localhost:3000/notion-word');
                const categoryResponse = await axios.get('http://localhost:3000/notion-category');

                const listViewData = this.formatData(wordResponse.data, categoryResponse.data);

                this.listViewData = listViewData;
            } catch (error) {
                console.error("データの取得に失敗しました", error);
            }
        },
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //
    // "APIレスポンスのデータ整形"
    //
    // wordsData, categoriesData : Notionから取得したAPIレスポンス
    // formattedData : カテゴリーと関連するワードのリストがまとまったデータ
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////   
        formatData(wordsData, categoriesData) {

            // カテゴリーデータを { カテゴリーID: カテゴリー名 } の形式にする
            const formattedCategoryData = {};
            categoriesData.forEach(categoryData => {

                const categoryId = categoryData.properties.id.title[0]?.text.content; 
                const categoryName = categoryData.properties.category.rich_text[0]?.text.content || "未分類";
                formattedCategoryData[categoryId] = categoryName;
            });
            console.log("categoryData", formattedCategoryData);

            // ワードデータを { カテゴリー名: [{ ワード名, ワード説明 }, { }...] } の形式にする
            const formattedData = {};
            wordsData.forEach(wordData => {

                const wordName = wordData.properties.word.rich_text[0]?.text.content || "不明なワード"
                const explanation = wordData.properties.explanation.rich_text[0]?.text.content || "説明なし"
                const categoryId = wordData.properties.categoryId.rich_text[0]?.text.content 
                const categoryNam = formattedCategoryData[categoryId]; 

                if (!formattedData[categoryNam]) {
                    formattedData[categoryNam] = [];
                }
                formattedData[categoryNam].push({ wordName, explanation });
            });

            console.log("formattedData", formattedData);
            return formattedData;
        },

    ////////////////////////////////////////////////////////////////////////////////////////////////////


        // ワード詳細を表示するメソッド
        showWordDetail(selectedWordData) {
            this.selectedWordData = selectedWordData;
        },

        // 詳細を閉じるメソッド
        closeWordDetail() {
            this.selectedWordData = null;
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
    <div>
        <div class="is-size-2">クラウドプラクティショナー</div>
        <br>
        <!-- カテゴリとワード一覧を表示 -->
        <CategoryList :listViewData="listViewData" @showWordDetailEvent="showWordDetail" />
        <br>
        <!-- ワード詳細を表示 -->
        <WordDetail v-if="selectedWordData" :selectedWordData="selectedWordData" @closeWordDetailEvent="closeWordDetail" />
        <br>
        <RequestWord/>
        <br>
        <router-link to="/">ホーム画面に戻る</router-link>
    </div>
</template>