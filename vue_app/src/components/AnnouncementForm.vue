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
        <h2 class="title is-3">お知らせの送信</h2>
        <form @submit.prevent="submit">
            <div class="field">
                <label class="label">お知らせタイトル</label>
                <div class="control">
                    <input v-model="title" class="input is-medium" type="text" placeholder="タイトルを入力" required />
                </div>
            </div>
            
            <div class="field">
                <label class="label">お知らせ内容</label>
                <div class="control">
                    <textarea v-model="content" class="textarea is-medium" placeholder="内容を入力" required></textarea>
                </div>
            </div>

            <!-- ボタンを横並び、両端寄せに変更 -->
            <div class="field is-grouped is-grouped-right is-flex is-justify-content-space-between">
                <div class="control">
                    <button type="submit" class="button is-medium">送信</button>
                </div>
                <div class="control">
                    <button @click="$emit('closeForm')" class="button is-light is-medium">管理画面に戻る</button>
                </div>
            </div>
        </form>
    </div>
</template>
