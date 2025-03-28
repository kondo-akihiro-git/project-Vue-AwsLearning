<script>
export default {
    props: {
        listViewData: Object,
    },
    data() {
        return {
            openCategories: [],  
            favoriteWords: new Set(),  
        };
    },
    created() {
        this.loadFavorites();
    },
    computed: {
        favoriteCategory() {
            const favorites = Object.values(this.listViewData)
                .flat()
                .filter(word => this.favoriteWords.has(this.createFavoriteKey(word.categoryName, word.wordName)));

            return favorites.length > 0 ? { "★ お気に入り": favorites } : {};
        },


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

        toggleFavorite(wordData) {
            const favoriteKey = this.createFavoriteKey(wordData.categoryName, wordData.wordName);

            if (this.favoriteWords.has(favoriteKey)) {
                this.favoriteWords.delete(favoriteKey);
            } else {
                this.favoriteWords.add(favoriteKey);
            }
            this.saveFavorites();
        },

        createFavoriteKey(categoryName, wordName) {
            return JSON.stringify({ categoryName, wordName });
        },


        saveFavorites() {
            localStorage.setItem('favoriteWords', JSON.stringify([...this.favoriteWords]));
        },


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
            <div class="box is-shadowless is-size-5 has-background-light mb-2 mt-2 p-2 has-text-weight-semibold" @click="toggleCategory(categoryName)">
                {{ categoryName }}
            </div>

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
                    
                    <button class="box is-small has-background-white m-1 p-2" 
                        @click="toggleFavorite(wordData)"
                        :style="{ color: favoriteWords.has(createFavoriteKey(wordData.categoryName, wordData.wordName)) ? '#ff9900' : '' }">
                        {{ favoriteWords.has(createFavoriteKey(wordData.categoryName, wordData.wordName)) ? '★' : '☆' }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Type-specific border color styles */
.border-aws-service {
    background-color: rgba(255, 153, 0, 0.2) !important;
}

.border-tech-method {
    background-color: rgba(255, 230, 0, 0.2) !important;
}

.border-tech-term {
    background-color: rgba(242, 242, 242, 0.347) !important;
}

.border-aws-attitude {
    background-color: rgba(255, 230, 0, 0.2) !important;
}

.border-aws-term {
    background-color: rgba(255, 230, 0, 0.2) !important;
}

.border-default-type {
    background-color: rgba(224, 224, 224, 0.905) !important;
}
</style>
