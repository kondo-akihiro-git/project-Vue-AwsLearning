<script>
import { submitAnnouncement } from '@/utils/service';

export default {
    data() {
        return {
            title: '',
            content: ''
        };
    },
    methods: {
        async submit() {
            if (!this.title || !this.content) {
                alert('タイトルと内容を入力してください');
                return;
            }

            try {
                await submitAnnouncement(this.title, this.content);
                this.title = '';
                this.content = '';
                this.$emit('formSubmitted');
            } catch (error) {
                console.error('お知らせの登録に失敗しました', error);
            }
        }
    }
};
</script>

<template>
    <div class="box">
        <h2 class="title is-3">お知らせの登録</h2>
        <form @submit.prevent="submit">
            <!-- Title Field -->
            <div class="field">
                <label class="label">タイトル</label>
                <div class="control">
                    <input v-model="title" class="input is-medium" type="text" placeholder="タイトルを入力" required />
                </div>
            </div>
            
            <!-- Content Field -->
            <div class="field">
                <label class="label">内容</label>
                <div class="control">
                    <textarea v-model="content" class="textarea is-medium" placeholder="内容を入力" required></textarea>
                </div>
            </div>

            <!-- Submit Button -->
            <div class="field is-grouped is-grouped-centered">
                <div class="control">
                    <button type="submit" class="button is-primary is-medium">登録</button>
                </div>
            </div>
        </form>

        <!-- Back Button -->
        <div class="field is-grouped is-grouped-centered">
            <div class="control">
                <button @click="$emit('closeForm')" class="button is-light is-medium">戻る</button>
            </div>
        </div>
    </div>
</template>
