<template>
    <div class="loading-overlay">
        <p class="loading-icon">データ読み込み中</p>
    </div>
</template>

<style scoped>
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 1000;
}

.loading-icon::after {
    content: '.';
    animation: dot-blinking 1.5s steps(3, end) infinite;
    font-size: 2rem;
}

@keyframes dot-blinking {
    0% {
        content: '.';
    }
    33% {
        content: '..';
    }
    66% {
        content: '...';
    }
    100% {
        content: '....';
    }
}
</style>
