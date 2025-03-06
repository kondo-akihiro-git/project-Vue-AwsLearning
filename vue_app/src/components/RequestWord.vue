<script>
import axios from 'axios';

export default {
    data() {
        return {
            word: '',
            explanation: '',
            userId: ''
        };
    },
    methods: {
        async submitWord() {
            try {
                await axios.post('http://localhost:3000/notion-request-word', {
                    word: this.word,
                    explanation: this.explanation,
                    userId: this.userId
                });
                alert('新規ワードのリクエストが送信されました');
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
    <div>
        <div>新しいワードを追加</div>
        <form @submit.prevent="submitWord">
            <div>
                <label>ワード名:</label>
                <input v-model="word" type="text" required />
            </div>
            <div>
                <label>説明:</label>
                <textarea v-model="explanation" required></textarea>
            </div>
            <div>
                <label>ユーザーID:</label>
                <input v-model="userId" type="text" required />
            </div>
            <button type="submit">追加</button>
        </form>
    </div>
</template>

