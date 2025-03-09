<template>
    <el-button size="small" icon="Refresh" @click="updateRefresh" circle></el-button>
    <el-button size="small" icon="FullScreen" @click="fullSreen" circle></el-button>
    <el-button size="small" icon="Setting" circle></el-button>
    <el-avatar :size="28" fit shape="square" style="margin-left: 10px; background-color: whitesmoke;">
        <img src="/ikun.png" />
    </el-avatar>
    <el-dropdown style="margin-left: 10px;">
        <span class="el-dropdown-link">
            ikun
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item icon="SwitchButton">退出登录</el-dropdown-item>
                <el-dropdown-item icon="CirclePlusFilled">Action 2</el-dropdown-item>
                <el-dropdown-item icon="CircleCheck">Action 3</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting';

let layoutSettingStore = useLayoutSettingStore();

const updateRefresh = () => {
    layoutSettingStore.refresh = !layoutSettingStore.refresh;
}

const fullSreen = () => {
    let full = document.fullscreenElement;
    if (!full) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

</script>

<style scoped></style>