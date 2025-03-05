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
            wordsData: {},
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
    // "バックエンドからwords_mstデータとgroups_mstデータをAPI取得"
    //
    // wordsData : カテゴリーと関連するワードのリスト
    // 例 : "クラウド": ["クラウド", "コロケーション", "ホスティング"]...
    //
    ////////////////////////////////////////////////////////////////////////////////////////////////////   
        async fetchData() {
            try {
                // バックエンドAPIからデータを取得
                const wordsResponse = await axios.get('http://localhost:3000/notion-words');
                const groupsResponse = await axios.get('http://localhost:3000/notion-groups');

                const wordsData = this.formatWordsData(wordsResponse.data, groupsResponse.data);
                console.log()
                this.wordsData = wordsData;
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
        formatWordsData(words, groups) {
            // （1） グループデータを { "groupId": "グループ名" } の形式に変換
            const groupData = {};
            groups.forEach(group => {
                const groupId = group.properties.id.title[0]?.text.content; 
                const groupName = group.properties.group.rich_text[0]?.text.content || "未分類";
                groupData[groupId] = groupName;
            });
            console.log("groupData", groupData);

            // （2） ワードデータを一時的に { wordId, wordText, explanation, groupId } の形式で保持
            const wordData = {};
            words.forEach(word => {

                const wordId = word.properties.id.title[0]?.text.content; 
                const wordText = word.properties.word.rich_text[0]?.text.content || "不明なワード"
                const explanation = word.properties.explanation.rich_text[0]?.text.content || "説明なし"
                const groupId = word.properties.groupId.rich_text[0]?.text.content 
                wordData[wordId] = { wordText, explanation, groupId }
            });
            console.log("wordData", wordData);

            // （3） ワードデータを { "グループ名": ["ワード1", "ワード2"] } の形式に変換
            const formattedData = {};
            Object.values(wordData).forEach(({ wordText, groupId }) => {
                const category = groupData[groupId]; // IDからグループ名を取得
                if (!category) return;

                if (!formattedData[category]) {
                    formattedData[category] = [];
                }
                formattedData[category].push(wordText);
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
        <h1>クラウドプラクティショナー</h1>

        <!-- カテゴリとワード一覧を表示 -->
        <CategoryList :wordsData="wordsData" @showWordDetailEvent="showWordDetail" />

        <!-- ワード詳細を表示 -->
        <WordDetail v-if="selectedWord" :word="selectedWord" @closeWordDetailEvent="closeWordDetail" />


        <router-link to="/">ホーム画面に戻る</router-link>
    </div>
</template>