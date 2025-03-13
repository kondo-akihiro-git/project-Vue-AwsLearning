<script>
import AnnouncementForm from '@/components/AnnouncementForm.vue';

export default {
    components: {
        AnnouncementForm,
    },
    data() {
        return {
            showForm: false,
            notionWordsTable: process.env.VUE_APP_NOTION_WORD_TABLE_URL,
            notionRequestWordsTable: process.env.VUE_APP_NOTION_REQUEST_TABLE_URL,
            notionAnnouncementsTable: process.env.VUE_APP_NOTION_ANNOUNCEMENT_TABLE_URL,
        };
    },
    methods: {
        toggleForm() {
            this.showForm = !this.showForm;
        }
    }
};
</script>

<template>
    <div class="container">
        <section class="section">
            <h2 class="title is-3">管理画面</h2>

            <div class="field is-grouped is-grouped-centered">
                <div class="control">
                    <button @click="toggleForm" class="button is-primary is-medium">
                        お知らせの登録
                    </button>
                </div>
            </div>

            <div class="content">
                <p><a :href="notionWordsTable" target="_blank" class="button is-link">ワード一覧テーブル</a></p>
                <p><a :href="notionRequestWordsTable" target="_blank" class="button is-link">新規ワードの追加申請テーブル</a></p>
                <p><a :href="notionAnnouncementsTable" target="_blank" class="button is-link">お知らせテーブル</a></p>
            </div>

            <div v-if="showForm">
                <AnnouncementForm @formSubmitted="showForm = false" @closeForm="showForm = false" />
            </div>
        </section>
    </div>
</template>
