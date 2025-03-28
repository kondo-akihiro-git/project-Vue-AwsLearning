<template>
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
</template>

<script>
export default {
    name: 'LogoHeader',
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
