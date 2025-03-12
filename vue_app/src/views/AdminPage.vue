<script>
import AnnouncementForm from '@/components/AnnouncementForm.vue';

export default {
    // コンポーネントを登録
    components: {
        AnnouncementForm,
    },
    data() {
        return {
            showForm: false
        };
    },
    methods: {
        // 周知フォームの表示切り替え
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

            <!-- 周知フォームの表示の切り替えボタン -->
            <div class="field is-grouped is-grouped-centered">
                <div class="control">
                    <button @click="toggleForm" class="button is-primary is-medium">
                        お知らせの登録
                    </button>
                </div>
            </div>

            <!-- 周知フォーム表示 -->
            <div v-if="showForm">
                <AnnouncementForm @formSubmitted="showForm = false" @closeForm="showForm = false" />
            </div>
        </section>
    </div>
</template>
