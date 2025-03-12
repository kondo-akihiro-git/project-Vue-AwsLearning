<script>
export default {
    props: {
        selectedWordData: Object
    }
};
</script>
<template>
    <div class="box has-background-success-light">
        <div class="card">
            <div class="card-content">
                <div class="content">
                    <h2 class="title is-3">{{ selectedWordData.wordName }} とは？</h2>
                    <p class="subtitle is-4">{{ selectedWordData.explanation }}</p>
                    <p class="is-size-6"><strong>タイプ:</strong> {{ selectedWordData.typeName }}</p>
                </div>
            </div>
        </div>
        <div class="has-text-right">
            <button class="button is-light is-small" @click="$emit('closeWordDetailEvent')">折りたたむ</button>
        </div>
    </div>
</template>
