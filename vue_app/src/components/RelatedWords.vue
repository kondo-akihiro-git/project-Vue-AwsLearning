<script>
export default {
    props: {
        relatedWords: Array
    },
    methods: {
        selectWord(word) {
            this.$emit('showWordDetailEvent', word);
        }
    }
};
</script>

<template>
    <div class="box">
        <h3 class="title is-4 m-2 mb-4">関連度の高いワード</h3>
        <div v-if="relatedWords.length > 0" class="columns is-multiline is-mobile is-gapless">
            <div v-for="word in relatedWords" :key="word.wordId" class="column is-narrow">
                <button class="button is-info mx-1 my-1">
                    {{ word.wordName }}
                </button>
            </div>
        </div>
        <p class="m-2" v-else>関連ワードはありません</p>
    </div>
</template>