<template>
    <div class="container">
        <section class="section">
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

                <div class="field is-grouped is-grouped-centered">
                    <div class="control">
                        <button class="button is-primary is-medium" type="submit">ログイン</button>
                    </div>
                </div>
            </form>
        </section>
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
