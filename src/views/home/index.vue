<template>
    <div>
        <h1><span class="username">{{ userStore.username }}</span>, {{ greeting }}好, 欢迎来到首页 </h1>
    </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user';
import { getTime } from '@/utils/time';

let userStore = useUserStore();

let greeting = getTime();

</script>

<style scoped>
.username {
    color: yellowgreen;
    font-weight: bold;
}
</style>
