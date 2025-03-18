<template>
    <div class="page-container is-flex is-align-items-center is-justify-content-center">
        <div class="container has-text-centered">
            <!-- ヘッダー -->
            <div class="header-container is-flex is-align-items-center is-justify-content-space-between p-2">
                <div class="logo-container">
                    <router-link to="/" class="has-text-black">
                        <img 
                            ref="logo" 
                            src="@/assets/logo.png" 
                            alt="AWS Logo" 
                            class="logo"
                        />
                    </router-link>
                </div>
            </div>

            <!-- ボタンリスト -->
            <div class="buttons is-flex is-justify-content-center mt-4">
                <router-link to="/clf" class="button is-responsive mx-2 is-large">
                    クラウドプラクティショナーの学習はこちら
                </router-link>
                <router-link to="/news" class="button is-responsive mx-2 is-large">
                    お知らせ
                </router-link>
            </div>

            <!-- 読み込みメッセージ -->
            <p class="help is-info mt-3">
                読み込みに時間がかかる場合があります。しばらくお待ちください。
            </p>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
    setup() {
        const logo = ref(null);

        onMounted(() => {
            if (logo.value) {
                logo.value.style.opacity = 0;
                setTimeout(() => {
                    logo.value.style.transition = 'opacity 3s';
                    logo.value.style.opacity = 1;
                }, 100);
            }
        });

        return { logo };
    }
};
</script>

<style scoped>
.page-container {
    height: 100vh; /* 画面の高さいっぱいに */
}
.header-container {
    user-select: none; /* 画面の高さいっぱいに */
    -webkit-user-select: none; /* Safari対応 */
    -moz-user-select: none; /* Firefox対応 */
    -ms-user-select: none; /* IE/Edge対応 */
}
</style>
