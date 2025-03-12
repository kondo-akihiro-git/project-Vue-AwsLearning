<script>
export default {
    props: {
        selectedWordData: Object
    },
    computed: {
        typeClass() {
            switch (this.selectedWordData.typeName) {
                case "service":
                    return "aws-service";
                case "method":
                    return "tech-method";
                case "technical term":
                    return "tech-term";
                case "attitude":
                    return "aws-attitude";
                default:
                    return "default-type";
            }
        },
        typeLabel() {
            if (this.selectedWordData.typeName === "service") {
                return "AWSサービス";
            } else if (this.selectedWordData.typeName === "technical term") {
                return "技術用語";
            }
            return null;
        }
    }    
};
</script>
<template>
    <div :class="['box', typeClass]">
        <p v-if="typeLabel" class="tag is-medium type-label">{{ typeLabel }}</p>

        <div class="card">
            
            <div class="card-content">
                <div class="content">
                    <h2 class="title is-3">{{ selectedWordData.wordName }} とは？</h2>
                    <p class="subtitle is-4">{{ selectedWordData.explanation }}</p>
                </div>
            </div>
        </div>
        <div class="has-text-right">
            <button class="button is-light is-small" @click="$emit('closeWordDetailEvent')">折りたたむ</button>
        </div>
    </div>
</template>

<style scoped>
.aws-service {
    background-color: #ff9900 !important; /* AWSオレンジ */
    color: white;
}

.tech-method {
    background-color: #0073bb !important; /* 青系 (技術連携をイメージ) */
    color: white;
}

.tech-term {
    background-color: #333333 !important; /* ダークグレー (技術的な用語をイメージ) */
    color: white;
}

.aws-attitude {
    background-color: #2d7600 !important; /* 深緑 (AWSの考え方や姿勢を意識) */
    color: white;
}

.default-type {
    background-color: #e0e0e0; /* デフォルトのグレー */
    color: black;
}

</style>