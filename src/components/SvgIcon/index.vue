<template>
    <div>
        <svg :style="{width, height}">
            <use :xlink:href="prefix + name" :fill="color"></use>
        </svg>

    </div>
</template>

<script setup lang="ts">
defineProps({
    prefix: {
        type: String,
        default: '#icon-'
    },
    name: String,
    color: {
        type: String,
        default: '',
    },
    width: {
        type: String,
        default: '32px',
    },
    height: {
        type: String,
        default: '32px',
    }
})

</script>

<style scoped></style>