<template>
    <div>
        <h1>クラウドプラクティショナー</h1>


        <!-- 各カテゴリをループ -->
        <div v-for="(words, category) in data" :key="category">

            <!-- 各カテゴリの名前を表示 -->
            <h2>{{ category }}</h2>

            <!-- カテゴリ内のアイテムをリスト表示 -->
            <ul>
                <li v-for="word in words" :key="word">{{ word }}</li>
            </ul>
        </div>


        <router-link to="/">ホーム画面に戻る</router-link>
    </div>
</template>

<script>
export default {
    // データ格納オブジェクト
    data() {
        return {
            data: {}
        };
    },

    // マウント時にデータ取得
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            this.data = {
                // テストデータ(カテゴリ : アイテムの配列)
                "クラウド": ["クラウド", "コロケーション", "ホスティング"],
                "コンピューティング": ["Amazon EC2", "Amazon マシンイメージ", "インスタンスタイプ"],
                "ストレージ": ["ブロックストレージ", "ファイルストレージ", "オブジェクトストレージ"]
            };
        }
    }
};
</script>