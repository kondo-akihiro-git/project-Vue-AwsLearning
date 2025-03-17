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
                case "aws term":
                    return "aws-term";
                default:
                    return "default-type";
            }
        },
        typeLabel() {
            switch (this.selectedWordData.typeName) {
                case "service":
                    return "AWSサービス";
                case "method":
                    return "AWS特有の技術的手法";  
                case "technical term":
                    return "一般用語";
                case "attitude":
                    return "AWS特有の考え方"; 
                case "aws term":
                    return "AWS用語";
                default:
                    return null;
            }
        }
    }
};
</script>

<template>
    <div :class="['box', typeClass]">
        <div class="m-2 mb-4 is-flex is-justify-content-space-between">
            <p v-if="typeLabel" class="tag is-medium type-label">{{ typeLabel }}</p>

            <button class="button is-small" @click="$emit('closeWordDetailEvent')">閉じる</button>
        </div>


        <div class="card mb-2">
            <div class="card-content">
                <div class="content">
                    <div class="m-1">
                        <h2 class="title is-5">{{ selectedWordData.wordName }} とは？</h2>
                    </div>
                    <div class="m-1">
                        <p class="subtitle is-6">{{ selectedWordData.explanation }}</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<style scoped>
.aws-service {
    background-color: #ff9900 !important;
    /* AWSオレンジ */
    color: white;
}

.tech-method {
    background-color: #0073bb !important;
    /* 青系 (技術連携をイメージ) */
    color: white;
}

.tech-term {
    background-color: #333333 !important;
    /* ダークグレー (技術的な用語をイメージ) */
    color: white;
}

.aws-attitude {
    background-color: #2d7600 !important;
    /* 深緑 (AWSの考え方や姿勢を意識) */
    color: white;
}

.aws-term {
    background-color: #ffe600 !important;
    /*  (AWS用語) */
    color: white;
}

.default-type {
    background-color: #e0e0e0;
    /* デフォルトのグレー */
    color: black;
}

.button.is-light {
    background-color: #ffffff !important;
    /* ホワイト */
    color: #0073bb;
    /* AWSブルー */
}
</style>
