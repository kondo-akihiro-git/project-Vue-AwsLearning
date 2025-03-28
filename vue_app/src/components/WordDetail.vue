<script>
import { getTypeClass, getTypeLabel } from '@/utils/typeClasses';

export default {
    props: {
        selectedWordData: Object
    },
    computed: {
        typeClass() {
            return getTypeClass(this.selectedWordData.typeName);
        },
        typeLabel() {
            return getTypeLabel(this.selectedWordData.typeName);
        }
    }
};
</script>

<template>
    <div :class="['box', typeClass]">
        <div class="m-2 mb-4 is-flex is-justify-content-space-between">
            <p v-if="typeLabel" class="tag is-medium type-label">{{ typeLabel }}</p>

            <button class="button is-small" @click="$emit('closeWordDetailEvent')">閉じる</button>
        </div>


        <div class="card mb-2">
            <div class="card-content">
                <div class="content">
                    <div class="m-1">
                        <h2 class="title is-5">{{ selectedWordData.wordName }} とは？</h2>
                    </div>
                    <div class="m-1">
                        <p class="subtitle is-6">{{ selectedWordData.explanation }}</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

