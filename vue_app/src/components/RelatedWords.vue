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
    <div class="related-words-container">
        <h3 class="title is-4">関連ワード</h3>
        <div v-if="relatedWords.length > 0">
            <ul>
                <li v-for="word in relatedWords" :key="word.wordId">
                    <button class="button is-small is-info" @click="selectWord(word)">
                        {{ word.wordName }}
                    </button>
                </li>
            </ul>
        </div>
        <p v-else>関連ワードはありません</p>
    </div>
</template>

<style scoped>
.related-words-container {
    margin-top: 20px;
    padding: 15px;
    background-color: #f5f5f5;
    border-radius: 5px;
}
ul {
    list-style: none;
    padding: 0;
}
li {
    margin-bottom: 5px;
}
</style>
