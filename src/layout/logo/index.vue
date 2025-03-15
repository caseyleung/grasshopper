<template>
    <div class="logo_container">
        <img :src="setting.logo" alt="" v-if="!setting.hidden"></img>
        <p v-if="!$layoutSettingStore.fold"> {{ setting.title }} </p>

    </div>
</template>

<script setup lang="ts">
import setting from '@/setting';
import useLayoutSettingStore from '@/store/modules/setting';

let $layoutSettingStore = useLayoutSettingStore();

</script>

<style scoped lang="scss">
.logo_container {
    width: 100%;
    height: $base-menu-logo-height;
    display: flex;
    align-items: center;
    padding: 10px;

    img {
        width: 38px;
        height: 38px;
        border-radius: 10px;
        // margin-left: 10px;
    }

    img:hover{
        transform: rotate(40deg) scale(1.2);
    }

    p {
        font-size: $base-menu-logo-title-szie;
        margin-left: 12px;
        font-family: "Inter", "Arial", sans-serif;
        font-weight: 600;
        letter-spacing: 0.5px;
        text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.1);
        line-height: 1.4;
        white-space: nowrap;
        transition: all, .9s;
    }
}
</style>