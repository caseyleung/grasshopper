<template>
    <div class="logo_container">
        <img :src="setting.logo" alt="" v-if="setting.logoHidden"></img>
        <p> {{ setting.title }} </p>

    </div>
</template>

<script setup lang="ts">
import setting from '@/setting';

</script>

<style scoped lang="scss">
.logo_container {
    width: 100%;
    height: $base-menu-logo-height;
    display: flex;
    align-items: center;
    padding: 20px;

    img {
        width: 60px;
        height: 50px;
    }

    p {
        font-size: $base-menu-logo-title-szie;
        margin-left: 30px;
    }
}
</style>