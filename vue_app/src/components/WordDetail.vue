<script>
export default {
    props: {
        selectedWordData: Object
    }
};
</script>
<template>
    <!-- ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // ワードの詳細情報の表示
    //
    //////////////////////////////////////////////////////////////////////////////////////////////// -->
    <div class="has-background-success-light">
        <div class="is-size-2">{{ selectedWordData.wordName }} とは？</div>
        <div class="is-size-3">{{ selectedWordData.explanation }} </div>
        <div class="is-size-7"><strong>タイプ:</strong> {{ selectedWordData.typeName }}</div>
    </div>
    <div>
        <a href="#" @click="$emit('closeWordDetailEvent')">折りたたむ</a>
    </div>
</template>
