<script>
export default {
    props: {
        relatedWords: Array
    },
    methods: {
        selectWord(word) {
            this.$emit('showWordDetailEvent', word);
        },
        getTypeClass(typeName) {
            switch (typeName) {
                case "service":
                    return "border-aws-service";
                case "method":
                    return "border-tech-method";
                case "technical term":
                    return "border-tech-term";
                case "attitude":
                    return "border-aws-attitude";
                case "aws term":
                    return "border-aws-term";
                default:
                    return "border-default-type";
            }
        }
    }
};
</script>

<template>
    <div class="box">
        <h3 class="title is-5 m-2 mb-4">関連度の高いワード</h3>
        <div v-if="relatedWords.length > 0" class="columns is-multiline is-mobile is-gapless">
            <div v-for="word in relatedWords" :key="word.wordId" class="column is-narrow">
                <button 
                    class="button mx-1 my-1 is-light" 
                    :class="getTypeClass(word.typeName)" 
                    @click="selectWord(word)">
                    {{ word.wordName }}
                </button>
            </div>
        </div>
        <p class="m-2" v-else>関連ワードはありません</p>
    </div>
</template>

<style scoped>
/* Typeに応じたボーダー色の設定 */
.border-aws-service {
    background-color: rgba(255, 153, 0, 0.2) !important;
}

.border-tech-method {
    background-color: rgba(0, 115, 187, 0.2) !important;
}

.border-tech-term {
    background-color: rgba(51, 51, 51, 0.2) !important;
}

.border-aws-attitude {
    background-color: rgba(45, 118, 0, 0.2) !important;
}

.border-aws-term {
    background-color: rgba(255, 230, 0, 0.2) !important;
}

.border-default-type {
    background-color: rgba(224, 224, 224, 0.2) !important;
}

</style>
