<script>
export default {
    props: {
        listViewData: Object,
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
        <div v-for="(wordsData, categoryName) in listViewData" :key="categoryName">
            <div class="is-size-3">{{ categoryName }}</div>
            
            <div v-for="wordData in wordsData" :key="wordData" @click="$emit('showWordDetailEvent', wordData)">
                <div class="is-size-5">{{ wordData.wordName }}</div>
            </div>
            
        </div>
    </div>
</template>