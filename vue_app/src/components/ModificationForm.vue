<script>
import { submitModification } from '@/utils/service';
import {
    validateModifiedWord,
    validateModifiedExplanation,
    validateSelectedWord,
    validateModifiedDefaultValues,
    defaultModifiedValues
} from '@/utils/validation';

export default {
    props: {
        listViewData: Object
    },
    data() {
        return {
            wordList: [], // 修正対象のワードリスト
            selectedWordId: null,
            fixedWord: defaultModifiedValues.word,
            fixedExplanation: defaultModifiedValues.explanation
        };
    },
    mounted() {
        this.loadWordList();
    },
    computed: {
        // ✅ ワード選択のエラー
        selectedWordError() {
            return validateSelectedWord(this.selectedWordId);
        },
        // ✅ 修正ワードのエラー
        fixedWordError() {
            return validateModifiedWord(this.fixedWord);
        },
        // ✅ 修正説明のエラー
        fixedExplanationError() {
            return validateModifiedExplanation(this.fixedExplanation);
        },
        // ✅ デフォルトバリデーションのエラー
        defaultError() {
            return validateModifiedDefaultValues(this.fixedWord, this.fixedExplanation);
        },
        // ✅ エラーがあればボタン非活性
        hasErrors() {
            return !!(
                this.selectedWordError ||
                this.fixedWordError ||
                this.fixedExplanationError ||
                this.defaultError
            );
        }
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
                // ✅ アルファベット順でソート
                .sort((a, b) => a.word.toLowerCase().localeCompare(b.word.toLowerCase()));
        },
        async submitModification() {
            if (this.hasErrors) return; // ✅ エラーがあれば送信しない

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

                <!-- ✅ デフォルトエラー表示 -->
                <div v-if="defaultError" class="notification is-light">{{ defaultError }}</div>

                <!-- 修正するワードを選択 -->
                <div class="field">
                    <label class="label">修正するワードを選択</label>
                    <div class="control">
                        <div class="select">
                            <select v-model="selectedWordId">
                                <option v-for="word in wordList" :key="word.id" :value="word.id">{{ word.word }}</option>
                            </select>
                        </div>
                        <p v-if="selectedWordError" class="help is-danger">{{ selectedWordError }}</p>
                    </div>
                </div>

                <!-- 修正するワード -->
                <div class="field">
                    <label class="label">修正後のワード</label>
                    <div class="control">
                        <input v-model="fixedWord" class="input" type="text" placeholder="修正後のワード" />
                    </div>
                    <p v-if="fixedWordError" class="help is-danger">{{ fixedWordError }}</p>
                </div>

                <!-- 修正後の説明 -->
                <div class="field">
                    <label class="label">修正後の説明</label>
                    <div class="control">
                        <textarea v-model="fixedExplanation" class="textarea" placeholder="修正後の説明"></textarea>
                    </div>
                    <p v-if="fixedExplanationError" class="help is-danger">{{ fixedExplanationError }}</p>
                </div>

                <!-- 送信ボタンと戻るボタン -->
                <div class="field is-grouped is-grouped-right">
                    <div class="control">
                        <button type="submit" class="button is-primary" :disabled="hasErrors">送信</button>
                    </div>
                    <div class="control">
                        <button type="button" class="button is-light" @click="$emit('closeModificationFormEvent')">戻る</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
