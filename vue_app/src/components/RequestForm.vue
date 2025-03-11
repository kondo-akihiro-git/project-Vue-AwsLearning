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
    <!-- ///////////////////////////////////////////////////////////////////////////////////////////////
    //
    // 新しいワードの追加申請フォームの表示
    //
    //////////////////////////////////////////////////////////////////////////////////////////////// -->
    <div class="container">
        <section class="section">
            <h2 class="title">新しいワードの追加申請</h2>
            <form @submit.prevent="submit" class="box">
                <div v-if="defaultError" class="notification is-danger">{{ defaultError }}</div>
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
                        <textarea v-model="explanation" class="textarea" required></textarea>
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
                <div class="control">
                    <button type="submit" class="button is-primary" :disabled="hasErrors">追加</button>
                </div>
            </form>
            <button class="button is-light" @click="$emit('closeRequestFormEvent')">元に戻す</button>
        </section>
    </div>
</template>
