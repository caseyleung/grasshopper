<template>
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component" :key="layoutSettingStore.refresh" />
        </transition>
    </router-view>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting';

let layoutSettingStore = useLayoutSettingStore();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out;
}

.fade-enter-from {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
}

.fade-enter-to {
    opacity: 1;
    transform: translateY(0) scale(1);
}

.fade-leave-from {
    opacity: 1;
    transform: translateY(0) scale(1);
}

.fade-leave-to {
    opacity: 0;
    transform: translateY(-10px) scale(0.98);
}

</style>
