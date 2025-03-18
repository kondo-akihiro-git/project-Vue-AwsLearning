<template>
    <div class="container">
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
        <div class="box">
            <h2 class="title is-3">ログイン</h2>

            <form @submit.prevent="login">
                <div class="field">
                    <label class="label">ユーザー名</label>
                    <div class="control">
                        <input v-model="username" class="input" type="text" placeholder="ユーザー名" required />
                    </div>
                </div>

                <div class="field">
                    <label class="label">パスワード</label>
                    <div class="control">
                        <input v-model="password" class="input" type="password" placeholder="パスワード" required />
                    </div>
                </div>

                <div class="field is-grouped is-grouped-right">
                    <div class="control">
                        <button class="button is-primary is-medium" type="submit">ログイン</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { loginUser } from '@/utils/auth'; // ユーザー認証を行う関数

export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        async login() {
            const isAuthenticated = await loginUser(this.username, this.password);
            console.log(isAuthenticated, this.username, this.password)
            if (isAuthenticated) {
                this.$router.push('/admin'); // 認証に成功した場合、管理画面に遷移
            } else {
                alert('認証に失敗しました');
            }
        }
    }
};
</script>

<style scoped>

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