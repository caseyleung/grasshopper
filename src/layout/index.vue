<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider" :class="{ fold: $layoutSettingStore.fold }">
            <!-- <div class="layout_slider"> -->
            <Logo></Logo>
            <!-- 滚动组件 -->
            <el-scrollbar class="scrollbar">
                <!-- 菜单组件 -->
                <el-menu background-color="rgb(156, 156, 241)" text-color="white" router :default-active="$route.path"
                    active-text-color="yellow" :collapse="$layoutSettingStore.fold">
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar" :class="{ fold: $layoutSettingStore.fold }">
            <Tabbar></Tabbar>
        </div>
        <!-- 内容展示 -->
        <div class="layout_main" :class="{ fold: $layoutSettingStore.fold }">
            <Main></Main>
        </div>

    </div>
</template>

<script setup lang="ts">
import useUserStore from '@/store/modules/user';
import Logo from './logo/index.vue';
import Menu from './menu/index.vue';
import Main from './main/index.vue';
import Tabbar from './tabbar/index.vue';
import useLayoutSettingStore from '@/store/modules/setting';



let userStore = useUserStore();

let $layoutSettingStore = useLayoutSettingStore();

</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;
    // background-color: beige;

    .layout_slider {
        width: $base-menu-width;
        color: whitesmoke;
        height: 100vh;
        background-color: $base-menu-backgroucolor;
        transition: all, .9s;

        .scrollbar-demo-item {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 50px;
            margin: 10px;
            text-align: center;
            border-radius: 4px;
            background: var(--el-color-primary-light-9);
            color: var(--el-color-primary);
        }

        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);
        }

        &.fold {
            width: $base-menu-mini-width;
        }
    }

    .layout_tabbar {
        position: fixed;
        top: 0px;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        // background-color: rgb(231, 226, 226);
        // transition: all, .9s;


        &.fold {
            width: calc(100vw - $base-menu-mini-width);
            left: $base-menu-mini-width;
        }
    }

    .layout_main {
        position: absolute;
        top: $base-tabbar-height;
        left: $base-menu-width;
        width: calc(100% - $base-menu-width);
        height: calc(100% - $base-tabbar-height);
        padding: 20px;
        overflow: auto;
        transition: all, .9s;


        &.fold {
            width: calc(100vw - $base-menu-mini-width);
            left: $base-menu-mini-width;
        }
    }
}
</style>