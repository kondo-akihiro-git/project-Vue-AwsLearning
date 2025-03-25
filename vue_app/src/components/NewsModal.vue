<template>
    <div class="modal" :class="{ 'is-active': isActive }">
        <div class="modal-background" @click="closeModal"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">
                    {{ selectedAnnouncement ? selectedAnnouncement.titleName : '' }}
                </p>
                <button class="delete" aria-label="close" @click="closeModal"></button>
            </header>
            <section class="modal-card-body">
                <p v-if="selectedAnnouncement">
                    {{ selectedAnnouncement.content }}
                </p>
            </section>
            <footer class="modal-card-foot is-justify-content-flex-end">
                <button class="button is-light" @click="closeModal">閉じる</button>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isActive: {
            type: Boolean,
            required: true
        },
        selectedAnnouncement: {
            type: Object,
            required: true
        }
    },
    methods: {
        closeModal() {
            this.$emit('close');
        }
    }
};
</script>

<style scoped>
/* モーダルの最大幅設定 */
.modal-card {
    max-width: 800px;
    width: 90%;
}

/* モーダルのコンテンツ中央配置 */
.modal-card-body {
    overflow-y: auto;
    max-height: 60vh;
    min-height: 25vh;
}

.modal-card-foot {
    max-height: 10vh;
}
</style>
