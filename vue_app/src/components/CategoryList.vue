<script>
export default {
    props: {
        ////////////////////////////////////////////////////////////////////////////////////////////////////   
        //
        // wordsData : カテゴリーと関連するワードのリスト 
        // 例 : "クラウド": ["クラウド", "コロケーション", "ホスティング"]...
        //
        ////////////////////////////////////////////////////////////////////////////////////////////////////   
        categoryListData: Object,
    }
};
</script>
<template>
    <!-- ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // カテゴリーとワードのデータ一覧表示
    //
    //////////////////////////////////////////////////////////////////////////////////////////////// -->
    <div>
        <div v-for="(words, category) in categoryListData" :key="category">
            <div class="is-size-3">{{ category }}</div>
            
            <div v-for="word in words" :key="word" @click="$emit('showWordDetailEvent', word)">
                <div class="is-size-5">{{ word.wordText }}</div>
            </div>
            
        </div>
    </div>
</template>