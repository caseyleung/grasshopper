<template>
    <div>
        <h1> hi, {{ userStore.username }} </h1>

    </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user';
import { onMounted } from 'vue';

let userStore = useUserStore();

onMounted(() => {
    userStore.userInfo();
})

</script>

<style scoped></style>