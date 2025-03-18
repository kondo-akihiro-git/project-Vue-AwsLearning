<script>
export default {
    props: {
        listViewData: Object,
    },
    data() {
        return {
            openCategories: [],  // 現在展開されているカテゴリーの管理 (複数のカテゴリーを管理)
            favoriteWords: new Set(),  // お気に入りワードのセット
        };
    },
    created() {
        this.loadFavorites();
    },
    computed: {
        // お気に入りカテゴリのデータを作成
        favoriteCategory() {
            const favorites = Object.values(this.listViewData)
                .flat()
                .filter(word => this.favoriteWords.has(word.wordId));

            return favorites.length > 0 ? { "★ お気に入り": favorites } : {};
        },

        // 全カテゴリー（お気に入り + 通常のカテゴリ）
        combinedCategories() {
            return { ...this.favoriteCategory, ...this.listViewData };
        }
    },
    methods: {
        toggleCategory(categoryName) {
            if (this.openCategories.includes(categoryName)) {
                this.openCategories = this.openCategories.filter(cat => cat !== categoryName);
            } else {
                this.openCategories.push(categoryName);
            }
        },

        // お気に入りの保存・削除
        toggleFavorite(wordId) {
            if (this.favoriteWords.has(wordId)) {
                this.favoriteWords.delete(wordId);
            } else {
                this.favoriteWords.add(wordId);
            }
            this.saveFavorites();
        },

        // ローカルストレージにお気に入りを保存
        saveFavorites() {
            localStorage.setItem('favoriteWords', JSON.stringify([...this.favoriteWords]));
        },

        // ローカルストレージからお気に入りを読み込む
        loadFavorites() {
            const savedFavorites = JSON.parse(localStorage.getItem('favoriteWords')) || [];
            this.favoriteWords = new Set(savedFavorites);
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
    <div>
        <div v-for="(wordsData, categoryName) in combinedCategories" :key="categoryName">
            <!-- カテゴリ名をクリックで展開/折りたたみ -->
            <div class="box is-shadowless is-size-5 has-background-light mb-2 mt-2 p-2 has-text-weight-semibold" @click="toggleCategory(categoryName)">
                {{ categoryName }}
            </div>

            <!-- ワードリスト（開いているカテゴリーのみ表示）-->
            <div v-if="openCategories.includes(categoryName)">
                <div v-for="wordData in wordsData" :key="wordData.wordId" class="is-flex">
                    <div 
                        class="box is-size-6 m-1 p-2 has-background-white" 
                        @click="$emit('showWordDetailEvent', wordData)"
                        :class="getTypeClass(wordData.typeName)"
                        style="flex: 1;"  
                    >
                        {{ wordData.wordName }}
                    </div>
                    <!-- お気に入りボタン -->
                    <button class="box is-small has-background-white m-1 p-2" 
                        @click="toggleFavorite(wordData.wordId)"
                        :style="{ color: favoriteWords.has(wordData.wordId) ? '#ff9900' : '' }">
                        {{ favoriteWords.has(wordData.wordId) ? '★' : '☆' }}
                    </button>
                </div>
            </div>
        </div>
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