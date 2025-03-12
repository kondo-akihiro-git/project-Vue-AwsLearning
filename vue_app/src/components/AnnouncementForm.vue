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
        <h2 class="title is-3">周知事項の登録</h2>
        <form @submit.prevent="submit">
            <div class="field">
                <label class="label">周知タイトル</label>
                <div class="control">
                    <input v-model="title" class="input is-medium" type="text" placeholder="タイトルを入力" required />
                </div>
            </div>
            
            <div class="field">
                <label class="label">周知内容</label>
                <div class="control">
                    <textarea v-model="content" class="textarea is-medium" placeholder="内容を入力" required></textarea>
                </div>
            </div>

            <div class="field is-grouped is-grouped-centered">
                <div class="control">
                    <button type="submit" class="button is-primary is-medium">登録</button>
                </div>
            </div>
        </form>

        <div class="field is-grouped is-grouped-centered">
            <div class="control">
                <button @click="$emit('closeForm')" class="button is-light is-medium">戻る</button>
            </div>
        </div>
    </div>
</template>
