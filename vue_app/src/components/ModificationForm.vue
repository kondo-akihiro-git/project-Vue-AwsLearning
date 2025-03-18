<script>
import { submitModification } from '@/utils/service'; // サービス関数

export default {
    props: {
        listViewData: Object 
    },
    data() {
        return {
            wordList: [], // 修正対象のワードリスト
            selectedWordId: null,
            fixedWord: '',
            fixedExplanation: '',
        };
    },
    mounted() {
        this.loadWordList();
    },
    methods: {
        loadWordList() {
    // ✅ listViewData からワードデータを抽出
    const allWords = Object.values(this.listViewData).flat();
    this.wordList = allWords
        .map(word => ({
            word: word.wordName,
            id: word.wordId
        }))
        // ✅ アルファベット順（大文字・小文字を無視してソート）
        .sort((a, b) => a.word.toLowerCase().localeCompare(b.word.toLowerCase()));
},
        async submitModification() {
            if (!this.fixedWord || !this.fixedExplanation) {
                alert('修正内容を入力してください');
                return;
            }

            try {
                await submitModification(this.selectedWordId, this.fixedWord, this.fixedExplanation);
                alert('修正が完了しました');
                this.$emit('closeModificationFormEvent');
            } catch (error) {
                console.error('修正の送信に失敗しました', error);
            }
        }
    }
};
</script>

<template>
    <div class="container">
        <div class="box">
            <form @submit.prevent="submitModification">
                <h2 class="title is-4">既存ワードの修正依頼</h2>

                <!-- 修正するワードを選択 -->
                <div class="field">
                    <label class="label">修正するワードを選択</label>
                    <div class="control">
                        <div class="select">
                            <select v-model="selectedWordId">
                                <option v-for="word in wordList" :key="word.id" :value="word.id">{{ word.word }}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <!-- 修正する内容 -->
                <div class="field">
                    <label class="label">修正後のワード</label>
                    <div class="control">
                        <input v-model="fixedWord" class="input" type="text" placeholder="修正後のワード" required />
                    </div>
                </div>

                <div class="field">
                    <label class="label">修正後の説明</label>
                    <div class="control">
                        <textarea v-model="fixedExplanation" class="textarea" placeholder="修正後の説明" required></textarea>
                    </div>
                </div>

                <!-- 送信ボタンと戻るボタン -->
                <div class="field is-grouped is-grouped-right">
                    <div class="control">
                        <button type="submit" class="button is-primary">修正を送信</button>
                    </div>
                    <div class="control">
                        <button type="button" class="button is-light" @click="$emit('closeModificationFormEvent')">戻る</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
/* 必要なスタイルをここに追加 */
</style>
