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
        <h3 class="title is-4 m-2 mb-4">関連度の高いワード</h3>
        <div v-if="relatedWords.length > 0" class="columns is-multiline is-mobile is-gapless">
            <div v-for="word in relatedWords" :key="word.wordId" class="column is-narrow">
                <button 
                    class="button mx-1 my-1" 
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
    border-color: #ff9900 !important;
}

.border-tech-method {
    border-color: #0073bb !important;
}

.border-tech-term {
    border-color: #333333 !important;
}

.border-aws-attitude {
    border-color: #2d7600 !important;
}

.border-aws-term {
    border-color: #ffe600 !important;
}

.border-default-type {
    border-color: #e0e0e0 !important;
}
</style>
