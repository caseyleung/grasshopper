<template>
    <el-button size="small" icon="Refresh" @click="updateRefresh" circle></el-button>
    <el-button size="small" icon="FullScreen" @click="fullSreen" circle></el-button>
    <el-button size="small" icon="Setting" circle></el-button>
    <el-avatar :size="28" fit shape="square" class="avatar_icon">
        <img :src="userStore.avatar" />
    </el-avatar>
    <el-dropdown style="margin-left: 10px;">
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon--right"><arrow-down /></el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item icon="SwitchButton" @click="logout">退出登录</el-dropdown-item>
                <el-dropdown-item icon="CirclePlusFilled">Action 2</el-dropdown-item>
                <el-dropdown-item icon="CircleCheck">Action 3</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/setting';
import useUserStore from '@/store/modules/user';
import { useRouter, useRoute } from 'vue-router';

let $router = useRouter();
let route = useRoute();

let userStore = useUserStore();

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

const logout = () => {
    // 1.向服务器发请求[退出登录接口]：清除token
    // 2. 仓库中相关数据清空
    // 3. 跳转到登录页面
    userStore.userLogout();
    // $router.replace('/login');
    $router.push({ path: '/login', query: { redirect: route?.path || '/' } });

}
</script>

<style scoped lang="scss">
.avatar_icon {
    margin-left: 10px; 
    background-color: whitesmoke;
}

.avatar_icon:hover {
    transform: scale(2);
}
</style>