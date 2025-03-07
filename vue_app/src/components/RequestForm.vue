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
    <div>
        <div>新しいワードの追加申請をリクエスト</div>
        <form @submit.prevent="submit">
            <div>
                <span v-if="defaultError" style="color: red;">{{ defaultError }}</span>
            </div>
            <div>
                <label>ワード名:</label>
                <input v-model="word" type="text" required />
                <span v-if="wordError" style="color: red;">{{ wordError }}</span>
            </div>
            <div>
                <label>説明:</label>
                <textarea v-model="explanation" required></textarea>
                <span v-if="explanationError" style="color: red;">{{ explanationError }}</span>
            </div>
            <div>
                <label>ユーザーID:</label>
                <input v-model="userId" type="text" required />
                <span v-if="userIdError" style="color: red;">{{ userIdError }}</span>
            </div>
            <button type="submit" :disabled="hasErrors">追加</button>
        </form>
    </div>
    <div>
        <a href="#" @click="$emit('closeRequestFormEvent')">元に戻す</a>
    </div>
</template>
