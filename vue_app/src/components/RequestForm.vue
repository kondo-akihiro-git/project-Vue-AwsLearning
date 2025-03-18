<script>
import { submitRequest } from '@/utils/service';
import { validateWord, validateExplanation, validateUserId, validateDefaultValues, defaultValues } from '@/utils/validation';

export default {
    data() {
        return {
            word: defaultValues.word,
            explanation: defaultValues.explanation,
            userId: defaultValues.userId
        };
    },
    // バリデーション
    computed: {
        defaultError() {
            return validateDefaultValues(this.word, this.explanation, this.userId);
        },
        wordError() {
            return validateWord(this.word);
        },
        explanationError() {
            return validateExplanation(this.explanation);
        },
        userIdError() {
            return validateUserId(this.userId);
        },
        hasErrors() {
            return !!(this.wordError || this.explanationError || this.userIdError || this.defaultError);
        }
    },
    methods: {
        async submit() {
            try {
                await submitRequest(this.word, this.explanation, this.userId);
                this.word = '';
                this.explanation = '';
                this.userId = '';
            } catch (error) {
                console.error('新規ワードのリクエストに失敗しました', error);
            }
        }
    }
};
</script>

<template>
    <div class="container">
        <div class="box">
            <form @submit.prevent="submit">
                <h2 class="title is-4">新しいワードの追加申請</h2>
                <div v-if="defaultError" class="notification is-light">{{ defaultError }}</div>
                <div class="field">
                    <label class="label">ワード名</label>
                    <div class="control">
                        <input v-model="word" class="input" type="text" required />
                    </div>
                    <p v-if="wordError" class="help is-danger">{{ wordError }}</p>
                </div>
                <div class="field">
                    <label class="label">説明</label>
                    <div class="control">
                        <textarea v-model="explanation" class="textarea" rows="3" required></textarea>
                    </div>
                    <p v-if="explanationError" class="help is-danger">{{ explanationError }}</p>
                </div>
                <div class="field">
                    <label class="label">ユーザーID</label>
                    <div class="control">
                        <input v-model="userId" class="input" type="text" required />
                    </div>
                    <p v-if="userIdError" class="help is-danger">{{ userIdError }}</p>
                </div>

                <!-- 送信ボタンと元に戻すボタンを横並びにする -->
                <div class="field is-grouped is-grouped-right">
                    <div class="control">
                        <button type="submit" class="button is-primary" :disabled="hasErrors">追加</button>
                    </div>
                    <div class="control">
                        <button type="button" class="button is-light" @click="$emit('closeRequestFormEvent')">戻る</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
