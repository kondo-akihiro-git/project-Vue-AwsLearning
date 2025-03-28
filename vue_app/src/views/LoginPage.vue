<template>
    <div class="container">
        <div class="header-container is-flex is-align-items-center is-justify-content-space-between p-2">
            <LogoHeader />
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
import { loginUser } from '@/utils/auth';
import LogoHeader from '@/components/LogoHeader.vue';

export default {
    components: {
        LogoHeader,
    },
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        // ログイン認証
        // ログインに成功した場合、管理画面に遷移
        async login() {
            const isAuthenticated = await loginUser(this.username, this.password);
            console.log(isAuthenticated, this.username, this.password)
            if (isAuthenticated) {
                this.$router.push('/admin'); 
            } else {
                alert('認証に失敗しました');
            }
        }
    }
};
</script>
