<script>
import { submitAnnouncement } from '@/utils/service';

export default {
    data() {
        return {
            announceId: '',
            title: '',
            content: ''
        };
    },
    methods: {
        async submit() {
            if (!this.title || !this.title || !this.content) {
                alert('タイトルと内容を入力してください');
                return;
            }

            try {
                await submitAnnouncement(this.announceId, this.title, this.content);
                this.announceId = '',
                this.title = '';
                this.content = '';
            } catch (error) {
                console.error('お知らせの登録に失敗しました', error);
            }
        }
    }
};
</script>

<template>
    <div class="container">
        <h2 class="title">お知らせの登録</h2>
        <form @submit.prevent="submit" class="box">
            <div class="field">
                <label class="label">ID</label>
                <div class="control">
                    <input v-model="announceId" class="input" type="text" required />
                </div>
            </div>
            <div class="field">
                <label class="label">タイトル</label>
                <div class="control">
                    <input v-model="title" class="input" type="text" required />
                </div>
            </div>
            <div class="field">
                <label class="label">内容</label>
                <div class="control">
                    <textarea v-model="content" class="textarea" required></textarea>
                </div>
            </div>
            <div class="control">
                <button type="submit" class="button is-primary">登録</button>
            </div>
        </form>
    </div>
</template>
