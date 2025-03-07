<script>
export default {
    props: {
        listViewData: Object,
    },
    data() {
        return {
            openCategories: [],  // 現在展開されているカテゴリーの管理 (複数のカテゴリーを管理)
        };
    },
    methods: {
        toggleCategory(categoryName) {
            // カテゴリがすでに開かれている場合、配列から削除する（折りたたむ）
            if (this.openCategories.includes(categoryName)) {
                this.openCategories = this.openCategories.filter(cat => cat !== categoryName);
            } else {
                // 開いていなければ配列に追加する（展開する）
                this.openCategories.push(categoryName);
            }
        }
    }
};
</script>

<template>
    <!-- ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // カテゴリーとワードのデータ一覧表示（アコーディオン）
    //
    //////////////////////////////////////////////////////////////////////////////////////////////// -->
    <div>
        <div v-for="(wordsData, categoryName) in listViewData" :key="categoryName">
            <!-- カテゴリ名をクリックで展開/折りたたみ -->
            <div class="is-size-3" @click="toggleCategory(categoryName)">
                {{ categoryName }}
            </div>

            <!-- ワードリスト（開いているカテゴリーのみ表示）-->
            <div v-if="openCategories.includes(categoryName)">
                <div v-for="wordData in wordsData" :key="wordData.wordName" @click="$emit('showWordDetailEvent', wordData)">
                    <div class="is-size-5">{{ wordData.wordName }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
