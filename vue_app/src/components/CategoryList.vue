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
        }
    }
};
</script>
<template>
    <div>
        <div v-for="(wordsData, categoryName) in combinedCategories" :key="categoryName">
            <!-- カテゴリ名をクリックで展開/折りたたみ -->
            <div class="box is-shadowless is-size-5 has-background-light mb-2 mt-2 p-2" @click="toggleCategory(categoryName)">
                {{ categoryName }}
            </div>

            <!-- ワードリスト（開いているカテゴリーのみ表示）-->
            <div v-if="openCategories.includes(categoryName)">
                <div v-for="wordData in wordsData" :key="wordData.wordId" class="is-flex">
                    <div 
                        class="box is-size-6 m-1 p-2 has-background-white" 
                        @click="$emit('showWordDetailEvent', wordData)"
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
