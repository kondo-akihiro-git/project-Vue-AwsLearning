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
            notionModificationsTable: process.env.VUE_APP_NOTION_MODIFICATION_TABLE_URL,
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
        <div class="header-container is-flex is-align-items-center is-justify-content-space-between m-2">
            <div class="logo-container">
                <router-link to="/" class="has-text-black">
                    <img src="@/assets/logo.png" alt="AWS Logo" class="logo" />
                </router-link>
            </div>
        </div>

        <!-- 管理画面表示部分 -->
        <div v-if="!showForm" class="box">
            <h2 class="title is-3">管理画面</h2>

            <div class="field is-grouped is-grouped-centered">
                <div class="control is-expanded">
                    <button @click="toggleForm" class="button is-medium is-fullwidth">
                        新しいお知らせの送信はこちら
                    </button>
                </div>
            </div>

            <div class="content box">
    <p class="is-size-5 mb-4">DBへのアクセスはこちら</p>
    
    <!-- 各ボタンと説明の間に余白を追加 -->
    <div class="columns is-vcentered">
        <div class="column is-narrow">
            <a :href="notionWordsTable" target="_blank" class="button is-medium">ワード一覧テーブル</a>
        </div>
        <div class="column">
            <p>こちらのテーブルでは登録されているワードの一覧を確認でき、新規ワードの追加申請がある場合に、そちらに手動で追加してください。</p>
        </div>
    </div>
    
    <div class="columns is-vcentered">
        <div class="column is-narrow">
            <a :href="notionRequestWordsTable" target="_blank" class="button is-medium">新規ワードの追加申請テーブル</a>
        </div>
        <div class="column">
            <p>こちらのテーブルではユーザーが申請した新規ワードの一覧を確認できます。</p>
        </div>
    </div>

    <div class="columns is-vcentered">
        <div class="column is-narrow">
            <a :href="notionAnnouncementsTable" target="_blank" class="button is-medium">お知らせテーブル</a>
        </div>
        <div class="column">
            <p>こちらのテーブルでは管理画面から送信したお知らせを登録しており、過去のお知らせ一覧を確認できます。</p>
        </div>
    </div>

    <div class="columns is-vcentered">
        <div class="column is-narrow">
            <a :href="notionModificationsTable" target="_blank" class="button is-medium">修正依頼テーブル</a>
        </div>
        <div class="column">
            <p>こちらのテーブルでは既存のワードや説明についての修正依頼の一覧を確認できます。</p>
        </div>
    </div>
    
</div>

        </div>

        <!-- フォーム表示部分 -->
        <div v-if="showForm">
            <AnnouncementForm @formSubmitted="showForm = false" @closeForm="showForm = false" />
        </div>
    </div>
</template>

<style scoped>
/* 管理画面ボタンの横幅を最大にする */
.button.is-fullwidth {
    width: 100%;
}

.logo-container {
    display: flex;
    align-items: center; /* ロゴを上下中央揃え */
}

/* ロゴ画像の中央配置 */
.logo {
    display: block;
    height: auto; /* 縦横比を維持 */
    max-height: 10vh; /* 画面の10%の高さ */
}
</style>
